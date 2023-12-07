import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RoomTypeDTO } from './room-type.dto';
import { RatePlanDTO } from './rate-plan.dto';
import { GuestCountDTO } from './guest-count.dto';
import { CommentDTO } from './comment.dto';

export class RoomStayDTO {
  @IsNumber()
  indexNumber: number;

  @ValidateNested({ each: true })
  @Type(() => RoomTypeDTO)
  @IsArray()
  roomTypes: RoomTypeDTO[];

  @ValidateNested({ each: true })
  @Type(() => RatePlanDTO)
  @IsArray()
  ratePlans: RatePlanDTO[];

  @ValidateNested({ each: true })
  @Type(() => GuestCountDTO)
  @IsArray()
  guestCounts: GuestCountDTO[];

  @ValidateNested({ each: true })
  @Type(() => CommentDTO)
  @IsArray()
  comments: CommentDTO[];
}
