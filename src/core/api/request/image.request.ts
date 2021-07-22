import { InvokeRequest } from "./invoke.request";
import { Response } from "node-fetch";
import fetch from "node-fetch";

export class ImageRequest implements InvokeRequest<Response> {
  public fetch(url: string): Promise<Response> {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          console.log("err status", response.status);
          console.log("err status", response);
          throw new Error(response.statusText);
        }
        return response;
      })
      .catch((error: Error) => {
        console.error(error);
        throw error;
      });
  }
}
