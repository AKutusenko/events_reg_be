import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class EventCreateDto {
  @ApiProperty({ description: 'Event title', example: 'Tomorrowland 2024' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Event description', example: 'Tomorrowland Belgium takes place at the recreation area De Schorre in Boom' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Event Date', example: '2024-09-26T18:52:37.408Z' })
  @IsNotEmpty()
  @IsString()
  eventDate: string;

  @ApiProperty({ description: 'Event description', example: 'Joe Black' })
  @IsNotEmpty()
  @IsString()
  organizer: string;
}