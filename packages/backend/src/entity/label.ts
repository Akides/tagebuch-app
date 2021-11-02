import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Entry } from "./entry";

@Entity()
export class Label {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToMany(() => Entry)
    @JoinTable()
    entry: Entry[];
}