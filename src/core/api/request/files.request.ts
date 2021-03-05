import { environment } from "../../../environments/index";
import { InvokeRequest } from "./invoke.request";
import { TypeRequest } from './type.request';
import { Headers } from 'node-fetch';
import fetch from 'node-fetch';

export class FilesRequest<T> implements InvokeRequest<T> {

    public filesUrl: string;
    public header: Headers;
    public reqType: TypeRequest;

    constructor() {
        this.reqType = TypeRequest.files;
        this.header = new Headers();
        this.header.append('X-Figma-Token', environment.token);
        this.filesUrl = `${environment.url}/${environment.versionFile}/${environment.fileKey}`;
    }

    public fetch(_param?: any): Promise<T> {
        
        return fetch(this.filesUrl, { headers: this.header })
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
