import React, { ReactNode, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { mapDateToWeekday } from "../util/Util";
import { AiFillEdit, AiOutlineCheck, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import Chip from '@mui/material/Chip';
import { Navigate } from 'react-router-dom';


type EntryDetailedProps = {
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
    font-size: ${props => props.theme.sizes.fontSize};
    width: 100%;
    height: 750px;
`;

const EditTitle = styled.textarea`
    border: 1px solid ${props => props.theme.colors.borderColor};
    font-size: 50px;
    font-weight: bold;
`;

const EditDate = styled.textarea`
    
`;

const RemoveButton = styled.button`
    color: ${props => props.theme.colors.fontColor};
    float: right;
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
//TODO: HANDLEDELETE OF LABEL!
function handleLabelDelete():void {
    /*await fetch(`/api/entry/${id}`, {
        method: 'DELETE'
    });*/
    console.log("test");
}

export const EntryDetailed: React.VFC<EntryDetailedProps> = ({onClickFunc, edit, children, id, title, labels, date }) => {
    const [editable, setEditable] = useState(edit);
    const [input, setInput] = useState(children as string);
    const [inputTitle, setInputTitle] = useState(title);
    const [inputDate, setInputDate] = useState(date);
    const [inputWeekday, setInputWeekday] = useState(mapDateToWeekday(date));
    const [toCardview, setToCardview] = React.useState(false);

    if (toCardview === true) {
        return <Navigate to='/cardview'/>
      }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    let labels_arr: any;
    
    if (editable) {
        labels_arr = labels.map((label: any) =>
        <Chip key={label["id"]} label={label["name"]} onDelete={handleLabelDelete}/>)

        return (
        <Wrapper>
            <AiOutlineCheck color="#747474"size="45px" style={{margin: '20px', float: "right"}} onClick={() => {
                handleOnClickInsert(inputTitle as string, input as string, id, inputDate);
                setInputWeekday(mapDateToWeekday(inputDate));
                onClickFunc();
                setEditable(false);
            }}>save</AiOutlineCheck>
            <EditTitle value={inputTitle} onChange={e => {
                setInputTitle((e.target as HTMLTextAreaElement).value);
            }}></EditTitle>
            <InputContent value={input} onChange={e => {
                setInput((e.target as HTMLTextAreaElement).value);
            }} ></InputContent>
            <Descr>
                <div>{labels_arr}</div>
                <AiOutlinePlus size="20px"/>
                <div>{inputWeekday}</div>
                <EditDate value={inputDate} onChange={e => {
                setInputDate((e.target as HTMLTextAreaElement).value);
            }}>{date}</EditDate>
            </Descr>
            <RemoveButton onClick={() => {
                handleOnClickRemove(id);
                onClickFunc();
                setToCardview(true);    // return to cardview page since entry is deleted
            }}>Remove</RemoveButton>
        </Wrapper>
        );
    }

    labels_arr = labels.map((label: any) =>
        <Chip key={label["id"]} label={label["name"]} />)

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
                <div>{labels_arr}</div>
                <div>{inputWeekday} {inputDate}</div>
            </Descr>
        </Wrapper>
    );
};
