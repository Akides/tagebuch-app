import React from "react";
import { Card } from "./components/Card/Card";

export const App = () => {
  return (
  <div className="main">
    <Card title="Test">This is a card component</Card>
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