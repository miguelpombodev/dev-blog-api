import { Injectable, Scope, Logger } from "@nestjs/common";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";
import { env } from "src/env.config";
import { Result } from "@abstractions/result";
import FileProviderErrors from "@errors/providers/file.errors";

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
  ): Promise<Result<{ url: string; key: string }>> {
    const newFileName = this._buildFileName(file);

    const params: PutObjectCommandInput = {
      Bucket: env.AWS_BUCKET,
      Key: newFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await this.s3Object.send(new PutObjectCommand(params));

    if (result.$metadata.httpStatusCode !== 200) {
      this._logger.error(
        `S3 Object could not be uploaded! Please check logs! Object fileName: ${newFileName}`,
      );
      return Result.failure<{ url: string; key: string }>(
        FileProviderErrors.fileNotUploaded,
      );
    }

    const url = `https://${env.AWS_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${newFileName}`;

    this._logger.log(
      `S3 Object has been successfully uploaded! Object URL: ${url}`,
    );
    return Result.success<{ url: string; key: string }>({
      url,
      key: newFileName,
    });
  }

  public async DeleteFromS3(fileName: string) {
    const params: DeleteObjectCommandInput = {
      Bucket: env.AWS_BUCKET,
      Key: fileName,
    };

    const result = await this.s3Object.send(new DeleteObjectCommand(params));
    this._logger.log(
      `S3 Operation Status Code: ${result.$metadata.httpStatusCode}`,
    );

    if (result.$metadata.httpStatusCode !== 200) {
      this._logger.error(
        `S3 Object could not be deleted! Please check logs! Object fileName: ${fileName}`,
      );
    }

    this._logger.log(
      `S3 Object has been successfully deleted! Deleted object fileName: ${fileName}`,
    );
  }
}
