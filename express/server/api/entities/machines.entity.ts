import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'machines' })
@Unique(['uniqueCode'])
export class MachinesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'name', default: '', nullable: false })
  public name: string;

  @Column({ name: 'model_name', default: '', nullable: false })
  public modelName: string;

  @Column({ name: 'unique_code', default: '', nullable: false })
  public uniqueCode: string;

  @Column({ name: 'take_photo', default: true, nullable: false })
  public takePhoto: boolean;

  @Column({ name: 'users_lines_id', nullable: false })
  public usersLinesId: number;

  @Column({ name: 'destination_type', nullable: false })
  public destinationType: string;

  @Column({ name: 'destination_id', nullable: false })
  public destinationId: string;

  @Column({ name: 'cron', default: 30, nullable: false })
  public cron: number;

  @Column({ name: 'synced', default: true, nullable: false })
  public synced: boolean;

  @Column({ name: 'stop', default: false, nullable: false })
  public stop: boolean;

  @Column({ name: 'using', default: true, nullable: false })
  public using: boolean;

  @CreateDateColumn()
  readonly created?: Date;

  @UpdateDateColumn()
  readonly updated?: Date;
}

export default MachinesEntity;
