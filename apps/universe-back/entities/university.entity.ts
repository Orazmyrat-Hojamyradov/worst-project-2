import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Rating } from './rating.entity';
// import { UniversityTranslation } from './university.translation.entity';

@Entity()
export class University {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  photoUrl: string; 

  @Column({type:'jsonb', nullable: true})
  name: {
    en: string;
    ru: string;
    tm: string;
  };

  @Column({ type:'jsonb', nullable: true })
  description: {
    en: string;
    ru: string;
    tm: string;
  };

  @Column({ type: 'jsonb', nullable: true })  
  specials: {
    en: string;
    ru: string;
    tm: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  financing: {
    en: string;
    ru: string;
    tm: string;
  };

  @Column({ type: 'jsonb',nullable: true })
  duration: {
    en: string;
    ru: string;
    tm: string;
  };

  @Column({ nullable: true })
  applicationDeadline: string;

  @Column({ type: 'jsonb', nullable: true })
  gender: {
    en: string;
    ru: string;
    tm: string;
  };

  @Column({ nullable: true })
  age: number;

  @Column({ type: 'jsonb', nullable: true })
  others: {
    en: string;
    ru: string;
    tm: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  medicine: {
    en: string;
    ru: string;
    tm: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  salary: {
    en: string;
    ru: string;
    tm: string;
  };

  @Column({ type:'jsonb', nullable: true })
  domitory: {
    en: string;
    ru: string;
    tm: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  rewards: {
    en: string;
    ru: string;
    tm: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  others_p: {
    en: string;
    ru: string;
    tm: string;
  };

  @Column({ nullable: true })
  officialLink: string;

  @OneToMany(() => Rating, (rating) => rating.university)
  ratings: Rating[];

  // @OneToMany(
  //   () => UniversityTranslation,
  //   (translation) => translation.university,
  //   { cascade: true },
  // )

  // translations: UniversityTranslation[];
}
 