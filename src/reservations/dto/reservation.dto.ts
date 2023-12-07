import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsString, ValidateNested } from 'class-validator';

import { CommentDTO } from './comment.dto';
import { RoomStayDTO } from './room-stay.dto';
import { ProfileInfoDTO } from './profile-info.dto';


export class ReservationDTO {
  @IsString()
  creatorID: string;

  @IsEnum(['New', 'Modified', 'Cancelled'])
  resStatus: string;

  @IsDate()
  createDateTime: Date;

  @ValidateNested({ each: true })
  @Type(() => RoomStayDTO)
  @IsArray()
  roomStays: RoomStayDTO[];

  @ValidateNested({ each: true })
  @Type(() => CommentDTO)
  @IsArray()
  comments: CommentDTO[];

  @ValidateNested()
  @Type(() => ProfileInfoDTO)
  profileInfos: ProfileInfoDTO;
}
