/** バックエンドREST APIレスポンスのデシリアライザ */
export type Deserializer<T> = (rawBody: string) => T;
