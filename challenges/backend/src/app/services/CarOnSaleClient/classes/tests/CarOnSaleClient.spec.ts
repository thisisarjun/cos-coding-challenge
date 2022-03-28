import { expect } from 'chai';
import { DependencyIdentifier } from '../../../../DependencyIdentifiers';
import { ICarOnSaleClient } from '../../interface/ICarOnSaleClient';
import {testContainer} from './testContainer'

describe("CarOnSaleClient", () => {

  let carOnSaleClient:ICarOnSaleClient;

  beforeEach(() => {
    testContainer.snapshot();
    carOnSaleClient = testContainer.get<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT);
  });

  afterEach(() => {
    testContainer.restore();
  })

  it("method getRunningAuctions should be defined", async () => {
    expect(carOnSaleClient).has.property('getRunningAuctions')
  })

})