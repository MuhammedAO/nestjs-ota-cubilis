import {
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { RoomInformationService } from './room-information.service';
import { Request, Response } from 'express';
import { XMLParser } from 'fast-xml-parser';

const xmlParser = new XMLParser({
  ignoreAttributes: false, // This will include attributes in the parsed object with a prefix
  parseAttributeValue: true, // This will parse the attribute values and convert them to their respective data types
});

@Controller('room-information')
export class RoomInformationController {
  constructor(
    private readonly roomInformationService: RoomInformationService,
  ) {}

  @Post()
  async getRoomInformation(@Req() req: Request, @Res() res: Response) {
    let xmlData = '';

    req.on('data', (chunk) => {
      xmlData += chunk;
    });

    req.on('end', async () => {
      try {
        const jsonObj = xmlParser.parse(xmlData);

        const hotelCode = this.extractHotelCode(jsonObj);
        if (!hotelCode) {
          throw new InternalServerErrorException(
            'Hotel code is missing in the request',
          );
        }

        const roomInformation =
          await this.roomInformationService.getRoomInformation(hotelCode);
        res.type('application/xml').send(roomInformation);
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
      }
    });
  }

  private extractHotelCode(jsonObj: any): string | null {
    // Extract the HotelCode from the parsed XML JSON object
    const hotelRoomList =
      jsonObj?.OTA_HotelRoomListRQ?.HotelRoomLists?.HotelRoomList;
    return hotelRoomList?.['@_HotelCode'] || null; // Return null if hotel code is not found
  }
}
