import React, { ReactNode, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { mapDateToWeekday } from "../util/Util";
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import {Button, Chip, Fab, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Navigate } from 'react-router-dom';


type EntryDetailedProps = {
    id: string,
    title: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    labels: any[],
    children?: ReactNode,
    date: string,
    edit: boolean
}

const Wrapper = styled.div`
    position: fixed;
    width: 90%;
    margin-left: 50px;
    padding: 50px;
    overflow: hidden;
`;

const Content = styled.div`
    font-size: ${props => props.theme.sizes.fontSize};
    padding-bottom: 10px;
    white-space: pre-wrap;
    width: 100%;
    height: 750px;
    overflow-y: scroll;
    &:focus {
        border-color: blueviolet;
        box-shadow: 0px 0px 2px red;
    }
`;

const Descr = styled.div`
    position: fixed;
    bottom: 50px;
    color: ${props => props.theme.colors.fontColor};
    border-top: ${props => props.theme.sizes.borderWidth} solid ${props => props.theme.colors.borderColor};
    padding-top: 10px;
`;

const Title = styled.div`
    font-size: 50px;
    font-weight: bold;
`;

/* editable = true */

const InputContent = styled.textarea`
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 4px;
    font-size: ${props => props.theme.sizes.fontSize};
    width: 100%;
    height: 600px;
`;

async function handleOnClickInsert(title: string, input: string, id: string, date: string) {
    const response = await fetch(`/api/entry/${id}`, {
                        headers: { "Content-Type": "application/json; charset=utf-8" },
                        method: 'PATCH',
                        body: JSON.stringify({
                            title: title,
                            content: input,
                            date: date
                        })
                    });
    if (response.status == 404) {
        await fetch(`/api/entry`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
                    method: 'POST',
                    body: JSON.stringify({
                        title: title,
                        content: input,
                        date: date
                    })
        });
    }
}

async function handleOnClickRemove(id: string) {
    await fetch(`/api/entry/${id}`, {
        method: 'DELETE'
    });

}

async function handleLabelDelete(id: string, entryId: string) {
    const res = await fetch(`/api/entry/removeLabel/${id}/${entryId}`, {
                    method: 'DELETE'
                });
    if (res.status != 200) {    //label already exists
        throw new Error("could not delete label.");
    }
}

async function handleLabelAdd(label: string, entryId: string) {
    let res = await fetch(`/api/label`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
                method: 'POST',
                body: JSON.stringify({
                    name: label
                })
    });

    if (res.status != 200) {    //label already exists -> load label
        res = await fetch(`/api/label/getWithName/${label}`, {
            headers: { "Content-Type": "application/json; charset=utf-8" }, method: 'GET'});
    }

    const resJson = await res.json();
    const labelId = resJson["data"]["id"];

    res = await fetch(`/api/entry/addLabel/${labelId}/${entryId}`, {    //add label to entry
            headers: { "Content-Type": "application/json; charset=utf-8" }, method: 'POST' });
    
    if (res.status != 200) {    //entry already has label
        throw new Error("label with the same name already exists.");
    }
}

