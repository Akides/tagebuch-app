import React, { ReactNode } from "react";
import styled from "styled-components";



type CardProps = {
    labels: string[],
    children?: ReactNode,
    date: string,
    weekday: string
}

export const Card: React.VFC<CardProps> = ({children, labels, date, weekday}) => 
    {

        const Date = styled.div`
            color: ${props => props.theme.colors.fontColor};
        `;

        const Description = styled.div`
            color: ${props => props.theme.colors.fontColor};
        `;

        const labels_2 = labels.map((label) => <li key={label}>{label}</li>)    //provide key for react

        return (
            <div className="card">
                <Date>{date}</Date>
                <div className="weekday">{weekday}</div>
                <Description className="descr">{children}</Description>
                <div className="labels">{labels_2}</div>
            </div>
        )
    }
