export interface InvokeRequest<T> {
    fetch(param?: any): Promise<T>;
}