import { ApiProperty } from "@nestjs/swagger";

import { ParticipantCreateDto } from "./participant-create.dto";

export class ParticipantResponseDto extends ParticipantCreateDto {
  @ApiProperty({ description: 'Participant id', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Participant created time', example: '2024-09-26T18:52:37.408Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Participant updated time', example: '2024-09-26T18:52:37.408Z' })
  updatedAt: Date;
}