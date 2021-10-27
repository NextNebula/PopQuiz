import { Category } from "../models/enums/category";

export class GetNewQuestion {
  static readonly type = '[Player] GetQuestion';
}

export class SetQuestionAnswered {
  static readonly type = '[Player] SetQuestionAnswered';
}

export class SetCategory {
  static readonly type = '[Player] SetCategory';
  constructor(public category: Category) {}
}
