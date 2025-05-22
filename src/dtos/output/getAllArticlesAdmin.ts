import { Article } from "@schemas/article.schema";

export class GetCategoriesCount {
  private constructor(tag: string, count: number) {
    this.tag = tag;
    this.count = count;
  }

  private tag: string;
  private count: number;

  public getTagName() {
    return this.tag;
  }

  public setIncrementTag() {
    this.count += 1;
  }

  public static create(tag: string, count: number): GetCategoriesCount {
    return new GetCategoriesCount(tag, count);
  }
}

export class GetAllArticlesAdmin {
  private constructor(
    count: number,
    articles: Article[],
    categoriesCount: GetCategoriesCount[],
  ) {
    this.count = count;
    this.articles = articles;
    this.articlesCategoriesCount = categoriesCount;
  }

  private count: number;
  private articles: Article[];
  private articlesCategoriesCount: GetCategoriesCount[];

  static create(
    count: number,
    articles: Article[],
    categoriesCount: GetCategoriesCount[],
  ): GetAllArticlesAdmin {
    return new GetAllArticlesAdmin(count, articles, categoriesCount);
  }
}
