import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { University } from './university.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string; // or UUID, depending on your auth system

  @Column({ type: 'int' })
  score: number; // 1–5 stars

  @ManyToOne(() => University, (university) => university.ratings, { onDelete: 'CASCADE' })
  university: University;
}
