export interface ApiReturnValueStruct<T> {
    success: boolean,
    code: number | string,
    message: string,
    codetype?: string,
    data?: T
}


