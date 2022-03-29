import { IConnector } from "../interface/IConnector";
import axios, { AxiosRequestConfig } from 'axios'
import { inject, injectable } from "inversify";
import { ILogger } from "../../Logger/interface/ILogger";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import * as _ from 'lodash';


@injectable()
export class Connector implements IConnector{

  private _logger;

  public constructor(
    @inject(DependencyIdentifier.LOGGER) logger: ILogger
  ){
    this._logger = logger;
  }

  public async requestExternalService(reqOptions: AxiosRequestConfig): Promise<Record<string, any>> {
    const {
      params,
      url,
      data,
      method
    } = reqOptions;
    let {
      headers
    } = reqOptions;
    try{
      if(_.isEmpty(headers)){
        headers = {
          'accept' : 'application/json',
        }
      }
      this._logger.debug(`Initiating a ${method} request on ${url} with
        headers: ${JSON.stringify(headers)}
        params: ${JSON.stringify(params)}
        data: ${JSON.stringify(data)}
      `)
      const res = await axios.request({
        method,
        url,
        headers,
        params,
        data
      });
      return res?.data;
    }catch(error: any){
      if (error.response) {
        this._logger.error(`Error in request | responseStatus: ${error.response.status} `)
        this._logger.error('Response Data:', error.response.data)
      } else if (error.request) {
        this._logger.error(`Request did not receive any response`, error.request)
      } else {
        this._logger.error(`Unknown Error: ${error.message}`);
      }
      throw error;
    }
  }
}