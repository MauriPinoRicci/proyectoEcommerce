import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, })
  username: string;

  @Column()
  email: string;

  @Column()
  birthdate: number;

  @Column("integer")
  nDni: number;

  @Column()
  credentialsId: number;
}
