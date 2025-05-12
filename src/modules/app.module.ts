import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ControllersModule } from "src/controllers/controllers.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.APP_ATLAS_MONGODB_URL!),
    ControllersModule,
  ],
})
export class AppModule {}
