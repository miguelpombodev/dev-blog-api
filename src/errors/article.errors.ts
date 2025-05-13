import { Error } from "src/abstractions/result";

export default class ArticleErrors {
  public static articleNotFound: Error = new Error(
    "Article.NotFound",
    404,
    "The article was not found! Please be sure!",
  );
}
