import { Observable, from } from "rxjs";
import { InvokeRequest } from './request/invoke.request';

export class RestApiService {

  public get<T>(InvokeRequestType: { new(): InvokeRequest<T> ;}, param?: any): Observable<T> {
    const type = new InvokeRequestType();
    const promise: Promise<T> = type.fetch(param);
    return from(promise);
  }
}
