/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from "react";
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

  const Date = styled.div`
    font-weight: bold;
  `;


  const AddButton = styled.button`
    color: ${props => props.theme.colors.fontColor};
    float: right;
  `;

export const Content: React.VFC = () => {
  const [cards, setCards] = useState<JSX.Element[] | null>(null);
  const [entry, setEntry] = useState<JSX.Element | null>(null);
  const [render, setRender] = useState(false);
  let cardsArr : JSX.Element[] = [];

  function rerender() {
    setRender(true);
  }

    useEffect(() => {
      (async function () {

        //request cards
        const cardsRequest = await fetch("/api/entry/sorted");
        const cardJson = await cardsRequest.json();
        const data = cardJson["data"];
        const firstDate = data[0]["date"];
        let lastYear: string = firstDate.substring(0,4);
        let lastMonth: string = firstDate.substring(5,7);
        cardsArr.push(<Date key={firstDate}>{lastMonth}-{lastYear}</Date>);

        for (let i = 0; i < data.length; i++) {
          const card = data[i];
          const labels = card["labels"];
          const id = card["id"];
          const title = card["title"];

          const date: string = card["date"];
          const realDate = date.substring(0,10);
          const dateParts = realDate.split('-');
          const year = dateParts[0];
          const month = dateParts[1];
          const day = dateParts[2];
          
          if ((year != lastYear) || (year == lastYear && month != lastMonth)) {
            cardsArr.push(<Date key={date}>{month}-{year}</Date>);
          }

          lastYear = year;
          lastMonth = month;

          const weekday = card["weekday"];
          let labelNames: string[] = [];
          let labelColors: string[] = [];
          let labelsArr: any = [];
          for (let j = 0; j < labels.length; j++) {
            const label = labels[j];
            labelsArr.push(label);
            labelNames.push(label["name"]);
            labelColors.push(label["color"]);
          }
          const cardComp = <Card key={id} title={title} date={day} weekday={weekday} labels={labelsArr} onClick={async () => {
            const res = await fetch(`/api/entry/${id}`);
            const resJson = await res.json();
            const entry = resJson["data"];
            const entryComp = <Entry key={id} id={id} title={entry["title"]} labels={labelsArr} date={realDate} onClickFunc={rerender} weekday={entry["weekday"]}>{entry["content"]}</Entry>
            setEntry(entryComp);
          }}>{card["content"]}</Card>
          cardsArr.push(cardComp);
        }
        //cardsArr.forEach((card: any) => {console.log(card)});
        setCards(cardsArr);
        setRender(false);
      })();
    },[render]);

    return (
        <Theme>
            <Sidebar/>
            <Mainbar>
              {cards}
              <AddButton onClick={handleAddButtonClick}>Add</AddButton>
            </Mainbar>
            {entry}
        </Theme>
    );
};

function handleAddButtonClick(){
  console.log("test");

}
  
function onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>){
    console.log(e.target.value);
}

