
import React, { Fragment, useEffect, useState } from "react";
import { Entry } from "../components/Entry";
import { Card } from "../components/Card";
import styled from "styled-components";
import { createDownloadLink, fetchEntriesCSV, mapDateToWeekday, mapMonthToStr } from "../util/Util";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import { Button, Chip } from "@mui/material";


const Mainbar = styled.div`
  background-color: #f8f8f8;
  float: left;
  border-right: #ddd 2px solid;
  padding-bottom: 100%;
  margin-left: 270px;
`;

const Sidebar = styled.div`
  width: 270px;
  position: fixed;
  float: left;
  background-color: #1b1b1b;
  border-right: #ddd 2px solid;
  padding-bottom: 100%;
  align-items: center;
`;

const StyledDate = styled.div`
  font-weight: bold;
  margin: 10px;
  margin-top: 30px;
  padding-bottom: 5px;
  border-bottom: ${props => props.theme.sizes.borderWidth} solid ${props => props.theme.colors.borderColor};
`;


const AddButton = styled.button`
  background-color:${props => props.theme.colors.elementsColor};
  border: none;
  border-radius: 50px;
  color: white;
  padding: 5px 100px;
  margin: auto;
  text-align: center;
  text-decoration: none;
  display: flex;
  font-size: 16px;
  &:hover {
    background-color: #94b693;
  }
  &:active {
    background-color: #b8e0b7;
  }
`;

const SearchInput = styled.input`
  display: flex;
  margin: 12px auto;
  margin-top: 30px;
  font-size: 15px;
  border-radius: 50px;
`;

const Labels = styled.div`
    //margin: auto;
    //display: block;
    margin: 20px;
    padding: 5px;
    border-radius: 5px;
    background-color: white;

`;

const StyledHeader = styled.div`
  margin: 10px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 5px;
  color: white;
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};
`;

const LabelInfo = styled.div`
  color: white;
  margin: 20px;
`;

const A = styled.a`
  color: #979797;
  position: fixed;
  bottom: 20px;
  left: 27px;
`;

const options = [
  'Entries', 'Date'
];

let selectedOption = options[0];



export const CardsView: React.VFC = () => {
  const [cards, setCards] = useState<JSX.Element[] | null>(null);
  const [entry, setEntry] = useState<JSX.Element | null>(null);
  const [labels, setLabels] = useState<JSX.Element[] | null>(null);
  const [render, setRender] = useState(false);
  const [labelInfo, setLabelInfo] = useState("");
  const [download, setDownload] = useState("");
  let cardsArr : JSX.Element[] = [];

  function rerender() {
    setRender(true);
  }


  const setNewEntry = ():void => {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const entryComp = <Entry key={'unsaved'} id={'unsaved'} edit={true} preview={false} title="" labels={[]} date={date} onClickFunc={rerender}></Entry>
    setEntry(entryComp);
  }

  const handleDeleteLabel = async (id: string) => {
    const res = await fetch(`/api/label/${id}`, {
                    method: 'DELETE'
                });
    if (res.status != 200) {    //label already exists
        throw new Error("Label still attached to entries.");
    }
  }

  const searchCards = async (input: string, selectedOption: string) => {
    if (!/\S/.test(input)) {  // contains only whitespaces or nothing
      rerender();
      return;
    }
  
    let cardJson = "";
    let res: Response;
    
    if (selectedOption == options[0]) {
      res = await fetch(`/api/entry/byInput/${input}`);
      cardJson = await res.json();
    } else {
      res = await fetch(`/api/entry/byDate/${input}`);
      cardJson = await res.json();
    }

    if (res.status != 200) {    //label already exists
      throw new Error("could not search cards");
    }
    
    constructEntries(cardJson);
    
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructSidebarLabels = async (labelJson: any) => {
    const labels = labelJson["data"];
    const labelArr = [];
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const labelId = label["id"];
      labelArr.push(<Chip key={labelId} label={label["name"]} variant="outlined" 
      onClick={async () => {
        const res = await fetch(`/api/entry/byLabel/${labelId}`);
        if (res.status != 200) {
          throw new Error("could not fetch data.");
        }
        const cardJson = await res.json();
        constructEntries(cardJson);
      }}
      onDelete={() => {handleDeleteLabel(labelId).catch(error => setLabelInfo(error+"")); rerender();}}
      />);
    }
    setLabels(labelArr);
  }

  useEffect(() => {
    (async function () {
      //request cards
      try {
        const cardsRequest = await fetch("/api/entry/sorted");
        const cardJson = await cardsRequest.json();
        constructEntries(cardJson);

        //request labels to sidebar
        const sidebarLabels = await fetch('/api/label');
        const labelJson = await sidebarLabels.json();
        constructSidebarLabels(labelJson);

        //prepare download link
        const text = await fetchEntriesCSV();
        const link = createDownloadLink(text);
        setDownload(link);
      } catch (error) {
        alert("something went wrong! Could not fetch data.");
      }
      

    })();
  },[render]);

    
/**
 * construct entries as cards components and as entry components
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const constructEntries = async (cardJson: any) => {
  cardsArr = [];
  const data = cardJson["data"];
  if (data.length == 0) {
    cardsArr.push(<div key="no_entries">no entries.</div>);
    setCards(cardsArr);
    setRender(false);
    return;
  }
  const firstDate = data[0]["date"];
  let lastYear: string = firstDate.substring(0,4);
  let lastMonth: string = firstDate.substring(5,7);
  cardsArr.push(<StyledDate key={firstDate}>{mapMonthToStr(lastMonth)} {lastYear}</StyledDate>);

  for (let i = 0; i < data.length; i++) {
    const card = data[i];
    const labelsTmp = card["labels"];
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const labelsArr: any = [];
    for (let j = 0; j < labelsTmp.length; j++) {
      const label = labelsTmp[j];
      labelsArr.push(label);
    }
    const cardComp = <Card key={id} title={title} day={day} weekday={mapDateToWeekday(date)} labels={labelsArr} onClick={async () => {
      const res = await fetch(`/api/entry/${id}`);
      if (res.status != 200) {
        throw new Error("could not fetch data.");
      }
      const resJson = await res.json();
      const entry = resJson["data"];
      const entryComp = <Entry key={id} id={id} edit={false} preview={true} title={entry["title"]} labels={labelsArr} date={realDate} onClickFunc={rerender}>{entry["content"]}</Entry>
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

const styleButton = {margin: "20px"};


return (
    <Fragment>
        <Sidebar>
            <Dropdown options={options} value={selectedOption} onChange={(e) => selectedOption = e.value} placeholder="Select an option" />
            <SearchInput type="text" placeholder="search" onKeyPress={e => {
                if (e.key == 'Enter') searchCards((e.target as HTMLInputElement).value, selectedOption);
                }} />
            <AddButton onClick={setNewEntry}>New</AddButton>
            <StyledHeader>Labels</StyledHeader>
            <Labels>{labels}</Labels>
            <LabelInfo>{labelInfo}</LabelInfo>
            <Button color="secondary" style={styleButton} onClick={() => rerender()}>Show All</Button>
            <A href={download} download="entries.csv">DOWNLOAD</A>
        </Sidebar>
        <Mainbar>
            {cards}
        </Mainbar>
        <div>
            {entry}
        </div>
    </Fragment>
    );
};