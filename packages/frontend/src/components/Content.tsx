/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Entry } from "./Entry/Entry";
import { Theme } from "../Themes"
import { GlobalStyle } from "../globalStyles";
import { Card } from "./Card/Card";
import styled from "styled-components";

  const Mainbar = styled.div`
    float: left;
    border-right: #ddd 2px solid;
    padding-bottom: 100%;
  `;

export const Content: React.VFC = () => {
  const [cards, setCards] = useState<JSX.Element[] | null>(null);
  const [entry, setEntry] = useState<JSX.Element | null>(null);

    useEffect(() => {
      (async function () {

        //request cards
        const cardsRequest = await fetch("/api/entry");
        const cardJson = await cardsRequest.json();
        const data = cardJson["data"];
        let cardsArr = [];

        for (let i = 0; i < data.length; i++) {
          const card = data[i];
          const labels = card["labels"];
          const id = card["id"];
          const title = card["title"];
          const date = card["date"];
          const weekday = card["weekday"];
          let labelNames: string[] = [];
          let labelColors: string[] = [];
          for (let i = 0; i < labels.length; i++) {
            const label = labels[i];
            labelNames.push(label["name"]);
            labelColors.push(label["color"]);
          }
          cardsArr.push(<Card key={id} title={title} date={date} weekday={weekday} labels={labelNames} onClick={async () => {
            const res = await fetch(`/api/entry/${id}`);
            const resJson = await res.json();
            const entry = resJson["data"];
            const entryComp = <Entry key={id} id={id} title={entry["title"]} labels={labelNames} date={entry["date"]} weekday={entry["weekday"]}>{entry["content"]}</Entry>
            setEntry(entryComp);
          }}></Card>);
        }
        setCards(cardsArr);
      })();
    },[]);

    return (
        <Theme>
            <Sidebar/>
            <Mainbar>
              {cards}
            </Mainbar>
            {entry}
        </Theme>
    );
};

function onButtonClickHandler() {
    console.log("click");
  }
  
  function onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>){
    console.log(e.target.value); 
}