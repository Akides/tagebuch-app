import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

type EntryProps = {
    id: string,
    title: string,
    labels: string[],
    children?: ReactNode,
    date: string,
    weekday: string
}

const Wrapper = styled.div`
    padding: 15px;
    overflow: hidden;
`;

const Content = styled.div`
    padding-bottom: 10px;
`;

const Descr = styled.div`
    color: ${props => props.theme.colors.fontColor};
    border-top: ${props => props.theme.sizes.borderWidth} solid ${props => props.theme.colors.borderColor};
    padding-top: 10px;
`;

const EditButton = styled.button`
    color: ${props => props.theme.colors.fontColor};
`;

/* editable = true */

const InputContent = styled.input`
    border: 5px solid;
`;

async function handleOnClick(input: string, id: string) {
    const req = await fetch(`/api/entry/${id}`, {
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                    method: 'PATCH',
                    body: JSON.stringify({
                        content: input
                })
    })
}




export const Entry: React.VFC<EntryProps> = ({children, id, title, labels, date, weekday}) => {
    const [editable, setEditable] = useState(false);
    const [input, setInput] = useState(children as string);
    console.log(input)
    
    if (editable) {
        return (
            <Wrapper>
            <h2>{title}</h2>
            <EditButton onClick={() => {
                handleOnClick(input as string, id);
                setEditable(false);
            }}>Edit done</EditButton>
            <InputContent value={input} onChange={e => {
                setInput((e.target as HTMLInputElement).value);
            }} type="text" />
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
            <h2>{title}</h2>
            <EditButton onClick={() => {
                setEditable(true);
            }}>Edit</EditButton>
            <Content>{input}</Content>
            <Descr>
                <div>{labels}</div>
                <div>{weekday}</div>
                <div>{date}</div>
            </Descr>
        </Wrapper>
    );
};
