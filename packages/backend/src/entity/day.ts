import { PrimaryColumn, Entity, OneToMany } from "typeorm";
import { Entry } from "./entry";

@Entity()
export class Day {

    @PrimaryColumn({unique: true})
    date: string;

    //@PrimaryColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) // use sql statement
    //time: string;

    @OneToMany(() => Entry, (entry) => entry.day)
    entries: Entry[];
}