import { PrimaryColumn, Entity } from "typeorm";

@Entity()
export class Day {

    @PrimaryColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) // use sql statement
    time: string;
}