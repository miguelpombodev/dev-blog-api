import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ControllersModule } from "src/controllers/controllers.module";
import { env } from "src/env.config";

@Module({
  imports: [
    MongooseModule.forRoot(env.APP_ATLAS_MONGODB_URL),
    ControllersModule,
  ],
})
export class AppModule {}
