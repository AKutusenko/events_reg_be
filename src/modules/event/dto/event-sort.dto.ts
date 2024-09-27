import { ApiProperty } from "@nestjs/swagger";
import { EventSortBy } from "../enums/event-sort-by.enum";
import { EventSortOrder } from "../enums/event-sort-order.enum";

export class EventSortDto {
  @ApiProperty({ description: 'Sort by field', enum: EventSortBy })
  sortBy?: EventSortBy;

  @ApiProperty({ description: 'Sort order', enum: EventSortOrder })
  order?: EventSortOrder;
}