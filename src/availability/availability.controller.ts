import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AvailabilityService } from './availability.service';
import { XMLParser, } from 'fast-xml-parser';


const xmlParser = new XMLParser({
  ignoreAttributes: false, // This will include attributes in the parsed object with a prefix
  parseAttributeValue: true, // This will parse the attribute values and convert them to their respective data types
});


@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post('update')
  async updateHotelAvailability(@Req() req: Request, @Res() res: Response) {
    let xmlData = '';

    req.setEncoding('utf8');
    req.on('data', chunk => {
      xmlData += chunk;
    });

    req.on('end', async () => {
      try {
        // Parse the XML data to JSON
        const jsonObj = xmlParser.parse(xmlData);

        // Start a transaction
        const queryRunner = this.availabilityService.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
          // Process each availability message
          for (const availStatusMessageData of jsonObj.OTA_HotelAvailNotifRQ.AvailStatusMessages.AvailStatusMessage) {
            await this.availabilityService.handleAvailabilityUpdate(queryRunner, availStatusMessageData);
          }

          // Commit the transaction after all messages are processed
          await queryRunner.commitTransaction();
        } catch (error) {
          // If there's an error, rollback the transaction
          await queryRunner.rollbackTransaction();
          throw error; // Re-throw the error for the catch block below to handle
        } finally {
          // Release the query runner in any case
          await queryRunner.release();
        }

        // Generate the success response after all updates
        const responseXml = this.availabilityService.createOTAHotelAvailNotifRS();
        res.type('application/xml').send(responseXml);
      } catch (error) {
        // Log the error and send a server error response
        console.error('Error processing the XML request:', error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('An error occurred while processing the request');
      }
    });
  }
}
