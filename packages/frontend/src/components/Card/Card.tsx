import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Label } from "../Label";



type CardProps = {
    title: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    labels: any[],
    children: ReactNode,
    day: string,
    weekday: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: any
}

const Wrapper = styled.div`
width: 350px;
height: 70px;
padding: 5px;
padding-bottom: 30px;
margin: 10px;
margin-top: 0;
display: flex;
&:hover {
    background-color: #e9e9e9;
}
`;

const Date = styled.div`
color: ${props => props.theme.colors.fontColor};
text-align: center;
border: 0.1em solid ${props => props.theme.colors.borderColor};
border-radius: 10%;
padding: 20px 8px;
float: left;
font-weight: bold;
`;

const Writings = styled.div`
margin-left: 40px;  
`;

const Title = styled.div`
color: black;
font-size: 18px;
`;

const Description = styled.div`
font-size: 15px;
width: 11em;
height: 50px;
color: ${props => props.theme.colors.fontColor};
white-space:nowrap;
text-overflow: ellipsis;
overflow: hidden;
`;

const Labels = styled.div`
float: inline-start;
color: ${props => props.theme.colors.backgroundColor};
margin-bottom: 20px;
font-size: small;
`;




export const Card: React.VFC<CardProps> = ({children, title, labels, day, weekday, onClick}) => 
    {
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const labels_arr = labels.map((label: any) =>
            <Label key={label["id"]}>{label["name"]}</Label>)

        return (
            <Wrapper onClick={onClick}>
                <Date>
                    <div>{day}</div> 
                    <div>{weekday}</div>
                </Date>
                <Writings>
                    <Title>{title}</Title>
                    <Description className="descr">
                        <ReactMarkdown>
                            {children as string}
                        </ReactMarkdown>
                    </Description>
                    <Labels>
                        {labels_arr}
                    </Labels>
                </Writings>
            </Wrapper>
        )
    }
