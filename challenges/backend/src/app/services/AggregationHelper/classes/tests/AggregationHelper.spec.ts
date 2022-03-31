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
      {
        auctionId: 18161,
        auctionProgressPercent: 0,
        label: 'Opel Astra 120 Jahre Start/Stop [DE - Kb5 1.4 Turbo EU6d-T, 120 Jahre S/S (EURO 6d-TEMP), 2018 - 2019]'
      },
      {
        auctionId: 18162,
        auctionProgressPercent: 62,
        label: 'Opel Crossland INNOVATION [DE - SUV5 1.2 Turbo EU6d, INNOVATION S/S (EURO 6d), 2019 - 2020]'
      },
      {
        auctionId: 17990,
        auctionProgressPercent: 72,
        label: 'Volkswagen Golf GTI BMT/Start-Stopp DE - LimS5 2.0 TSI BMT/Start-Stopp EU6, GTI, 2017 - 2018'
      },
      {
        auctionId: 18048,
        auctionProgressPercent: 72,
        label: 'MINI Clubman Cooper [DE - LimS3 1.5 EU6, Cooper, 2018 - 2018]'
      },
      { auctionId: 18084, auctionProgressPercent: 0, label: 'Audi c3' },
      {
        auctionId: 18105,
        auctionProgressPercent: 54,
        label: 'Cupra Formentor VZ 4Drive [DE - SUV5 2.0 TSI EU6d, VZ 4 Drive OPF (EURO 6d), 2020 - 2022]'
      },
      {
        auctionId: 18108,
        auctionProgressPercent: 54,
        label: 'Seat Ibiza FR [DE - LimS5 1.2 TSI EU6, FR, 2016 - 2017]'
      }
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
      {
        auctionId: 18162,
        auctionProgressPercent: 62,
        label: 'Opel Crossland INNOVATION [DE - SUV5 1.2 Turbo EU6d, INNOVATION S/S (EURO 6d), 2019 - 2020]'
      },
      {
        auctionId: 17990,
        auctionProgressPercent: 72,
        label: 'Volkswagen Golf GTI BMT/Start-Stopp DE - LimS5 2.0 TSI BMT/Start-Stopp EU6, GTI, 2017 - 2018'
      },
      {
        auctionId: 18048,
        auctionProgressPercent: 72,
        label: 'MINI Clubman Cooper [DE - LimS3 1.5 EU6, Cooper, 2018 - 2018]'
      },
      { auctionId: 18084, auctionProgressPercent: 0, label: 'Audi c3' },
      {
        auctionId: 18105,
        auctionProgressPercent: 54,
        label: 'Cupra Formentor VZ 4Drive [DE - SUV5 2.0 TSI EU6d, VZ 4 Drive OPF (EURO 6d), 2020 - 2022]'
      },
      {
        auctionId: 18108,
        auctionProgressPercent: 54,
        label: 'Seat Ibiza FR [DE - LimS5 1.2 TSI EU6, FR, 2016 - 2017]'
      }
    ]
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