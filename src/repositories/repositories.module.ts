import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forRoot(process.env.APP_ATLAS_MONGODB_URL!)],
})
export class RepositoriesModule {}
