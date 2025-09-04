export interface User {
  id: number;
  name: string;
  email: string;
}

export interface StandardResponse<T = any> {
  statusCode: number;
  statusMessage: string;
  body: T;
}

export interface ErrorResponse {
  statusCode: number;
  statusMessage: string;
  body: {
    error: string;
    message?: string;
    timestamp?: string;
    endpoint?: string;
    method?: string;
  };
}
