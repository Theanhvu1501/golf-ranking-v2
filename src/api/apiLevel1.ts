import { ApiBase } from "./api";

class ApiLv1 extends ApiBase {
  constructor() {
    super({ endpoint: "lv1" });
  }
}

export const apiLv1 = new ApiLv1();
