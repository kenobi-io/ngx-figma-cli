import { environment } from "../../../environments/index";
import { InvokeRequest } from "./invoke.request";
import { Headers, Response } from "node-fetch";
import fetch from "node-fetch";

export class FilesRequest<T> implements InvokeRequest<T> {
  public filesUrl: string;
  public header: Headers;

  constructor() {
    this.header = new Headers();
    this.header.append("X-Figma-Token", environment.token);
    this.filesUrl = `${environment.url}/${environment.versionFile}/${environment.fileKey}`;
  }

  public fetch(_param?: any): Promise<T> {
    return fetch(this.filesUrl, { headers: this.header })
      .then((response: Response) => {
        if (!response.ok) {
          console.log("err status", response.status);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error: Error) => {
        console.error(error);
        throw error;
      });
  }
}
