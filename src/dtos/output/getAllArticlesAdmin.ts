import { Article } from "@schemas/article.schema";
import { Tag } from "@schemas/tag.schema";

export class GetCategoriesCount {
  private constructor(name: string, color: string, count: number) {
    this.name = name;
    this.fill = color;
    this.count = count;
  }

  private name: string;
  private fill: string;
  private count: number;

  public getTagName() {
    return this.name;
  }

  public setIncrementTag() {
    this.count += 1;
  }

  public static create(tag: Tag, count: number): GetCategoriesCount {
    return new GetCategoriesCount(tag.name, tag.color, count);
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
