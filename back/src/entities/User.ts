import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Crendential";
import { Appointment } from "./Appointment";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, })
  username: string;

  @Column()
  email: string;

  @Column()
  birthdate: Date;

  @Column("integer")
  nDni: number;

  @OneToOne(() => Credential )
  @JoinColumn()
  credential: Credential;
  
  
  @OneToMany(()=>Appointment,(Appointment)=>Appointment.user) appoiments: Appointment[]
}
