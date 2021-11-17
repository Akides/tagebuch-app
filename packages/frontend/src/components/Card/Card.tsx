import React, { Children, ReactNode } from "react";
import styles from "./Card.module.css"

type CardProps = {
    title: string,
    children?: ReactNode
}

export const Card: React.VFC<CardProps> = ({children, title}) => 
    <div className={styles["card"]}>
        <h2>{title}</h2>
        <p>{children}</p>
    </div>