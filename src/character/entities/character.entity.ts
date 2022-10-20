import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    nickname: string

    @Column()
    photo: string;

    @Column({ type: 'json'})
    appearances: object

}
