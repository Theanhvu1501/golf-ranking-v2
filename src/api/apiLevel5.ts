import { ApiBase } from "./api";

class ApiLv5 extends ApiBase {
  constructor() {
    super({ endpoint: "lv5" });
  }
}

export const apiLv5 = new ApiLv5();
