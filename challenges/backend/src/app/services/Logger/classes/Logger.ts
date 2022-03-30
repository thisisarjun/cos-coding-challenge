import {ILogger} from "../interface/ILogger";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import { IWinstonLogger } from "../interface/IWinstonLogger";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";

@injectable()
export class Logger implements ILogger {

    private _winston:IWinstonLogger;

    public constructor(
        @inject(DependencyIdentifier.WINSTON_LOGGER) winston: IWinstonLogger,
    ){
        this._winston = winston;
    }

    public info(message: string, obj?: Record<string, any>): void {
        this._winston.getLogger().info(`${message}`, obj);
    }

    public error(message: string, obj?: Record<string, any>): void {
        this._winston.getLogger().error(`${message}`, obj);
    }

    public debug(message: string, obj?: Record<string, any>): void {
        this._winston.getLogger().debug(`${message}`, obj);
    }

}