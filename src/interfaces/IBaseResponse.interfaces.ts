import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export interface IBaseResponse<T> {
    message: string;
    data?: T;
    path?: string;
    error?: string;
    timestamp?: any;
    statusCode?: StatusCodes;
    reasonStatusCode?: ReasonPhrases;
}