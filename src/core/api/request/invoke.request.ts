import { TypeRequest } from './type.request';

export interface InvokeRequest<T> {
    reqType: TypeRequest;
    fetch(param?: any): Promise<T>;
}