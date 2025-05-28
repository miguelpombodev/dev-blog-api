import { IUserRequest } from "@abstractions/auth/user.interface";
import { Controller, Get, Redirect, Req, Res, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { authConfig } from "src/auth/auth.config";
import { env } from "src/env.config";

@Controller({
  path: "/auth",
})
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Get("github")
  @UseGuards(AuthGuard("github"))
  async githubLogin() {}

  @Get("github/callback")
  @UseGuards(AuthGuard("github"))
  @Redirect(`${env.APP_SITE_URL}/articles/manage`)
  async githubCallback(
    @Req() request: IUserRequest,
    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    const user = request.user;

    const tokenPayload: { username: string } = {
      username: user.profile.username,
    };

    const token = await this.jwtService.signAsync(tokenPayload, authConfig);

    const now = new Date();

    response.cookie("loginCredentials", token, {
      sameSite: "lax",
      httpOnly: true,
      domain: env.APP_MY_DOMAIN,
      secure: env.NODE_ENV === "development" ? false : true,
      maxAge: 3600 * 1000,
      path: "/",
      expires: new Date(now.getTime() + 1000 * 36000),
    });
  }
}
