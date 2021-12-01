import React, { ReactNode, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { mapDateToWeekday } from "../../util/Util";
import { Label } from "../Label";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";

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
    font-size: ${props => props.theme.sizes.fontSize};
    width: 100%;
    height: 500px;
`;

const EditTitle = styled.textarea`
    border: 1px solid ${props => props.theme.colors.borderColor};
    font-size: large;
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




export const Entry: React.VFC<EntryProps> = ({onClickFunc, edit, children, id, title, labels, date }) => {
    const [editable, setEditable] = useState(edit);
    const [input, setInput] = useState(children as string);
    const [inputTitle, setInputTitle] = useState(title);
    const [inputDate, setInputDate] = useState(date);
    const [inputWeekday, setInputWeekday] = useState(mapDateToWeekday(date));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const labels_arr = labels.map((label: any) =>
            <Label key={label["id"]} color={label["color"]}>{label["name"]}</Label>)

    
    if (editable) {
        return (
        <Wrapper>
            <AiOutlineCheck size="28px" style={{margin: '20px', float: "right"}} onClick={() => {
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
                <div>{inputWeekday}</div>
                <EditDate value={inputDate} onChange={e => {
                setInputDate((e.target as HTMLTextAreaElement).value);
            }}>{date}</EditDate>
            </Descr>
            <RemoveButton onClick={() => {
                handleOnClickRemove(id);
                onClickFunc();
            }}>Remove</RemoveButton>
        </Wrapper>
        );
    }
    return (
        <Wrapper>
           <AiFillEdit size="28px" style={{margin: '20px', float: "right"}} onClick={() => {
                setEditable(true);
            }}/>
            <h2>{inputTitle}</h2>
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
