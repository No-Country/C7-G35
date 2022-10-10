import { Response } from 'express';

export function domainErrorHandler(res: Response, error: Error, errorsHandlerMap: { [key: string]: Function }) {
  const handlerResponseError = errorsHandlerMap[error.constructor.name];

  if (!handlerResponseError) throw error;

  handlerResponseError(error, res);
}
