/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Entry } from "../components/Entry";


type EntryViewProps = {
}

export const EntryView: React.VFC<EntryViewProps> = () => {
    const [entry, setEntry] = useState<JSX.Element | null>(null);
    const { id } = useParams();
    

    useEffect(() => {
        (async function () {
            const res = await fetch(`/api/entry/${id}`);
            const resJson = await res.json();
            const entry = resJson["data"];
            const entryComp = <Entry key={id} id={id as string} edit={false} preview={false} title={entry["title"]} labels={entry["labels"]} date={entry["date"].substring(0,10)} onClickFunc={() => {return}}>{entry["content"]}</Entry>
            setEntry(entryComp);
          })();
    }, []);

    return (
        <Fragment>
            {entry}
        </Fragment>
    );
};

