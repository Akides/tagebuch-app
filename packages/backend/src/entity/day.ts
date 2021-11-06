import { PrimaryColumn, Entity, ManyToOne } from "typeorm";
import { Entry } from "./entry";

@Entity()
export class Day {

    @PrimaryColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) // use sql statement
    time: string;

    @ManyToOne(() => Entry, (entry) => entry.days)
    entry: Entry;
}