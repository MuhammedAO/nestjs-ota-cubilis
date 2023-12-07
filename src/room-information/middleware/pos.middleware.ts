import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class PosMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const xmlBody = req.body;

    if (xmlBody && xmlBody.POS) {
      const requestorID = xmlBody.POS.Source?.find(source => source.RequestorID['@_Type'] === "1")?.RequestorID;

      if (
        requestorID &&
        requestorID['@_ID'] === 'technical@desvu.com' &&
        requestorID['@_MessagePassword'] === 'U88m58W36'
      ) {
        next();
      } else {
        throw new UnauthorizedException('Invalid POS credentials.');
      }
    } else {
      throw new UnauthorizedException('Invalid or missing XML POS data.');
    }
  }
}

