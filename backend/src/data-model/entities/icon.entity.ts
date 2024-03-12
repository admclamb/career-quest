import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardColumn } from './board-column.entity';

@Entity()
export class Icon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  icon: string;

  @OneToMany(() => BoardColumn, (boardColumns) => boardColumns.icon)
  boardColumns: Promise<BoardColumn>;
}
