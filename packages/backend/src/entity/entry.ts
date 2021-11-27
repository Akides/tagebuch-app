import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @Column('datetime')
    date: Date;

    @Column()
    weekday: string;

    @ManyToMany(() => Label, label => label.entries)
    @JoinTable()
    labels: Label[];

    

    //@Column()
    //elements: Array<string>    // for img, vids, rec. Saves media url
}