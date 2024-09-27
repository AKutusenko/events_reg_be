import { Entity, Column, ManyToOne } from 'typeorm';

import { CoreEntity } from "src/common/entities";

import Event from './event.entity';
import { ComeFrom } from '../enums';

@Entity()
export default class Participant extends CoreEntity {
  @Column({ type: 'varchar', name: 'fullName' })
  fullName: string;

  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @Column({ type: 'varchar', name: 'birthDate' })
  birthDate: string;

  @Column({ type: 'varchar', name: 'comeFrom' })
  comeFrom: ComeFrom;

  @ManyToOne(() => Event, event => event.participants)
  event: Event;

  @Column({ type: 'uuid', name: 'eventId' })
  eventId: string;
}