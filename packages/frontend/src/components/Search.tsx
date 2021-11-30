import React from "react";
import styled from "styled-components";


type SearchProps = {
    onInput: any
}

const StyledInput = styled.input`
    margin-right: 8px;
    font-size: 15px;
`;



export const SearchBar: React.VFC<SearchProps> = ({onInput}) => {

    return(
        <form action="/" method="get">
            <StyledInput type="text" placeholder="Search entries, labels" onChange={e => onInput((e.target as HTMLInputElement).value)}/>
        </form>
    );
};