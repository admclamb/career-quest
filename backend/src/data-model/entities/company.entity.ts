import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Job } from './job.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Job, (job) => job.company)
  jobs: Promise<Job>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
