import React, { ReactNode } from "react";
import styled from "styled-components";



type CardProps = {
    title: string,
    labels: string[],
    children?: ReactNode,
    date: string,
    weekday: string
}

export const Card: React.VFC<CardProps> = ({children, title, labels, date, weekday}) => 
    {
        const Wrapper = styled.div`
            border-style: solid;
            border-color: ${props => props.theme.colors.fontColor};
            border-width: ${props => props.theme.sizes.borderWidth};
            padding: 15px;
            margin: 15px;
            margin-top: 0;
            display: flex;
        `;

        const Date = styled.div`
            color: ${props => props.theme.colors.fontColor};
            text-align: center;
            border: 0.1em solid ${props => props.theme.colors.borderColor};
            border-radius: 10%;
            padding: 14px 6px;
            float: left;
            font-weight: bold;
        `;

        const Writings = styled.div`
            margin-left: 60px;  
        `;

        const Title = styled.div`
            color: black;
            font-size: 20px;
        `;

        const Description = styled.div`
            color: ${props => props.theme.colors.fontColor};
        `;

        const Labels = styled.div`
            float: inline-start;
            color: ${props => props.theme.colors.backgroundColor};
            margin-bottom: 20px;
            font-size: small;
        `;

        const Label = styled.div`
            float: left;
            margin-right: 5px;
            border: 0.1em solid ${props => props.theme.colors.borderColor};
            border-radius: 10%;
            padding-left: 3px;
            padding-right: 3px;
        `;

        const labels_arr = labels.map((label) => <Label key={label}>{label}</Label>)    //provide key for react

        return (
            <Wrapper>
                <Date>
                    <div>{date}</div> 
                    <div>{weekday}</div>
                </Date>
                <Writings>
                    <Title>{title}</Title>
                    <Description className="descr">{children}</Description>
                    <Labels>
                        {labels_arr}
                    </Labels>
                </Writings>
            </Wrapper>
        )
    }
