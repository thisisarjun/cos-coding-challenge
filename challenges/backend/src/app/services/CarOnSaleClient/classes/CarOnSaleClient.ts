import { injectable } from "inversify";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient{

	// @ts-ignore
	getRunningAuctions(): Promise<IRunningAuctions[]> {

	}
}