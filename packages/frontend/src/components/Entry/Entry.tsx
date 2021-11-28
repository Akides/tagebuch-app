import React, { ReactNode, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { mapDateToWeekday, mapDayToWeekday } from "../../util/Util";
import { Label } from "../Label";

type EntryProps = {
    id: string,
    title: string,
    labels: any[],
    children?: ReactNode,
    date: string,
    onClickFunc: any
}

const Wrapper = styled.div`
    padding: 15px;
    overflow: hidden;
`;

const Content = styled.div`
    font-size: ${props => props.theme.sizes.fontSize};
    padding-bottom: 10px;
    white-space: pre-wrap;
    width: 100%;
    height: 500px;
    overflow: scroll;
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

const EditButton = styled.button`
    height: 30px;
    margin: 20px;
    float: right;
    color: ${props => props.theme.colors.fontColor};
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

async function handleOnClick(title: string, input: string, id: string, date: string) {
    await fetch(`/api/entry/${id}`, {
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                    method: 'PATCH',
                    body: JSON.stringify({
                        title: title,
                        content: input,
                        date: date
        })
    })
}




export const Entry: React.VFC<EntryProps> = ({onClickFunc, children, id, title, labels, date }) => {
    const [editable, setEditable] = useState(false);
    const [input, setInput] = useState(children as string);
    const [inputTitle, setInputTitle] = useState(title);
    const [inputDate, setInputDate] = useState(date);
    const [inputWeekday, setInputWeekday] = useState(mapDateToWeekday(date));

    const labels_arr = labels.map((label: any) =>
            <Label key={label["id"]}>{label["name"]}</Label>)

    
    if (editable) {
        return (
        <Wrapper>
            <EditButton onClick={() => {
                handleOnClick(inputTitle as string, input as string, id, inputDate);
                setInputWeekday(mapDateToWeekday(inputDate));
                onClickFunc();
                setEditable(false);
            }}>Edit done</EditButton>
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
        </Wrapper>
        );
    }
    return (
        <Wrapper>
            <EditButton onClick={() => {
                setEditable(true);
            }}>Edit</EditButton>
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
