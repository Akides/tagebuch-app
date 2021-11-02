import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Diary {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    updateDate: string;

    // one to many -> entries
    // id
    // 


}