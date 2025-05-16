import { IUserRequest } from "@abstractions/auth/user.interface";
import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { env } from "src/env.config";
@Controller({
  path: "/auth",
})
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}
  private readonly jwtOptions: JwtSignOptions = {
    secret: env.AUTH_SECRET,
  };

  @Get("github")
  @UseGuards(AuthGuard("github"))
  async githubLogin() {}

  @Get("github/callback")
  @UseGuards(AuthGuard("github"))
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

    const token = await this.jwtService.signAsync(
      tokenPayload,
      this.jwtOptions,
    );

    const now = new Date();

    response.cookie("loginCredentials", token, {
      sameSite: true,
      httpOnly: true,
      maxAge: 6000,
      expires: new Date(now.getTime() + 1000 * 36000),
    });

    return response.send();
  }
}
