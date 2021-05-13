import { environment } from "../../../environments/index";
import { InvokeRequest } from "./invoke.request";
import { Headers } from 'node-fetch';
import fetch from 'node-fetch';

export class ImagesRequest<T> implements InvokeRequest<T> {
  public imagesUrl: string;
  public header: Headers;

  constructor() {
      this.header = new Headers();
      this.header.append("X-Figma-Token", environment.token);
      this.imagesUrl = `${environment.url}/${environment.versionImage}/${environment.fileKey}`;
  }

  public fetch(guids: string): Promise<T> {
    const param: string = `?ids=${guids}&format=svg`;

    return fetch(this.imagesUrl + param, { headers: this.header })
        .then((response) => {
            if (!response.ok) {
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
