/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Entry } from "./Entry/Entry";
import { Theme } from "../Themes"
import { GlobalStyle } from "../globalStyles";
import { Card } from "./Card/Card";
import styled from "styled-components";

  export interface JokeResponse {
    type: string;
    value: Value;
  }
  
  export interface Value {
    id: number;
    joke: string;
    categories: unknown[];
  }

  const Mainbar = styled.div`
        float: left;
  `;

function onClickHandler() {
  alert("clicked!");
  
}

export const Content: React.VFC = () => {
  const cardDummy = [<Card key="-1" title="" date="" weekday="" labels={[]} onClick={null}>Cards could not be loaded.</Card>];
  const entryDummy = [<Entry key="-1" title="Entry could not  be loaded." labels={[]} date="" weekday=""></Entry>];
  const [cards, setCards] = useState(cardDummy);
  const [entry, setEntry] = useState(entryDummy);
    

    /*const [joke, setJoke] = useState<JokeResponse | null>(null);
    const fetchJoke = async () => {
      const jokeRequest = await fetch("http://api.icndb.com/jokes/random");
      const jokeJson = (await jokeRequest.json()) as JokeResponse;
      setJoke(jokeJson);
      //console.log(jokeJson.value.joke)
    };
  
    useEffect(() => {
      fetchJoke();
    },[]);*/

    /*<p>{joke !== null ? joke.value.joke : ""}</p>
    <button onClick={onButtonClickHandler}>Click here!</button>
    <input type="text" onChange={onInputChangeHandler} /> 
    */

    useEffect(() => {
      (async function () {

        //request cards
        const cardsRequest = await fetch("/api/entry");
        const cardJson = await cardsRequest.json();
        const data = cardJson["data"];
        let cardsArr = [];
        for (let i = 0; i < data.length; i++) {
          const card = data[i];
          console.log(card)
          const title = card["title"];
          const content = card["content"];
          const date = card["date"];
          const weekday = card["weekday"];
          //add keys!
          cardsArr.push(<Card title={title} date={date} weekday={weekday} labels={["important","cool"]} onClick={onClickHandler}>{content}</Card>);
        }

        //request entry
        const entryRequest = await fetch("/api/entry/")
        
        setCards(cardsArr);
      })();
    },[]);

    /*useEffect(() => {
      (async function () {
        console.log("Enbtry");
      })();
    },[entry]);*/

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