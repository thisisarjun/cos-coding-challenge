import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { IAuthentication } from "../../Authentication/interface/IAuthentication";
import { IConnector } from "../../Connector/interface/IConnector";
import { ILogger } from "../../Logger/interface/ILogger";
import { ICarOnSaleClient, IRunningAuctions } from "../interface/ICarOnSaleClient";
import config = require('config');
import urlJoin from 'url-join';

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient{

	private _logger:ILogger;
	private _auth: IAuthentication;
	private _connector:IConnector

	public constructor(
		@inject(DependencyIdentifier.LOGGER) logger: ILogger,
		@inject(DependencyIdentifier.AUTHENTICATION) auth: IAuthentication,
		@inject(DependencyIdentifier.CONNECTOR) connector: IConnector,
	){
		this._auth = auth;
		this._logger = logger;
		this._connector = connector;
	}

	private async callGetRunningAuctionsAPI(input: {
		token: string,
		userId: string
	}):Promise<IRunningAuctions[]>{
		const url = urlJoin(
			config.get('carOnSale.host'),
			config.get('carOnSale.paths.getRunningAuctions')
		)
		const {
			token,
			userId
		} = input;

		const runningAuctions = await this._connector.requestExternalService({
			url,
			method: 'GET',
			headers: {
				userId,
				authToken: token
			}
		});
		this._logger.debug(`Succesfully fetched running auctions`)
		return runningAuctions as IRunningAuctions[];

	}

	public async getRunningAuctions(credentials: {
		userId: string,
		password: string
	}): Promise<IRunningAuctions[]> {
		const {
			password,
			userId
		} = credentials;

		const authDetails = await this._auth.generateAuthToken({
			password,
			userId
		});

		const {
			token
		} = authDetails;

		return this.callGetRunningAuctionsAPI({
			token,
			userId
		});

	}
}