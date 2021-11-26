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
  `;

function onClickHandler(card: any) {

  const entryFunc = () => {

    const [entry, setEntry] = useState<JSX.Element | null>(null);

    const title = card["title"];
    const content = card["content"];
    const date = card["date"];
    const weekday = card["weekday"];
    const id = card["id"];
    setEntry(<Entry key={id} title={title} labels={[]} date="" weekday=""></Entry>);
  };

}

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
            const entryComp = <Entry title={title} labels={labelNames} date={date} weekday={weekday}>{card["content"]}</Entry>
            setEntry(entryComp);
          }}>{card["content"]}</Card>);
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
    console.log("clicked");
  }
  
  function onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>){
    console.log(e.target.value); 
}