async function getWeather(date: string) {
    const res = await fetch(`/api/weather/${date}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" }, method: 'GET'});

    if (res.status != 200) {
        throw new Error("could not retrieve weather data");
    }
    const data = await res.json();
    return data["celsius"];
}





export const EntryDetailed: React.VFC<EntryDetailedProps> = ({ edit, children, id, title, labels, date }) => {
    const [editable, setEditable] = useState(edit);
    const [input, setInput] = useState(children as string);
    const [inputTitle, setInputTitle] = useState(title);
    const [inputDate, setInputDate] = useState(date);
    const [inputWeekday, setInputWeekday] = useState(mapDateToWeekday(date));
    const [inputNewLabel, setInputNewLabel] = useState("");
    const [labelInfo, setLabelInfo] = useState("");
    const [labelsToAdd, setLabelsToAdd] = useState([] as string[]);
    const [toCardview, setToCardview] = React.useState(false);
    const [weather, setWeather] = useState("NaN");

    useEffect(() => {
        (async function () {
            try {
                const temp = await getWeather(date);
                setWeather(temp);
            } catch (error) {
                setWeather("Could not retrieve weather.");
            }
          })();
      },[]);


    const handleAddLabelOnClick = () => {
        if (!/\S/.test(inputNewLabel)) {  // contains only whitespaces or nothing
            setLabelInfo("no labels added.");
        } else { 
            setLabelInfo(inputNewLabel+" saved. Save and close entry to confirm.");
            const newLabelToAdd: string[] = labelsToAdd.slice();
            newLabelToAdd.push(inputNewLabel);
            setLabelsToAdd(newLabelToAdd);
        }
    }


    if (toCardview === true) {
        return <Navigate to='/cardview'/>
    }

    let labels_arr: JSX.Element[];
    
    if (editable) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        labels_arr = labels.map((label: any) =>
        <Chip key={label["id"]} label={label["name"]} onDelete={() => {
            handleLabelDelete(label["id"], id).catch(error => setLabelInfo(error+"")); 
            setToCardview(true);
        }}/>)

        return (
        <Wrapper>
            <AiOutlineCheck color="#747474"size="45px" style={{margin: '20px', float: "right"}} onClick={() => {
                if (/\S/.test(inputTitle)) {  // contains only whitespaces or nothing
                    handleOnClickInsert(inputTitle as string, input as string, id, inputDate);
                    setInputWeekday(mapDateToWeekday(inputDate));
                    for (let i = 0; i < labelsToAdd.length; i++) {
                        const labelToAdd = labelsToAdd[i];
                        handleLabelAdd(labelToAdd, id).catch(() => setLabelInfo("label is already assigned."));
                    }
                    setEditable(false);
                } else {
                    setLabelInfo("Please enter a title");
                }
                
            }}>save</AiOutlineCheck>
             <TextField id="title-basic" label="Title" variant="outlined" value={inputTitle} onChange={e => {
                setInputTitle((e.target as HTMLTextAreaElement).value);
            }}/>
            <InputContent value={input} onChange={e => {
                setInput((e.target as HTMLTextAreaElement).value);
            }} ></InputContent>
            <Descr>
                <TextField size="small" id="outlined-basic" label="new label" variant="outlined" onChange={e => 
                    setInputNewLabel((e.target as HTMLTextAreaElement).value)}/>
                <Fab size="small" color="secondary" aria-label="add" onClick={handleAddLabelOnClick}>
                    <AddIcon />
                </Fab>
                <div>{labelInfo}</div>
                <div>{labels_arr}</div>
                <div>{inputWeekday}</div>
                <textarea value={inputDate} onChange={e => {
                setInputDate((e.target as HTMLTextAreaElement).value);
            }}>{date}</textarea>
            </Descr>
            <Button style={{float: "right"}} onClick={() => {
                handleOnClickRemove(id);
                setToCardview(true);    // return to cardview page since entry is deleted
            }}>Remove</Button>
        </Wrapper>
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    labels_arr = labels.map((label: any) =>
        <Chip key={label["id"]} label={label["name"]} onClick={() => {
            handleLabelDelete(label["id"], id);
            setToCardview(true);
        }
    }/>)

    return (
        <Wrapper>
            <AiOutlineClose size="45px" onClick={() => {
                setToCardview(true);
            }}/>
           <AiFillEdit color="#474747" size="45px" style={{margin: '20px', float: "right"}} onClick={() => {
                setEditable(true);
            }}/>
            <Title>{inputTitle}</Title>
            <Content>
                <ReactMarkdown>
                    {input}
                </ReactMarkdown>
            </Content>
            <Descr>
                <div>{labelInfo}</div>
                <div>{labels_arr}</div>
                <div>{inputWeekday} {inputDate}</div>
                <div>Weather in Frankfurt: {weather}??</div>
            </Descr>
        </Wrapper>
    );
};
