import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from "@nestjs/terminus";
import { env } from "src/env.config";

@Controller("health")
export class HealthController {
  constructor(
    private healthService: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  returnAlive() {
    return "Dev Blog API is up!";
  }

  @Get("check")
  @HealthCheck()
  check() {
    return this.healthService.check([
      () => this.http.pingCheck("dev_blog_api", env.APP_URL),
    ]);
  }
}
