import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller, Get, Post, Body, ValidationPipe, UsePipes,
  Param,
  Query,
} from '@nestjs/common';

import { EventService } from './event.service';
import { EventCreateDto } from './dto/event-create.dto';
import { ParticipantResponseDto } from './dto/participant-response.dto';
import { ParticipantCreateDto } from './dto/participant-create.dto';
import { EventResponseDto } from './dto/event-response.dto';
import { PaginatedEventsResponseDto } from './dto/event-response-paginated.dto';
import { EventSortBy, EventSortOrder } from './enums';

@ApiTags('Event')
@Controller('/event')
export class EventController {
  constructor(private readonly eventService: EventService) { }


  @ApiOperation({ summary: 'Creating a new event' })
  @ApiCreatedResponse({
    description: 'The event has been successfully created.',
    type: EventResponseDto
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  @UsePipes(new ValidationPipe())
  async createEvent(@Body() eventCreateDto: EventCreateDto): Promise<EventResponseDto> {
    return await this.eventService.createEvent(eventCreateDto);
  }

  @ApiOperation({ summary: 'Creating a new participant' })
  @ApiCreatedResponse({
    description: 'The event has been successfully created.',
    type: ParticipantResponseDto
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post('/participant')
  @UsePipes(new ValidationPipe())
  async createParticipant(@Body() participantCreateDto: ParticipantCreateDto): Promise<ParticipantResponseDto> {
    return await this.eventService.createParticipant(participantCreateDto);
  }

  @ApiOperation({ summary: 'Get list of events' })
  @ApiCreatedResponse({
    description: 'Events founded',
    type: EventResponseDto
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get()
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: EventSortBy = EventSortBy.TITLE,
    @Query('order') order: EventSortOrder = EventSortOrder.ASC,
  ): Promise<PaginatedEventsResponseDto> {
    return await this.eventService.findAll(page, limit, sortBy, order);
  }

  @ApiOperation({ summary: 'Get event by ID' })
  @ApiCreatedResponse({
    description: 'Event found',
    type: EventResponseDto
  })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EventResponseDto> {
    return await this.eventService.findEventById(id);
  }
}
