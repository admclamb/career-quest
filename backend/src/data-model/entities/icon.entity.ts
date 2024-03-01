import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardColumn } from './board-column.entity';

@Entity()
export class Icon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  icon: string;

  @ManyToOne(() => BoardColumn, (boardColumns) => boardColumns.icon)
  boardColumns: Promise<BoardColumn>;
}
