import { Injectable, Scope, Logger } from "@nestjs/common";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { env } from "src/env.config";

@Injectable({ scope: Scope.REQUEST })
export default class FileProvider {
  constructor() {
    this.s3Object = new S3Client({
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY,
        secretAccessKey: env.AWS_SECRET_KEY,
      },
    });
  }
  private readonly _logger = new Logger(FileProvider.name, {
    timestamp: true,
  });

  private s3Object: S3Client;

  private _extractExtension(file: Express.Multer.File): string {
    return file.mimetype.split("/")[1];
  }

  private _buildFileName(file: Express.Multer.File): string {
    const fileExtension = this._extractExtension(file);
    return `article_${Date.now()}.${fileExtension}`;
  }

  public async uploadToS3(
    file: Express.Multer.File,
  ): Promise<{ url: string; key: string }> {
    const newFileName = this._buildFileName(file);

    const params: PutObjectCommandInput = {
      Bucket: env.AWS_BUCKET,
      Key: newFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3Object.send(new PutObjectCommand(params));

    const url = `https://${env.AWS_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${newFileName}`;

    this._logger.log(
      `S3 Object has been successfully uploaded! Object URL: ${url}`,
    );

    return {
      url,
      key: newFileName,
    };
  }
}
