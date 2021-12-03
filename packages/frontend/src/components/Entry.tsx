import React, { Fragment, ReactNode, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { mapDateToWeekday } from "../util/Util";
import { AiFillEdit, AiOutlineCheck, AiOutlineFullscreen } from "react-icons/ai";
import {Button, Chip, Fab, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Navigate } from 'react-router-dom';


type EntryProps = {
    id: string,
    title: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    labels: any[],
    children?: ReactNode,
    date: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickFunc: any,
    edit: boolean,
    preview: boolean
}

const Wrapper = styled.div`
    position: fixed;
    width: 50%;
    margin-left: 650px;
    padding: 50px;
    overflow: hidden;
`;

const Content = styled.div`
    font-size: ${props => props.theme.sizes.fontSize};
    padding-bottom: 10px;
    white-space: pre-wrap;
    width: 100%;
    height: 500px;
    overflow-y: scroll;
    &:focus {
        border-color: blueviolet;
        box-shadow: 0px 0px 2px red;
    }
`;

const Descr = styled.div`
    color: ${props => props.theme.colors.fontColor};
    border-top: ${props => props.theme.sizes.borderWidth} solid ${props => props.theme.colors.borderColor};
    padding-top: 10px;
`;

/* editable = true */

const InputContent = styled.textarea`
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 4px;
    font-size: ${props => props.theme.sizes.fontSize};
    width: 100%;
    height: 500px;
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
    if (response.status != 200) {
        const res2 = await fetch(`/api/entry`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
                    method: 'POST',
                    body: JSON.stringify({
                        title: title,
                        content: input,
                        date: date
                    })
        });
        if (res2.status != 200) {
            throw new Error("could not fetch data.");
        }
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
    return labelId;
}

export const Entry: React.VFC<EntryProps> = ({onClickFunc, edit, children, id, title, labels, date, preview }) => {
    const [editable, setEditable] = useState(edit);
    const [inputContent, setInputContent] = useState(children as string);
    const [inputTitle, setInputTitle] = useState(title);
    const [inputDate, setInputDate] = useState(date);
    const [inputWeekday, setInputWeekday] = useState(mapDateToWeekday(date));
    const [inputNewLabel, setInputNewLabel] = useState("");
    const [labelInfo, setLabelInfo] = useState("");
    const [labelsToAdd, setLabelsToAdd] = useState([] as string[]);
    const [toDetailedview, setToDetailedview] = useState(false);

    let labelArr: JSX.Element[] = [];
    if (editable) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        labelArr = labels.map((label: any) =>
        <Chip key={label["id"]} label={label["name"]} onDelete={() => {
            handleLabelDelete(label["id"], id).catch(error => setLabelInfo(error+"")); 
        }}/>);
    } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        labelArr = labels.map((label: any) => <Chip key={label["id"]} label={label["name"]} />);
    }
    const [labelsToShow, setLabelsToShow] = useState(labelArr);


    /**
     * newly added labels must be added to labelsToShow which will later be displayed.
     * Existing labels must be also newly constructed because the Chip component 
     * misses onDelete if not in edit mode
     */
    const prepareLabelsToShow = () => {
        const tmpAdded: JSX.Element[] = [];
        for (let i = 0; i < labelsToAdd.length; i++) {
            const labelToAdd = labelsToAdd[i];
            handleLabelAdd(labelToAdd, id).catch(() => setLabelInfo("label is already assigned."));
            const labelJSX = <Chip key={`unsaved_label${i}`} label={labelToAdd}/>
            tmpAdded.push(labelJSX);
        }
        setLabelsToShow(labelsToShow.concat(tmpAdded));
    };


    /**
     * newly added labels must be saved in an array so that 
     * later they can be persisted in the database altogether
     */
    const handleAddLabelOnClick = () => {
        if (!/\S/.test(inputNewLabel)) {  // contains only whitespaces or nothing
            setLabelInfo("no labels added.");
        } else { 
            setLabelInfo(inputNewLabel+" saved. Save entry to confirm.");
            const newLabelToAdd: string[] = labelsToAdd.slice();
            newLabelToAdd.push(inputNewLabel);
            setLabelsToAdd(newLabelToAdd);
        }
    }

    if (toDetailedview === true) {
        return <Navigate to={"/entryview/"+id}/>
    }
    
    if (editable) {
        let labelPart: JSX.Element = <div></div>;
        if (preview) {
            labelPart =  <Fragment>
                            <TextField size="small" id="outlined-basic" label="new label" variant="outlined" onChange={e => 
                                setInputNewLabel((e.target as HTMLTextAreaElement).value)}/>
                            <Fab size="small" color="secondary" aria-label="add" onClick={handleAddLabelOnClick}>
                                <AddIcon />
                            </Fab>
                        </Fragment>
        }

        return (
        <Wrapper>
            <AiOutlineCheck color="#747474"size="28px" style={{margin: '20px', float: "right"}} onClick={() => {
                if (/\S/.test(inputTitle)) {  // contains only whitespaces or nothing
                    handleOnClickInsert(inputTitle as string, inputContent as string, id, inputDate);
                    setInputWeekday(mapDateToWeekday(inputDate));
                    prepareLabelsToShow();
                    onClickFunc();
                    setEditable(false);
                } else {
                    setLabelInfo("Please enter a title");
                }
            }}>save</AiOutlineCheck>
            <TextField id="title-basic" label="Title" variant="outlined" value={inputTitle} onChange={e => {
                setInputTitle((e.target as HTMLTextAreaElement).value);
            }}/>
            <InputContent value={inputContent} onChange={e => {
                setInputContent((e.target as HTMLTextAreaElement).value);
            }} ></InputContent>
            <Descr>
                {labelPart}
                <div>{labelInfo}</div>
                <div>{labelsToShow}</div>
                <div>{inputWeekday}</div>
                <textarea value={inputDate} onChange={e => {
                setInputDate((e.target as HTMLTextAreaElement).value);
            }}>{date}</textarea>
            </Descr>
            <Button style={{float: "right"}} onClick={() => {
                handleOnClickRemove(id);
                onClickFunc();
                setInputTitle("");
                setInputContent("");
            }}>Remove</Button>
        </Wrapper>
        );
    }

    let fullscreenIcon = <AiOutlineFullscreen size="28px" onClick={() => setToDetailedview(true)}/>

    // prevent user from accessing detailed page of a newly added entry because it's not yet loaded from db
    if (id == "unsaved") {
        fullscreenIcon = <div></div>
    }

    return (
        <Wrapper>
            {fullscreenIcon}
           <AiFillEdit color="#474747" size="28px" style={{margin: '20px', float: "right"}} onClick={() => {
                setEditable(true);
            }}/>
            <h2>{inputTitle}</h2>
            <Content>
                <ReactMarkdown>
                    {inputContent}
                </ReactMarkdown>
            </Content>
            <Descr>
                <div>{labelInfo}</div>
                <div>{labelsToShow}</div>
                <div>{inputWeekday} {inputDate}</div>
            </Descr>
        </Wrapper>
    );
};
