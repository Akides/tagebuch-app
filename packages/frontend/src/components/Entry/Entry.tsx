import React, { Children, ReactNode } from "react";

type EntryProps = {
    title: string,
    children?: ReactNode
}

export const Card: React.VFC<EntryProps> = ({children, title}) => 
    <div className="entry">
        <h2>{title}</h2>
        <p>{children}</p>
    </div>