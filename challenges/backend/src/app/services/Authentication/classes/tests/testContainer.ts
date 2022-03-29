import { Container } from "inversify";
import {DependencyIdentifier} from "../../../../DependencyIdentifiers";
import {ILogger} from "../../../Logger/interface/ILogger";
import {Logger} from "../../../Logger/classes/Logger";
import { Connector } from "../../../Connector/classes/Connector";
import { IConnector } from "../../../Connector/interface/IConnector";
import { IAuthentication } from "../../interface/IAuthentication";
import { Authentication } from "../Authentication";

const testContainer = new Container({
  defaultScope: "Singleton",
});

testContainer.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
testContainer.bind<IConnector>(DependencyIdentifier.CONNECTOR).to(Connector);
testContainer.bind<IAuthentication>(DependencyIdentifier.AUTHENTICATION).to(Authentication);

export {
  testContainer
}