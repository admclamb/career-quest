import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { BoardColumn } from './board-column.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Company, (company) => company.jobs)
  company: Company;

  @Column({ nullable: false })
  jobTitle: string;

  @Column({ nullable: true, length: 750 })
  description: string;

  @Column({ nullable: true })
  postUrl: string;

  @ManyToOne(() => BoardColumn, (column) => column.jobs)
  column: Promise<BoardColumn>;

  @Column({ nullable: false })
  userSub: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
