import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  private readonly _logger = new Logger(ErrorMiddleware.name, {
    timestamp: true,
  });

  private readonly _errorStatusCodes = [400, 401, 404, 403, 405, 409];

  use(request: Request, response: Response, next: NextFunction) {
    response.on("finish", () => {
      if (this._errorStatusCodes.includes(response.statusCode)) {
        this._logger.error(
          `[ERROR][${request.method}] ${request.originalUrl} - Error Status Code: ${response.statusCode}`,
        );
      }
    });
    next();
  }
}
