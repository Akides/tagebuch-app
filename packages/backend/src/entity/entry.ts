import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Day } from "./day";
import { Label } from "./label";

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

    @Column("text", {nullable: true})
    content: string;

    @Column({nullable: true})
    imgURL: string;

    @ManyToOne(() => Day, (day) => day.entries)
    day: Day;

    @ManyToMany(() => Label, label => label.entries)
    @JoinTable()
    labels: Label[];

    

    //@Column()
    //elements: Array<string>    // for img, vids, rec. Saves media url
}