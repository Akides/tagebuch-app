import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    

    //@Column()
    //elements: Array<string>    // for img, vids, rec. Saves media url
}