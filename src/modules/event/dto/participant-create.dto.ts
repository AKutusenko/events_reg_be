import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

import { ComeFrom } from "../enums";


export class ParticipantCreateDto {
  @ApiProperty({ description: 'Participant full name', example: 'John Smith' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Participant email', example: 'johnsmith@mail.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Participant birthDate', example: '2024-09-26T18:52:37.408Z' })
  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @ApiProperty({
    description: 'Participant come from',
    enum: ComeFrom,
  })
  @IsNotEmpty()
  @IsEnum(ComeFrom)
  comeFrom: ComeFrom;

  @ApiProperty({ description: 'Event ID', example: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  eventId: string;
}