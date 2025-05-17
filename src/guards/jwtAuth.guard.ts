import { CanActivate, ExecutionContext, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { authConfig } from "src/auth/auth.config";

export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  private readonly _logger = new Logger(JwtAuthGuard.name, {
    timestamp: true,
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies["loginCredentials"] as string;

    if (token) return false;

    try {
      const payload: { username: string } = await this.jwtService.verifyAsync(
        token,
        authConfig,
      );

      request.user = payload;

      return true;
    } catch (error) {
      this._logger.error(`[ERROR] Invalid token: ${error.message}`);
      return false;
    }
  }
}
