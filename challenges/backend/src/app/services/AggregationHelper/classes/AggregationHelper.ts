import { injectable } from "inversify";
import { IRunningAuctions, IRunningAuctionsResult } from "../../CarOnSaleClient/interface/ICarOnSaleClient";
import { IAggregationHelper, IAuctionProgressPercent } from "../interface/IAggregationHelper";

@injectable()
export class AggregationHelper implements IAggregationHelper{

  public calculateAvgPercentOfAuctionProgress(runningAuctions: IRunningAuctions[]): IAuctionProgressPercent[] {

    const auctionProgress = [];
    for(const value of runningAuctions){
      if(!Number.isInteger(value.currentHighestBidValue) || !Number.isInteger(value.minimumRequiredAsk)){
        continue;
      }
      const auctionProgressPercent = Math.round((value.currentHighestBidValue/value.minimumRequiredAsk) * 100);
      auctionProgress.push({
        auctionId: value.id,
        auctionProgressPercent,
        label: value.label
      });
    }
    return auctionProgress;
  }

  public calculateAvgNoOfBidsOnAuction(runningAuctions: IRunningAuctions[], totalAuctions: number): number {

    if(!totalAuctions){
      throw new Error('Invalid call to method, totalAutctions cant be empty')
    }
    let totalBids:number = 0;
    for( const value of runningAuctions){
      if(!Number.isInteger(value.numBids)){
        continue;
      }
      totalBids+= value.numBids;
    }

    return (totalBids/ totalAuctions);
  }

  public calculateNumberOfAuctions(runningAuctions: IRunningAuctionsResult): number {
    return runningAuctions.total;
  }
}