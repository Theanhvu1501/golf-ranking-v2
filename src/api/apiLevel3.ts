import { ApiBase } from "./api";

class ApiLv3 extends ApiBase {
  constructor() {
    super({ endpoint: "lv3" });
  }
}

export const apiLv3 = new ApiLv3();
