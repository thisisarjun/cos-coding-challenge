import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { IAggregationHelper } from "./services/AggregationHelper/interface/IAggregationHelper";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import config = require('config');
import * as _ from 'lodash';

@injectable()
export class AuctionMonitorApp {


    private userId:string = config.get('auth.userId');
    private password:string = config.get('auth.password');

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.AGGREGATION_HELPER) private aggHelper: IAggregationHelper,
        @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private carOnSaleClient: ICarOnSaleClient,
    ) {
    }

    public async start(): Promise<void> {
        this.logger.info(`Auction Monitor started.`);
        this.logger.info(`Fetching Running Auctions from ConS API`);
        const runningAuctionResponse = await this.carOnSaleClient.getRunningAuctions({
            userId: this.userId,
            password: this.password
        });
        if(_.isEmpty(runningAuctionResponse) || _.isEmpty(runningAuctionResponse?.items)){
            this.logger.info(`No Auctions at this point. comeback later :)`);
        }
        const totalAuctions = this.aggHelper.calculateNumberOfAuctions(runningAuctionResponse);
        const avgBids = this.aggHelper.calculateAvgNoOfBidsOnAuction(runningAuctionResponse.items, totalAuctions);
        const avgPercentOfAuctionProgress = this.aggHelper.calculateAvgPercentOfAuctionProgress(runningAuctionResponse.items);
        let finalOutput = `
        ---- RESULTS ----
        Total Auctions: ${totalAuctions}
        Average Bids : ${avgBids}
        `;
        for (const value of avgPercentOfAuctionProgress){
            finalOutput += `\nAverage percentage of the Auction Progress for ${value.label} -> ${value.auctionProgressPercent}%`
        }
        finalOutput+= `
        ---- RESULTS END ----
        `
        this.logger.info(finalOutput)

    }

}
