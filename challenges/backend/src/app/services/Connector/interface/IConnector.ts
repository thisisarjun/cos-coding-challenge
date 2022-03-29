import { AxiosRequestConfig } from "axios"


export interface IConnector {

  requestExternalService(reqOptions:AxiosRequestConfig): Promise<Record<string, any>>
}