import React, { ReactNode } from "react";
import styled from "styled-components";

type EntryProps = {
    title: string,
    labels: string[],
    children?: ReactNode,
    date: string,
    weekday: string
}

export const Entry: React.VFC<EntryProps> = ({children, title, labels, date, weekday}) => {
    const Wrapper = styled.div`
        border: ${props => props.theme.sizes.borderWidth} solid ${props => props.theme.colors.fontColor};

        padding: 15px;
        overflow: hidden;
    `;
    
    return (
        <Wrapper>
            <h2>{title}</h2>
            <div>{children}</div>
            <div>{labels}</div>
            <div>{weekday}</div>
            <div>{date}</div>
        </Wrapper>
    );
};
