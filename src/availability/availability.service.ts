// src/availability/availability.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, Connection, DataSource } from 'typeorm';
import { AvailabilityStatus } from './entities/availability-status.entity';
import { LengthOfStay } from './entities/length-of-stay.entity';
import { BestAvailableRate } from './entities/best-available-rate.entity';
import { RoomType } from './entities/room-type.entity';
import { RatePlan } from './entities/rate-plan.entity';

@Injectable()
export class AvailabilityService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(AvailabilityStatus)
        private availabilityStatusRepository: Repository<AvailabilityStatus>,
        @InjectRepository(LengthOfStay)
        private lengthOfStayRepository: Repository<LengthOfStay>,
        @InjectRepository(BestAvailableRate)
        private bestAvailableRateRepository: Repository<BestAvailableRate>,
        // Assume repositories for RoomType and RatePlan are already injected
        @InjectRepository(RoomType)
        private roomTypeRepository: Repository<RoomType>,
        @InjectRepository(RatePlan)
        private ratePlanRepository: Repository<RatePlan>,
    ) {}

    

    public async handleAvailabilityUpdate(queryRunner: QueryRunner, availStatusMessageData: any): Promise<void> {
        // Extract the relevant data
        
        const { InvCode, RatePlanID, BookingLimit, Start, End, LengthsOfStay, BestAvailableRates } = availStatusMessageData;
        const startDate = new Date(Start);
        const endDate = new Date(End);

        // Here, we would find the associated RoomType and RatePlan entities
        const roomType = await queryRunner.manager.findOne(RoomType, { where: { invCode: InvCode } });
        const ratePlan = await queryRunner.manager.findOne(RatePlan, { where: { id: RatePlanID } });

        // If roomType or ratePlan doesn't exist, we might create new ones or skip/update according to business logic.
        // For now, i am assuming they exist.

        // Create or update AvailabilityStatus
        let availabilityStatus = await queryRunner.manager.findOne(AvailabilityStatus, {
            where: { roomType, ratePlan, startDate: startDate },
        });

        if (!availabilityStatus) {
            availabilityStatus = new AvailabilityStatus();
            availabilityStatus.roomType = roomType;
            availabilityStatus.ratePlan = ratePlan;
            availabilityStatus.startDate = startDate;
            availabilityStatus.endDate = endDate;
        }

        // Update availabilityStatus properties
        //we can update as much properties as we like but i'll keep it short.
        availabilityStatus.bookingLimit = BookingLimit;

        // Save the updated availability status
        await queryRunner.manager.save(availabilityStatus);

        // Handle LengthsOfStay updates
        // Assuming LengthsOfStay could be multiple records or need to be updated in bulk.
        // We would likely need to delete all existing and insert new ones, or update existing ones individually.
        for (const lengthDTO of LengthsOfStay) {
            let lengthOfStay = new LengthOfStay();
            lengthOfStay.time = lengthDTO.Time;
            lengthOfStay.minMaxMessageType = lengthDTO.MinMaxMessageType;
            lengthOfStay.availStatusMessage = availabilityStatus;
            await queryRunner.manager.save(lengthOfStay);
        }

        // Handle BestAvailableRates updates
        // Similar logic to LengthsOfStay; either bulk update or individual record handling.
        for (const barDTO of BestAvailableRates) {
            let bestAvailableRate = new BestAvailableRate();
            bestAvailableRate.amount = barDTO.Amount;
            bestAvailableRate.ratePlanCode = barDTO.RatePlanCode; // May link to a RatePlan entity or be a simple field
            bestAvailableRate.availStatusMessage = availabilityStatus; 
            await queryRunner.manager.save(bestAvailableRate);
        }
    }

    public async updateAndRespondToAvailability(availabilityData: any): Promise<string> {
        const queryRunner = this.availabilityStatusRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Process each availability message
            for (const availStatusMessage of availabilityData.AvailStatusMessages) {
                await this.handleAvailabilityUpdate(queryRunner, availStatusMessage);
            }
            // Commit the transaction if all updates are successful
            await queryRunner.commitTransaction();
        } catch (error) {
            // Rollback the transaction in case of an error
            await queryRunner.rollbackTransaction();
            throw error; // Re-throw the error after rollback to handle it in the calling function
        } finally {
            // Release query runner
            await queryRunner.release();
        }
        // Return the XML success response after transaction completion
        return this.createOTAHotelAvailNotifRS();
    }

    public createOTAHotelAvailNotifRS(): string {
        // Create and return the OTA_HotelAvailNotifRS XML response string(gotten from the doc)
        const responseXML = `
        <?xml version="1.0" encoding="UTF-8"?>
        <OTA_HotelAvailNotifRS xmlns="http://www.opentravel.org/OTA/2003/05" TimeStamp="${new Date().toISOString()}" Target="Production" Version="2.0">
          <Success />
        </OTA_HotelAvailNotifRS>`;
        return responseXML;
    }

    public createQueryRunner(): QueryRunner {
        return this.dataSource.createQueryRunner();
      }
}
