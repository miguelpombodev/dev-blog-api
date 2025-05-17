import { IUserRequest } from "@abstractions/auth/user.interface";
import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { authConfig } from "src/auth/auth.config";
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
      sameSite: true,
      httpOnly: true,
      maxAge: 6000,
      expires: new Date(now.getTime() + 1000 * 36000),
    });

    return true;
  }
}
