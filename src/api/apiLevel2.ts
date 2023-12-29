import { ApiBase } from "./api";

class ApiLv2 extends ApiBase {
  constructor() {
    super({ endpoint: "lv2" });
  }
}

export const apiLv2 = new ApiLv2();
