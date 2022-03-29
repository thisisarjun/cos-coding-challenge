import { IConnector } from "../interface/IConnector";
import axios, { AxiosRequestConfig } from 'axios'
import { inject } from "inversify";
import { ILogger } from "../../Logger/interface/ILogger";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";


export class Connector implements IConnector{

  private logger;

  public constructor(
    @inject(DependencyIdentifier.LOGGER) logger: ILogger
  ){
    this.logger = logger;
  }

  public async requestExternalService(reqOptions: AxiosRequestConfig): Promise<Record<string, any>> {
    const {
      params,
      url,
      data,
      headers
    } = reqOptions;
    try{
      const res = await axios.request({
        url,
        headers,
        params,
        data
      });
      return res?.data;
    }catch(error: any){
      if (error.response) {
        this.logger.log(`Error in request | responseStatus: ${error.response.status} `)
        this.logger.log(`Response Data: ${error.response.data}`)
      } else if (error.request) {
        this.logger.log(`Request did not receive any response`)
        this.logger.log(error.request);
      } else {
        this.logger.log(`Unknown Error `);
        this.logger.log(error.message);
      }
      throw error;
    }
  }
}