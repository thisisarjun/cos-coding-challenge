import { IConnector } from "../interface/IConnector";
import axios, { AxiosRequestConfig } from 'axios'
import { inject } from "inversify";
import { ILogger } from "../../Logger/interface/ILogger";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import _ = require('lodash');



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
      const res = await axios.request({
        url,
        headers,
        params,
        data
      });
      return res?.data;
    }catch(error: any){
      if (error.response) {
        this._logger.log(`Error in request | responseStatus: ${error.response.status} `)
        this._logger.log(`Response Data: ${error.response.data}`)
      } else if (error.request) {
        this._logger.log(`Request did not receive any response`)
        this._logger.log(error.request);
      } else {
        this._logger.log(`Unknown Error `);
        this._logger.log(error.message);
      }
      throw error;
    }
  }
}