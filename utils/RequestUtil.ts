import axios, { AxiosError } from 'axios';

export interface ResponseType<T = object> {
  message: string;
  resource?: T;
  error?: string;
}

export type ReturnType<T> = Promise<T | undefined>;

export class RequestUtil {
  private backendUrl = "http://localhost:5000";

  private treatError = (error: AxiosError) => {
    if (error.response) {
      const { data } = error.response;

      if (data && typeof data === 'object' && 'message' in data) {
        const unknownError = 'Unknown error on server';

        const errorMessage = (data as ResponseType).message || unknownError;
        const consoleError = (data as ResponseType).error;

        if (consoleError) {
          throw new Error(consoleError);
        }

        throw new Error(errorMessage);
      } else {
        throw new Error(error.message);
      }
    } else if (error.request) {
      throw new Error('No response recived');
    } else {
      throw new Error(error.message);
    }
  };

  get = async <T>(endpoint: string): ReturnType<T> => {
    const url = `${this.backendUrl}/${endpoint}`;

    try {
      const response = await axios.get(url, { withCredentials: true });
      return await response.data;
    } catch (error) {
      this.treatError(error as AxiosError);
    }
  };

  post = async <T>(endpoint: string, body?: object): ReturnType<T> => {
    const url = `${this.backendUrl}/${endpoint}`;

    try {
      const response = await axios.post(url, body, { withCredentials: true });
      return await response.data;
    } catch (error) {
      this.treatError(error as AxiosError);
    }
  };

  delete = async <T>(endpoint: string): ReturnType<T> => {
    const url = `${this.backendUrl}/${endpoint}`;

    try {
      const response = await axios.delete(url, { withCredentials: true });
      return await response.data;
    } catch (error) {
      this.treatError(error as AxiosError);
    }
  };

  put = async <T>(endpoint: string, body?: object): ReturnType<T> => {
    const url = `${this.backendUrl}/${endpoint}`;

    try {
      const response = await axios.put(url, body, { withCredentials: true });
      return await response.data;
    } catch (error) {
      this.treatError(error as AxiosError);
    }
  };

  patch = async <T>(endpoint: string, body?: object): ReturnType<T> => {
    const url = `${this.backendUrl}/${endpoint}`;

    try {
      const response = await axios.patch(url, body, { withCredentials: true });
      return await response.data;
    } catch (error) {
      this.treatError(error as AxiosError);
    }
  };
}

export const requestUtil = new RequestUtil();
