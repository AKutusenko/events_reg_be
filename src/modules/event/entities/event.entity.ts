import { Entity, Column, OneToMany } from 'typeorm'

import { CoreEntity } from "src/common/entities";
import Participant from './participant.entity';

@Entity()
export default class Event extends CoreEntity {
  @Column({ type: 'varchar', name: 'title' })
  title: string;

  @Column({ type: 'varchar', name: 'description' })
  description: string;

  @Column({ type: 'varchar', name: 'eventDate' })
  eventDate: string;

  @Column({ type: 'varchar', name: 'organizer' })
  organizer: string;

  @OneToMany(() => Participant, participant => participant.event, { nullable: true })
  participants: Participant[];
}