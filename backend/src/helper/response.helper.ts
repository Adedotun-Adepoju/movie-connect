export interface ResponseInterface {
  status: string;
  message: string;
  data?: any;
  status_code: number
}

export class ResponseHelper {
  static successResponse = (message: string, statusCode: number, data?: any): ResponseInterface => {
    return {
      status_code: statusCode,
      status: "success",
      message,
      data,
    };
  };

  static errorResponse = (message: string, statusCode: number, data?: any): ResponseInterface => {
    return {
      status_code: statusCode,
      status: "error",
      message,
      data,
    };
  };
}
