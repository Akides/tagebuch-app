import React from "react";
import { Card } from "./components/Card/Card";

export const App = () => {
  return (
  <div className="main">
    <Card date="25" weekday="mon" labels={["important","cool"]}>What am I going to do?</Card>
    <Card date="27" weekday="wed" labels={["unimportant","uncool"]}>I have done nothing?</Card>

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