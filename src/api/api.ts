import queryString from "query-string";

export type ServiceOptions = {
  endpoint: string;
};

export abstract class ApiBase {
  private baseUrl = import.meta.env.VITE_URL_BASE;
  private url: string;

  constructor(options: ServiceOptions) {
    this.url = `${this.baseUrl}?level=${options.endpoint}`;
  }

  async get(params: any) {
    const paramsReal = queryString.stringify(params);
    const url = `${this.url}&${paramsReal}`;
    const result = await fetch(url);
    return await result.json();
  }
}
