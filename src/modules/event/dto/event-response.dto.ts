import { ApiProperty } from "@nestjs/swagger";

import { ParticipantResponseDto } from "./participant-response.dto";
import { EventCreateDto } from "./event-create.dto";

export class EventResponseDto extends EventCreateDto {
  @ApiProperty({ description: 'Event id', example: 'uuid' })
  id: string;

  @ApiProperty({
    description: 'Participants',
    type: [ParticipantResponseDto],
    example: [
      { id: "uuid", fullName: "John Smith", email: "johnsmith@mail.com", comeFrom: "friends", createdAt: '2024-09-26T18:52:37.408Z', updatedAt: '2024-09-26T18:52:37.408Z' }
    ],
  })
  participants: ParticipantResponseDto[];

  @ApiProperty({ description: 'Event created time', example: '2024-09-26T18:52:37.408Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Event updated time', example: '2024-09-26T18:52:37.408Z' })
  updatedAt: Date;
}