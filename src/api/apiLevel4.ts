import { ApiBase } from "./api";

class ApiLv4 extends ApiBase {
  constructor() {
    super({ endpoint: "lv4" });
  }
}

export const apiLv4 = new ApiLv4();
