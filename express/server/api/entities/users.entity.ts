import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['name', 'email'])
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'name', default: '', nullable: false })
  public name: string;

  @Column({ name: 'email', default: '', nullable: false })
  public email: string;

  @Column({ name: 'email_link_code', default: '', nullable: false })
  public emailLinkCode: string;

  @Column({ name: 'email_linked', default: false, nullable: false })
  public emailLinked: boolean;

  @Column({ name: 'password', default: '', nullable: false })
  public password: string;

  @Column({ name: 'using', default: true, nullable: false })
  public using: boolean;

  @CreateDateColumn()
  readonly created?: Date;

  @UpdateDateColumn()
  readonly updated?: Date;
}

export default UsersEntity;
