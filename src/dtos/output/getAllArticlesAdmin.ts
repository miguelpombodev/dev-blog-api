import { Article } from "@schemas/article.schema";
import { Types } from "mongoose";

export class GetCategoriesCount {
  private constructor(tagId: Types.ObjectId, count: number) {
    this.tagId = tagId;
    this.count = count;
  }

  private tagId: Types.ObjectId;
  private count: number;

  public getTagIdName() {
    return this.tagId;
  }

  public setIncrementTag() {
    this.count += 1;
  }

  public static create(
    tagId: Types.ObjectId,
    count: number,
  ): GetCategoriesCount {
    return new GetCategoriesCount(tagId, count);
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
