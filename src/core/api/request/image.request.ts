import { InvokeRequest } from "./invoke.request";

export class ImageRequest<T> implements InvokeRequest<T> {
    public fetch(url: string): Promise<T> {
        
        return fetch(url)
            .then((response: Response) => {
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
