import { IRunningAuctions, IRunningAuctionsResult } from "../../CarOnSaleClient/interface/ICarOnSaleClient";

export interface IAuctionProgressPercent {
  auctionId: number,
  auctionProgressPercent: number,
  label: string
}

export interface IAggregationHelper{

  calculateNumberOfAuctions(runningAuctions: IRunningAuctionsResult): number;
  calculateAvgNoOfBidsOnAuction(runningAuctions: IRunningAuctions[], totalAuctions: number): number;
  calculateAvgPercentOfAuctionProgress(runningAuctions: IRunningAuctions[]): IAuctionProgressPercent[];

}