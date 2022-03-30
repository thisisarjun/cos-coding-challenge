import {Container} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {Logger} from "./services/Logger/classes/Logger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {AuctionMonitorApp} from "./AuctionMonitorApp";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import { IConnector } from "./services/Connector/interface/IConnector";
import { Connector } from "./services/Connector/classes/Connector";
import { IAuthentication } from "./services/Authentication/interface/IAuthentication";
import { Authentication } from "./services/Authentication/classes/Authentication";
import { IAggregationHelper } from "./services/AggregationHelper/interface/IAggregationHelper";
import { AggregationHelper } from "./services/AggregationHelper/classes/AggregationHelper";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);
container.bind<IConnector>(DependencyIdentifier.CONNECTOR).to(Connector);
container.bind<IAuthentication>(DependencyIdentifier.AUTHENTICATION).to(Authentication);
container.bind<IAggregationHelper>(DependencyIdentifier.AGGREGATION_HELPER).to(AggregationHelper);


const logger = container.get<ILogger>(DependencyIdentifier.LOGGER)

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    try{
        await app.start();
        logger.log(`Succesfully finished. exiting`);
        process.exit(0);
    }catch(err:any){
        logger.error(`Error in auction monitoring, Error: ${err?.message}`);
        process.exit(1);
    }
})();
