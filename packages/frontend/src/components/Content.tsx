import { Theme } from "../Themes"

import React from "react";
import { Mainbar } from "./Mainbar";

export const Content: React.VFC = () => {
    return (
        <Theme>
            <Mainbar/>
        </Theme>
    );
};
