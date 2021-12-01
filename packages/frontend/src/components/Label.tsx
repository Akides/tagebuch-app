import React, { ReactNode } from "react";
import styled from "styled-components";

interface LabelProps {
    color: string,
    children: ReactNode
}

const Wrapper = styled.div`
color: black;
background-color: ${props => props.color ? props.color : "white"};
float: left;
margin-right: 5px;
border: 0.1em solid ${props => props.theme.colors.borderColor};
border-radius: 10%;
padding-right: 3px;

`;

export const Label: React.VFC<LabelProps> = ({color, children }) => {
    return (
        <Wrapper color={color}>
            <div>{children}</div>
        </Wrapper>
    );
};
