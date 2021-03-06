import React, { ReactNode, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { mapDateToWeekday } from "../util/Util";
import { AiFillEdit, AiOutlineCheck, AiOutlineFullscreen } from "react-icons/ai";
import {Button, Chip, TextField} from '@mui/material';
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
    edit: boolean
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

export const Entry: React.VFC<EntryProps> = ({onClickFunc, edit, children, id, title, labels, date }) => {
    const [editable, setEditable] = useState(edit);
    const [inputContent, setInputContent] = useState(children as string);
    const [inputTitle, setInputTitle] = useState(title);
    const [inputDate, setInputDate] = useState(date);
    const [inputWeekday, setInputWeekday] = useState(mapDateToWeekday(date));
    const [info, setInfo] = useState("");
    const [toDetailedview, setToDetailedview] = useState(false);

    let labelArr: JSX.Element[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    labelArr = labels.map((label: any) => <Chip key={label["id"]} label={label["name"]} />);


    if (toDetailedview === true) {
        return <Navigate to={"/entryview/"+id}/>
    }
    
    if (editable) {

        return (
        <Wrapper>
            <AiOutlineCheck color="#747474"size="28px" style={{margin: '20px', float: "right"}} onClick={() => {
                if (/\S/.test(inputTitle)) {  // contains only whitespaces or nothing
                    handleOnClickInsert(inputTitle as string, inputContent as string, id, inputDate);
                    setInputWeekday(mapDateToWeekday(inputDate));
                    onClickFunc();
                    setEditable(false);
                } else {
                    setInfo("Please enter a title");
                }
            }}>save</AiOutlineCheck>
            <TextField id="title-basic" label="Title" variant="outlined" value={inputTitle} onChange={e => {
                setInputTitle((e.target as HTMLTextAreaElement).value);
            }}/>
            <InputContent value={inputContent} onChange={e => {
                setInputContent((e.target as HTMLTextAreaElement).value);
            }} ></InputContent>
            <Descr>
                <div>{info}</div>
                <div>{labelArr}</div>
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
                <div>{info}</div>
                <div>{labelArr}</div>
                <div>{inputWeekday} {inputDate}</div>
            </Descr>
        </Wrapper>
    );
};
