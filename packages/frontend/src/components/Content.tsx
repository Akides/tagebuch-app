/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from "react";
import { Entry } from "./Entry/Entry";
import { Theme } from "../Themes"
import { Card } from "./Card/Card";
import styled from "styled-components";
import { mapDateToWeekday, mapMonthToStr } from "../util/Util";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

  const Mainbar = styled.div`
    background-color: #f8f8f8;
    float: left;
    border-right: #ddd 2px solid;
    padding-bottom: 100%;
    margin-left: 270px;
  `;

  const Sidebar = styled.div`
    position: fixed;
    float: left;
    background-color: #1b1b1b;
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

  const SearchInput = styled.input`
    margin: 12px;
    font-size: 15px;
  `;








const options = [
  'Entries', 'Label', 'Date'
];



export const Content: React.VFC = () => {
  const defaultOption = options[0];
  let selectedOption = defaultOption;
  
  const [cards, setCards] = useState<JSX.Element[] | null>(null);
  const [entry, setEntry] = useState<JSX.Element | null>(null);
  const [render, setRender] = useState(false);
  let cardsArr : JSX.Element[] = [];


  function rerender() {
    setRender(true);
  }


function setNewEntry():void {
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const entryComp = <Entry key={'unsaved'} id={'unsaved'} edit={true} title="" labels={[]} date={date} onClickFunc={rerender}></Entry>
  setEntry(entryComp);
}

async function searchCards(input: string, selectedOption: string) {

  if (!/\S/.test(input)) {  // contains only whitespaces or nothing
    rerender();
    return;
  }

  let cardJson = "";
  if (selectedOption == options[0]) {
    const res = await fetch(`/api/entry/byInput/${input}`);
    cardJson = await res.json();
  }

  if (selectedOption == options[1]) {
    const res = await fetch(`/api/entry/byLabel/${input}`);
    cardJson = await res.json();
  }
  
  if (selectedOption == options[2]) {
    const res = await fetch(`/api/entry/byDate/${input}`);
    cardJson = await res.json();
  }

  construct(cardJson);
  
}


function handleRemoveButtonClick():void {
  console.log("test");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function construct(cardJson: any) {
  const data = cardJson["data"];
        if (data.length == 0) {
          console.log("zero");
          cardsArr.push(<div key="no_entries">no entries.</div>);
          setCards(cardsArr);
          setRender(false);
          return;
        }
        // TODO: catch for if there is no card!
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
            const entryComp = <Entry key={id} id={id} edit={false} title={entry["title"]} labels={labelsArr} date={realDate} onClickFunc={rerender}>{entry["content"]}</Entry>
            setEntry(entryComp);
          }}>{card["content"]}</Card>
          cardsArr.push(cardComp);
        }
        if (cardsArr.length == 0) {
          cardsArr.push(<div>no cards loaded.</div>)
        }
        setCards(cardsArr);
        setRender(false);
}


    useEffect(() => {
      (async function () {
        //request cards
        const cardsRequest = await fetch("/api/entry/sorted");
        const cardJson = await cardsRequest.json();
        construct(cardJson);
      })();
    },[render]);

    return (
        <Theme>
            <Sidebar>
              <Dropdown options={options} value={defaultOption} onChange={(e) => console.log(e.value)} placeholder="Select an option" />;
              <SearchInput type="text" placeholder="Search entries, labels" onKeyPress={e => {
                  if (e.key == 'Enter') searchCards((e.target as HTMLInputElement).value, selectedOption);
                }} />
            </Sidebar>
            <Mainbar>
              {cards}
              <AddButton onClick={setNewEntry}>Add</AddButton>
            </Mainbar>
            {entry}
        </Theme>
    );
};
  
function onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>):void{
    console.log(e.target.value);
}