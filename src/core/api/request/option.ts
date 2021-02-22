export class Option {
    headers?: {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}