export interface ResultRequest<T> {
    [x: string]: (param: any) => Promise<T>
}