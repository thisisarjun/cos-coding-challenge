import { Container } from "inversify";
import {DependencyIdentifier} from "../../../../DependencyIdentifiers";
import {ILogger} from "../../../Logger/interface/ILogger";
import {Logger} from "../../../Logger/classes/Logger";
import { ICarOnSaleClient } from "../..//interface/ICarOnSaleClient";
import { CarOnSaleClient } from "../../classes/CarOnSaleClient";

const testContainer = new Container({
  defaultScope: "Singleton",
});

testContainer.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
testContainer.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);

export {
  testContainer
}