import { InvokeRequest } from "./invoke.request";
// import { Headers } from 'node-fetch';
import fetch from 'node-fetch';

export class ImageRequest<T> implements InvokeRequest<T> {
    // public header: Headers;

    // constructor() {
    //     this.header = new Headers();
    //     this.header.append('X-Figma-Token', environment.token);
    // }
    public fetch(url: string): Promise<T> {
        
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch((error: Error) => {
                console.error(error);
                throw error ;
            });
    }
}
