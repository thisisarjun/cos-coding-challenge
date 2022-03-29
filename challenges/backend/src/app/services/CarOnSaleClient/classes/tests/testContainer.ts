import { Container } from "inversify";
import {DependencyIdentifier} from "../../../../DependencyIdentifiers";
import {ILogger} from "../../../Logger/interface/ILogger";
import {Logger} from "../../../Logger/classes/Logger";
import { ICarOnSaleClient } from "../..//interface/ICarOnSaleClient";
import { CarOnSaleClient } from "../../classes/CarOnSaleClient";
import { Authentication } from "../../../Authentication/classes/Authentication";
import { IAuthentication } from "../../../Authentication/interface/IAuthentication";
import { Connector } from "../../../Connector/classes/Connector";
import { IConnector } from "../../../Connector/interface/IConnector";

const testContainer = new Container({
  defaultScope: "Singleton",
});

testContainer.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
testContainer.bind<IConnector>(DependencyIdentifier.CONNECTOR).to(Connector);
testContainer.bind<IAuthentication>(DependencyIdentifier.AUTHENTICATION).to(Authentication);
testContainer.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);

export {
  testContainer
}