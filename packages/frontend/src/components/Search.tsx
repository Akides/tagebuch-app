import React from "react";
import styled from "styled-components";

type SearchProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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