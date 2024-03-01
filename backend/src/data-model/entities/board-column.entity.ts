import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Icon } from './icon.entity';
import { Job } from './job.entity';
import { Board } from './board.entity';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: true, length: 50 })
  label: string;

  @OneToMany(() => Icon, (icon) => icon.boardColumns)
  icon: Icon;

  @Column({ nullable: false })
  order: number;

  @ManyToOne(() => Board, (board) => board.columns)
  board: Promise<Board>;

  @OneToMany(() => Job, (job) => job.column)
  jobs: Job[];
}
