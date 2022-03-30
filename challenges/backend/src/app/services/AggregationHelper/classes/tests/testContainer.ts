import "reflect-metadata";
import { Container } from "inversify";
import {DependencyIdentifier} from "../../../../DependencyIdentifiers";
import { IAggregationHelper } from "../../interface/IAggregationHelper";
import { AggregationHelper } from "../AggregationHelper";


const testContainer = new Container({
  defaultScope: "Singleton",
});

testContainer.bind<IAggregationHelper>(DependencyIdentifier.AGGREGATION_HELPER).to(AggregationHelper);


export {
  testContainer
}