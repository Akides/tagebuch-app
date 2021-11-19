import { PrimaryColumn, Entity, OneToMany, Column } from "typeorm";
import { Entry } from "./entry";

@Entity()
export class Day {

    @PrimaryColumn({unique: true})
    date: string;

    @Column()
    weekday: string;

    //@PrimaryColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) // use sql statement
    //time: string;

    @OneToMany(() => Entry, (entry) => entry.day)
    entries: Entry[];
}