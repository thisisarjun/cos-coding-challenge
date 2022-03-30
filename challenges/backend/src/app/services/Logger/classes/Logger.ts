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

    public log(message: string, obj?: Record<string, any>): void {
        this._winston.getLogger().info(`[LOG]: ${message}`, obj);
    }

    public error(message: string, obj?: Record<string, any>): void {
        this._winston.getLogger().error(`[ERROR]: ${message}`, obj);
    }

    public debug(message: string, obj?: Record<string, any>): void {
        this._winston.getLogger().debug(`[DEBUG]: ${message}`, obj);
    }

}