import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XMLBuilder } from 'fast-xml-parser';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class RoomInformationService {
  private readonly builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    suppressEmptyNode: true,
  });

  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  // Method to convert a JSON object to XML
  public convertToXML(jsonObj: any): string {
    try {
      const xmlData = this.builder.build(jsonObj);
      return xmlData;
    } catch (error) {
      // Handle XML conversion errors
      throw new InternalServerErrorException('Failed to convert JSON to XML');
    }
  }

  // Method to retrieve room information from the database
  public async getRoomInformation(hotelCode: string): Promise<string> {
    if (!hotelCode) {
      throw new InternalServerErrorException('Hotel code is required');
    }

    try {
      const hotel = await this.hotelRepository.findOne({
        where: { code: hotelCode },
        relations: ['roomTypes', 'roomTypes.ratePlans'],
      });
      

      if (!hotel) {
        throw new InternalServerErrorException('Hotel not found');
      }

      // Construct the JSON structure for the response using actual database data
      const roomInfoJson = this.createRoomListJson(hotel);

      // Convert the JSON structure to XML and return it
      return this.convertToXML(roomInfoJson);
    } catch (error) {
      // Log error and throw exception to be handled by Nest's global error filters
      console.error('Database operation failed', error);
      throw new InternalServerErrorException('Could not retrieve room information.');
    }
  }

  // Helper method to structure the JSON for room information based on the actual hotel data
  private createRoomListJson(hotel: Hotel): any {
    // Validation: Ensure that the hotel has room types and rate plans
    if (!hotel.roomTypes || hotel.roomTypes.length === 0) {
      throw new InternalServerErrorException('No room types found for the hotel');
    }

    return {
      OTA_HotelRoomListRS: {
        "@_Version": "2.0",
        "@_xmlns": "http://www.opentravel.org/OTA/2003/05",
        Success: {},
        HotelRoomLists: {
          HotelRoomList: {
            "@_HotelCode": hotel.code,
            RoomStays: hotel.roomTypes.map(roomType => {
              if (!roomType.ratePlans || roomType.ratePlans.length === 0) {
                throw new InternalServerErrorException(`No rate plans found for room type ${roomType.name}`);
              }
              
              return {
                RoomTypes: {
                  RoomType: {
                    "@_IsRoom": "true",
                    "@_RoomID": roomType.id.toString(),
                    RoomDescription: {
                      "@_Name": roomType.name,
                    },
                  },
                },
                RatePlans: {
                  RatePlan: roomType.ratePlans.map(ratePlan => ({
                    "@_RatePlanID": ratePlan.id.toString(),
                    "@_RatePlanName": ratePlan.name,
                  })),
                },
              };
            }),
          },
        },
      },
    };
  }
}
