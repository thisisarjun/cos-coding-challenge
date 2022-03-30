import { expect } from "chai";
import { DependencyIdentifier } from "../../../../DependencyIdentifiers";
import { sampleData as sampleDataOriginal } from "../../../CarOnSaleClient/classes/tests/sample-running-auctions";
import { IRunningAuctions } from "../../../CarOnSaleClient/interface/ICarOnSaleClient";
import { IAggregationHelper } from "../../interface/IAggregationHelper";
import { testContainer } from "./testContainer";


describe("AggregationHelper", () => {
  let AggregationHelper:IAggregationHelper;
  let sampleData:Record<string, any>;
  beforeEach(() => {
    sampleData = JSON.parse(JSON.stringify(sampleDataOriginal));
    testContainer.snapshot();
    AggregationHelper = testContainer.get<IAggregationHelper>(DependencyIdentifier.AGGREGATION_HELPER)
  });

  afterEach(() => {
    testContainer.restore();
  });

  it("calculateAvgPercentOfAuctionProgress | should return the right op", () => {
    // @ts-ignore
    const op = AggregationHelper.calculateAvgPercentOfAuctionProgress(sampleData.items as IRunningAuctions[]);
    const expectedOp = [
      { auctionId: 18161, auctionProgressPercent: 0 },
      { auctionId: 18162, auctionProgressPercent: 62 },
      { auctionId: 17990, auctionProgressPercent: 72 },
      { auctionId: 18048, auctionProgressPercent: 72 },
      { auctionId: 18084, auctionProgressPercent: 0 },
      { auctionId: 18105, auctionProgressPercent: 54 },
      { auctionId: 18108, auctionProgressPercent: 54 }
    ];
    expect(op).deep.equals(expectedOp);
  });

  it("calculateAvgPercentOfAuctionProgress | should ignore where minAsk or maxBid are not actual integers", () => {
    for(const value of sampleData.items){
      if(value.id === 18161){
        // @ts-ignore
        value.currentHighestBidValue = 'asdasdasd';
      }
    }
    // @ts-ignore
    const op = AggregationHelper.calculateAvgPercentOfAuctionProgress(sampleData.items as IRunningAuctions[]);
    const expectedOp = [
      { auctionId: 18162, auctionProgressPercent: 62 },
      { auctionId: 17990, auctionProgressPercent: 72 },
      { auctionId: 18048, auctionProgressPercent: 72 },
      { auctionId: 18084, auctionProgressPercent: 0 },
      { auctionId: 18105, auctionProgressPercent: 54 },
      { auctionId: 18108, auctionProgressPercent: 54 }
    ];
    expect(op).deep.equals(expectedOp);
  });

  it("calculateAvgNoOfBidsOnAuction | should give the right op", () => {
    // @ts-ignore
    const op = AggregationHelper.calculateAvgNoOfBidsOnAuction(sampleData.items as IRunningAuctions[], sampleData.total);
    const expectedOp = 0;
    expect(op).to.equals(expectedOp);
  });

  it("calculateNumberOfAuctions | should give the right op", () => {
    // @ts-ignore
    const op = AggregationHelper.calculateNumberOfAuctions(sampleData);
    const expectedOp = 7;
    expect(op).to.equals(expectedOp);
  });
});