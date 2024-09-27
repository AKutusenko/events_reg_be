import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { EventCreateDto } from './dto/event-create.dto';
import Event from './entities/event.entity';
import { ParticipantResponseDto } from './dto/participant-response.dto';
import { ParticipantCreateDto } from './dto/participant-create.dto';
import { EventResponseDto } from './dto/event-response.dto';
import Participant from './entities/participant.entity';
import { PaginatedEventsResponseDto } from './dto/event-response-paginated.dto';
import { EventSortBy, EventSortOrder } from './enums';

@Injectable()
export class EventService {
  createPars: any;
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>, // This is likely the missing part
  ) { }

  async createEvent(data: EventCreateDto): Promise<EventResponseDto> {
    try {
      const event = this.eventRepository.create(data);
      await this.eventRepository.save(event);
      return event;
    } catch (error) {
      throw error;
    }
  }

  async createParticipant(data: ParticipantCreateDto): Promise<ParticipantResponseDto> {
    try {
      const event = await this.eventRepository.findOne({ where: { id: data.eventId } });
      if (!event) {
        throw new NotFoundException(`Event with id ${data.eventId} not found`);
      }

      const existingParticipant = await this.participantRepository.findOne({
        where: {
          email: data.email,
          event: { id: data.eventId }
        }
      });

      if (existingParticipant) {
        throw new ConflictException(`Participant with email ${data.email} is already added to this event`);
      }

      const participant = this.participantRepository.create({ ...data, event });
      await this.participantRepository.save(participant);
      return participant;

    } catch (error) {
      throw error;
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    sortBy: EventSortBy = EventSortBy.TITLE,
    order: EventSortOrder = EventSortOrder.ASC,
  ): Promise<PaginatedEventsResponseDto> {
    try {
      const [data, total] = await this.eventRepository.findAndCount({
        relations: ['participants'],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          [sortBy]: order,
        },
      });

      if (!data || data.length === 0) {
        throw new NotFoundException('Not found');
      }

      return {
        data,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async findEventById(id: string): Promise<EventResponseDto> {
    try {
      const event = await this.eventRepository.findOne({
        where: { id },
        relations: ['participants'],
      });

      if (!event) {
        throw new NotFoundException(`Event with id ${id} not found`);
      }

      return event;
    } catch (error) {
      throw error;
    }
  }
}
