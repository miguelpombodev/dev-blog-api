import { Article } from "@schemas/article.schema";
import { Tag } from "@schemas/tag.schema";

export class GetArticlesAndTagsInformations {
  private constructor(title: string, count: number) {
    this.title = title;
    this.count = count;
  }

  private title: string;
  private count: number;

  public static create(
    title: string,
    count: number,
  ): GetArticlesAndTagsInformations {
    return new GetArticlesAndTagsInformations(title, count);
  }
}
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
    getArticlesAndTagsInformations: GetArticlesAndTagsInformations[],
  ) {
    this.count = count;
    this.articles = articles;
    this.articlesCategoriesCount = categoriesCount;
    this.getArticlesAndTagsInformations = getArticlesAndTagsInformations;
  }

  private count: number;
  private articles: Article[];
  private articlesCategoriesCount: GetCategoriesCount[];
  private getArticlesAndTagsInformations: GetArticlesAndTagsInformations[];

  static create(
    count: number,
    articles: Article[],
    categoriesCount: GetCategoriesCount[],
    getArticlesAndTagsInformations: GetArticlesAndTagsInformations[],
  ): GetAllArticlesAdmin {
    return new GetAllArticlesAdmin(
      count,
      articles,
      categoriesCount,
      getArticlesAndTagsInformations,
    );
  }
}
