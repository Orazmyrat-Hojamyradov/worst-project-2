// import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { Rating } from "./rating.entity";
// import { University } from "./university.entity";

// @Entity()
// export class UniversityTranslation {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   language: string; // "en", "ru", "tm"

//   @Column({ nullable: true })
//   photoUrl: string; 

//   @Column()
//   name: string;

//   @Column({ nullable: true })
//   description: string;

//   @Column({ nullable: true })  
//   specials: string;

//   @Column({ nullable: true })
//   financing: string;

//   @Column({ nullable: true })
//   duration: string;

//   @Column({ nullable: true })
//   applicationDeadline: string;

//   @Column({ nullable: true })
//   gender: string;

//   @Column({ nullable: true })
//   age: number;

//   @Column({ nullable: true })
//   others: string;

//   @Column({ nullable: true })
//   medicine: string;

//   @Column({ nullable: true })
//   salary: string;

//   @Column({ nullable: true })
//   domitory: string;

//   @Column({ nullable: true })
//   rewards: string;

//   @Column({ nullable: true })
//   others_p: string;

//   @Column({ nullable: true })
//   officialLink: string;

//   @OneToMany(() => Rating, (rating) => rating.university)
//   ratings: Rating[];

//   @ManyToOne(() => University, (university) => university.translations, {
//     onDelete: 'CASCADE',
//   })
//   university: University;
// }