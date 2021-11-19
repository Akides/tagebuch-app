import React, { ReactNode } from "react";
import styleCard from "./Card.module.css"

type CardProps = {
    labels: string[],
    children?: ReactNode,
    date: string,
    weekday: string
}

export const Card: React.VFC<CardProps> = ({children, labels, date, weekday}) => 
    {

        const labels_2 = labels.map((label) => <li key={label}>{label}</li>)    //need to provide key for react

        return (
            <div className={styleCard.root}>
                <div className={styleCard.date}>{date}</div>
                <div className={styleCard.weekday}>{weekday}</div>
                <div className={styleCard.descr}>{children}</div>
                <div className="labels">{labels_2}</div>
            </div>
        )
    }
