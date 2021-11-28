/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Entry } from "./Entry/Entry";
import { Theme } from "../Themes"
import { GlobalStyle } from "../globalStyles";
import { Card } from "./Card/Card";
import styled from "styled-components";
import { mapDateToWeekday, mapMonthToStr } from "../util/Util";

  const Mainbar = styled.div`
    float: left;
    border-right: #ddd 2px solid;
    padding-bottom: 100%;
  `;

  const StyledDate = styled.div`
    font-weight: bold;
    margin: 10px;
    margin-top: 30px;
    padding-bottom: 5px;
    border-bottom: ${props => props.theme.sizes.borderWidth} solid ${props => props.theme.colors.borderColor};
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


function handleAddButtonClick():void{
  console.log("test");
  
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
        cardsArr.push(<StyledDate key={firstDate}>{mapMonthToStr(lastMonth)} {lastYear}</StyledDate>);

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
            cardsArr.push(<StyledDate key={date}>{mapMonthToStr(month)} {year}</StyledDate>);
          }

          lastYear = year;
          lastMonth = month;

          let labelNames: string[] = [];
          let labelColors: string[] = [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let labelsArr: any = [];
          for (let j = 0; j < labels.length; j++) {
            const label = labels[j];
            labelsArr.push(label);
            labelNames.push(label["name"]);
            labelColors.push(label["color"]);
          }

          const cardComp = <Card key={id} title={title} day={day} weekday={mapDateToWeekday(date)} labels={labelsArr} onClick={async () => {
            const res = await fetch(`/api/entry/${id}`);
            const resJson = await res.json();
            const entry = resJson["data"];
            const dateObj = new Date(entry["date"]);
            const entryComp = <Entry key={id} id={id} title={entry["title"]} labels={labelsArr} date={realDate} onClickFunc={rerender}>{entry["content"]}</Entry>
            setEntry(entryComp);
          }}>{card["content"]}</Card>
          cardsArr.push(cardComp);
        }
        if (cardsArr.length == 0) {
          cardsArr.push(<div>no cards loaded.</div>)
        }
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

  
function onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>):void{
    console.log(e.target.value);
}