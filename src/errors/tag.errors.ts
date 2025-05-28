import { Error } from "@abstractions/result";

export default class TagErrors {
  public static tagNotFound: Error = new Error(
    "Tag.NotFound",
    404,
    "The tag was not found! Please be sure!",
  );

  public static tagAlreadyRegistered: Error = new Error(
    "Tag.AlreadyRegistered",
    409,
    "The tag is already registered! Please check the tag informations",
  );
}
