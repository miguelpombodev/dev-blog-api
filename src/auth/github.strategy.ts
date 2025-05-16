import { IProfile } from "@abstractions/auth/user.interface";
import { ErrorMiddleware } from "@middlewares/error.middleware";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { env } from "src/env.config";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  private readonly _logger = new Logger(ErrorMiddleware.name, {
    timestamp: true,
  });

  constructor() {
    super({
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    });
  }

  validate(accessToken: string, _refreshToken: string, profile: IProfile) {
    const email = profile.emails[0]["value"] as string;

    if (email !== env.GITHUB_EMAIL) {
      this._logger.fatal(
        "[FATAL] A Forbidden profile try to login into system",
      );

      throw new HttpException(
        "[ERROR] Forbidden profile!",
        HttpStatus.FORBIDDEN,
      );
    }

    return {
      accessToken,
      profile,
    };
  }
}
