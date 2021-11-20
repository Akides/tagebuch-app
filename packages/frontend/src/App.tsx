/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from "react";
import { Card } from "./components/Card/Card";


export interface JokeResponse {
  type: string;
  value: Value;
}

export interface Value {
  id: number;
  joke: string;
  categories: any[];
}


export const App = () => {

  const [cards, setCards] = useState("Diary entries could not be loaded");


  const [joke, setJoke] = useState<JokeResponse | null>(null);
  const fetchJoke = async () => {
    const jokeRequest = await fetch("http://api.icndb.com/jokes/random");
    const jokeJson = (await jokeRequest.json()) as JokeResponse;
    setJoke(jokeJson);
    //console.log(jokeJson.value.joke)
  };

  useEffect(() => {
    // credentials for testing purposes
    const serverAddr = 'http://localhost:3000';
    let rows = [];
    fetchJoke();
  },[]);

  return (
  <div className="main">
    <section className="Cards">
      <Card date="25" weekday="mon" labels={["important","cool"]}>What am I going to do?</Card>
      <Card date="27" weekday="wed" labels={["unimportant","uncool"]}>I have done nothing?</Card>
      <p>{joke !== null ? joke.value.joke : ""}</p>
    </section>

    <button onClick={onButtonClickHandler}>Click here!</button>
    <input type="text" onChange={onInputChangeHandler} />
  </div>
  )
};

function onButtonClickHandler() {
  console.log("clicked");
}

function onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>){
  console.log(e.target.value);
}