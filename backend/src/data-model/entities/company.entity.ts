import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Job, (job) => job.company)
  jobs: Promise<Job>;
}
