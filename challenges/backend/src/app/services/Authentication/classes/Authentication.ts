import { inject, injectable } from "inversify";
import { IAuthentication, IAuthenticationResult } from "../interface/IAuthentication";
import config = require('config');
import urlJoin from 'url-join';
import { IConnector } from "../../Connector/interface/IConnector";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "../../Logger/interface/ILogger";

@injectable()
export class Authentication implements IAuthentication {

  private _connector:IConnector;
  private _logger:ILogger;

  public constructor(
    @inject(DependencyIdentifier.LOGGER) logger: ILogger,
    @inject(DependencyIdentifier.CONNECTOR) connector: IConnector
  ) {
    this._connector = connector;
    this._logger = logger;
  }

  public async generateAuthToken(credentials: { userId: string; password: string; }): Promise<IAuthenticationResult> {

    const {
      password,
      userId
    } = credentials;

    const url = urlJoin(
      config.get('carOnSale.host'),
      config.get('carOnSale.paths.authentication'),
      userId
    );

    const data = {
      password
    }

    const authDetails = await this._connector.requestExternalService({
      url,
      method: 'PUT',
      data
    });
    this._logger.log('Succesfully authenticated');
    return authDetails as IAuthenticationResult;

  }
}
