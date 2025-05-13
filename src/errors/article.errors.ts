import { Error } from "@abstractions/result";

export default class ArticleErrors {
  public static articleNotFound: Error = new Error(
    "Article.NotFound",
    404,
    "The article was not found! Please be sure!",
  );

  public static articleAlreadyRegistered: Error = new Error(
    "Article.AlreadyRegistered",
    409,
    "The article is already registered! Please check the article informations",
  );
}
