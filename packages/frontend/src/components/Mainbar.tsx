import React from "react";
import styled from "styled-components";
import { Card } from "./Card/Card";

export const Mainbar: React.VFC = () => {

    const Wrapper = styled.div`
        float: left;
    `;

    return (
        <Wrapper>        
            <Card title="nice title" date="25" weekday="MON" labels={["important","cool"]}>What am I going to do?</Card>
            <Card title="cool weather today" date="27" weekday="WED" labels={["unimportant","uncool"]}>I have done nothing?</Card>
            <Card title="not so cool today" date="28" weekday="THU" labels={[]}>Today I have no labels for you</Card>
        </Wrapper>
    );
};
