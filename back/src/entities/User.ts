import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { Credential } from "./Crendential";
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  username: string;

  @Column()
  email: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column("integer")
  nDni: number;

  @OneToOne(() => Credential)
  @JoinColumn()
  credential: Credential;

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments: Appointment[];
}