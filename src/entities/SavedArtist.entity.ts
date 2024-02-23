import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class SavedArtist extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int', unique: true})
    artistId: number;

    @Column({type: 'text'})
    name: string;
}
