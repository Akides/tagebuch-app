
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'


type EntryViewProps = {
}

export const EntryView: React.VFC<EntryViewProps> = () => {
    const { id } = useParams();
    return (
        <Fragment>
            <div>ENTRYVIEW! HIER ID: {id}</div>
        </Fragment>
    );
};