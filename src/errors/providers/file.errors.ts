import { Error } from "@abstractions/result";

export default class FileProviderErrors {
  public static fileNotUploaded: Error = new Error(
    "FileProvider.FileNotUploaded",
    400,
    "S3 Object could not be uploaded! Please check logs!",
  );

  public static articleAlreadyRegistered: Error = new Error(
    "Article.AlreadyRegistered",
    409,
    "The article is already registered! Please check the article informations",
  );
}
