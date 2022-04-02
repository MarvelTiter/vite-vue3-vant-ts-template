import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BoxedResponseValue } from "@/models/BoxedResponseValue";

export interface CreateAxiosOptions extends AxiosRequestConfig {
  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
  ) => AxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;
  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (axiosInstance: AxiosResponse, error: Error) => void;
}

/**
 * @description:  axios module
 */
export class AxiosModule {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * @description: Interceptor configuration
   */
  private setupInterceptors() {
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = this.options;

    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (requestInterceptors) {
        config = requestInterceptors(config);
      }
      return config;
    }, undefined);

    // Request interceptor error capture
    requestInterceptorsCatch &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      if (responseInterceptors) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // Response result interceptor error capture
    responseInterceptorsCatch &&
      this.axiosInstance.interceptors.response.use(undefined, (error) => {
        // @ts-ignore
        responseInterceptorsCatch(this.axiosInstance, error);
      });
  }

  get<T = any>(config: CreateAxiosOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: CreateAxiosOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T = any>(config: CreateAxiosOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  delete<T = any>(config: CreateAxiosOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  async request<T = any>(config: CreateAxiosOptions): Promise<T> {
    let conf: CreateAxiosOptions = Object.assign({}, config);
    console.log('conf: ', conf);
    let response = await this.axiosInstance(conf)
    console.log(response);
    return response.data
  }
}
