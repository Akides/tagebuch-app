import React, { ReactNode } from "react";
import styled from "styled-components";

type LabelProps = {
    children: ReactNode;
}

const Wrapper = styled.div`
float: left;
margin-right: 5px;
border: 0.1em solid ${props => props.theme.colors.borderColor};
border-radius: 10%;
padding-right: 3px;

`;

export const Label: React.VFC<LabelProps> = ({children}) => {
    return (
        <Wrapper>
            <div>{children}</div>
        </Wrapper>
    );
};
