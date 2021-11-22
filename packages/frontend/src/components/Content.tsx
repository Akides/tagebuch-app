/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { Mainbar } from "./Mainbar";
import { Sidebar } from "./Sidebar";
import { Entry } from "./Entry/Entry";
import { Theme } from "../Themes"
import { GlobalStyle } from "../globalStyles";

export interface JokeResponse {
    type: string;
    value: Value;
  }
  
  export interface Value {
    id: number;
    joke: string;
    categories: any[];
  }

export const Content: React.VFC = () => {

    //const [cards, setCards] = useState("Diary entries could not be loaded");

    

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

    useEffect(() => {
      (async function () {
        const cardsRequest = await fetch("/api");
        const cardJson = await cardsRequest.json();
        console.log(cardJson);
      })();
    });

    return (
        <Theme>
            <p>{joke !== null ? joke.value.joke : ""}</p>
            <button onClick={onButtonClickHandler}>Click here!</button>
            <input type="text" onChange={onInputChangeHandler} /> 
            <Sidebar/>
            <Mainbar/>
            <Entry title="nice title" labels={["important, cool"]} date="22.11.2021" weekday="Monday">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non ultrices ligula. Nunc a tincidunt lacus, ut commodo enim. Curabitur iaculis, arcu sed congue malesuada, eros velit vulputate eros, eget lacinia magna leo a orci. Aenean commodo finibus augue vitae pretium. Aenean sit amet finibus mauris. Nullam ac accumsan urna. Nulla bibendum nunc tortor. Vivamus pellentesque nunc vitae dui vestibulum tincidunt ut at neque. Ut dapibus risus eu odio eleifend condimentum. Duis neque erat, dictum facilisis ullamcorper id, egestas sit amet ex. Proin vitae ligula euismod, volutpat elit at, lobortis nulla.
            Nulla vel eros non erat tristique pulvinar. Nullam elementum cursus sem, at cursus risus scelerisque sit amet. Nunc mattis elementum nisi pulvinar ultrices. Cras pulvinar, ex at convallis bibendum, nibh justo ultrices tortor, ut pellentesque arcu diam vitae lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In pretium et velit ac egestas. Morbi erat sapien, mollis vitae aliquet in, fringilla sit amet neque. Ut commodo magna ut scelerisque rutrum. Maecenas rhoncus magna eget quam pulvinar, at molestie erat elementum.
            Donec aliquet consectetur elit eget ultricies. Ut vehicula odio placerat vestibulum molestie. Vivamus tristique metus tempor vehicula consequat. Nullam sed sapien sed sem aliquet venenatis sit amet vel lorem. Curabitur tempus, augue vitae lacinia fringilla, diam magna malesuada ligula, quis pharetra ante orci quis orci. Vestibulum posuere porttitor luctus. Quisque mi metus, sodales id erat ac, eleifend laoreet urna. Vivamus rutrum, enim quis rutrum eleifend, turpis tortor tempus nisi, a mattis quam risus id mauris. Aliquam quis eros placerat eros scelerisque blandit at sed quam. Donec sollicitudin nulla et justo gravida viverra. Fusce vel purus sit amet ligula vehicula tempus. Nullam nec varius nunc. Cras faucibus dapibus luctus. Etiam cursus sapien quis ultrices malesuada. Fusce cursus tortor feugiat nisl laoreet tempor. Praesent eu turpis in ante porta molestie.
            Pellentesque non tempus massa. Sed placerat varius massa, eu ornare orci hendrerit ac. Fusce et odio ante. Donec tellus diam, mollis nec tempor vehicula, sagittis facilisis diam. Pellentesque euismod sem eu urna semper tempus. Pellentesque pulvinar nisl a lacus aliquet, at convallis erat fringilla. Etiam consequat varius sem at euismod. Vestibulum at urna eget turpis malesuada feugiat. Maecenas venenatis, sem et elementum viverra, libero dui congue tortor, ut venenatis eros tellus vitae tellus. Nulla interdum, enim in dictum rutrum, est arcu vehicula est, id efficitur ligula ipsum sed nibh. Quisque ac mi aliquet, maximus massa eu, aliquet metus. Vivamus in dapibus nisi.
            Quisque tincidunt sapien sed accumsan blandit. Integer pretium erat et arcu tempus feugiat. In hac habitasse platea dictumst. Duis malesuada et sapien et aliquet. Maecenas ornare erat sed leo luctus, id faucibus tortor vehicula. Fusce ullamcorper, libero in sollicitudin pretium, nibh risus dapibus ipsum, et vestibulum libero justo sit amet sem. Duis tortor ligula, dictum posuere ullamcorper sit amet, tristique ac justo. Cras cursus augue nec sem suscipit vulputate. Nullam non ex a turpis semper feugiat vitae id neque. Duis consectetur ut elit sit amet bibendum. Morbi vel purus vel erat varius viverra. Nullam pretium, leo ac accumsan finibus, dolor eros ornare nunc, eget congue erat ipsum sit amet purus.
            </Entry>
        </Theme>
    );
};

function onButtonClickHandler() {
    console.log("clicked");
  }
  
  function onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>){
    console.log(e.target.value); 
}