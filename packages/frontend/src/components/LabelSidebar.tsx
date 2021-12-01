import React, { ReactNode } from "react";
import styled from "styled-components";
import {BsThreeDots} from "react-icons/bs";
import Dropdown from "react-dropdown";

type LabelSidebarProps = {
    color: string,
    children: ReactNode
}

const Wrapper = styled.div`
    color: black;
    background-color: ${props => props.color ? props.color : "white"};
    margin: 20px;
    margin-top: 0;
    margin-bottom: 7px;
    border-radius: 2px;
    padding: 1px 8px;
    text-decoration: none;
    display: flex;
    font-size: 16px;
`;

const options = [
    'Entries', 'Label', 'Date'
  ];

let selectedOption = options[0];

export const LabelSidebar: React.VFC<LabelSidebarProps> = ({color, children }) => {
    return (
        <Wrapper color={color}>
            <div>{children}</div>
            <BsThreeDots style={{color: 'brown', fontSize: '20px', position: 'absolute', right: '30px'}} onClick={() => console.log("clicked")}/>
            <Dropdown options={options} value={selectedOption} onChange={(e) => selectedOption = e.value} placeholder="Select an option" />
        </Wrapper>
    );
};
