import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users-lines' })
@Unique(['lineId'])
export class UsersLinesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'user_id', default: -1, nullable: false })
  public userId: number;

  @Column({ name: 'name', default: '', nullable: false })
  public name: string;

  @Column({ name: 'icon_url', default: '', nullable: false })
  public iconUrl: string;

  @Column({ name: 'line_id', default: '', nullable: false })
  public lineId: string;

  @Column({ name: 'link_code', default: '', nullable: false })
  public linkCode: string;

  @Column({ name: 'linked', default: false, nullable: false })
  public linked: boolean;

  @Column({ name: 'using', default: true, nullable: false })
  public using: boolean;

  @Column({ name: 'status', default: '', nullable: false })
  public status: string;

  @CreateDateColumn()
  readonly created?: Date;

  @UpdateDateColumn()
  readonly updated?: Date;
}

export default UsersLinesEntity;
