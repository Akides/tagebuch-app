import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Day } from "./day";

@Entity()
export class Entry {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({default: 'untitled'})
    title: string;

    @Column({nullable: true})
    content: string;

    @Column({nullable: true})
    imgURL: string;

    @ManyToOne(() => Day, (day) => day.entries)
    day: Day;

    

    //@Column()
    //elements: Array<string>    // for img, vids, rec. Saves media url
}