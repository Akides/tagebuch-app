import React, { ReactNode, useState } from "react";
import styled from "styled-components";

type EntryProps = {
    id: string,
    title: string,
    labels: string[],
    children?: ReactNode,
    date: string,
    weekday: string,
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

async function handleOnClick(title: string, input: string, id: string) {
    const req = await fetch(`/api/entry/${id}`, {
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                    method: 'PATCH',
                    body: JSON.stringify({
                        title: title,
                        content: input
                })
    })
}




export const Entry: React.VFC<EntryProps> = ({onClickFunc, children, id, title, labels, date, weekday }) => {
    const [editable, setEditable] = useState(false);
    const [input, setInput] = useState(children as string);
    const [inputTitle, setInputTitle] = useState(title);
    
    if (editable) {
        return (
        <Wrapper>
            <EditButton onClick={() => {
                handleOnClick(inputTitle as string, input as string, id);
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
                <div>{labels}</div>
                <div>{weekday}</div>
                <div>{date}</div>
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
            <Content>{input}</Content>
            <Descr>
                <div>{labels}</div>
                <div>{weekday}</div>
                <div>{date}</div>
            </Descr>
        </Wrapper>
    );
};
