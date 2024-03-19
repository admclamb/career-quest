import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardColumn } from './board-column.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: false, length: 50 })
  title: string;

  @OneToMany(() => BoardColumn, (boardColumn) => boardColumn.board, {
    cascade: ['insert', 'remove'],
  })
  columns: BoardColumn[];

  @Column({ nullable: false })
  userSub: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  public removePrivateProperties() {
    this.userSub = null;
  }

  public sortColumns() {
    this.columns = this.columns.sort((a, b) => a.order - b.order);
  }
}
