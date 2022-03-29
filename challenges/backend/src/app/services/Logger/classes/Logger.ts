import {ILogger} from "../interface/ILogger";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export class Logger implements ILogger {

    public constructor() {
    }


    public log(message: string, obj?: Record<string, any>): void {
        console.log(`[LOG]: ${message}`, obj);
    }

    public error(message: string, obj?: Record<string, any>): void {
        console.error(`[ERROR]: ${message}`, obj);
    }

    public debug(message: string, obj?: Record<string, any>): void {
        console.debug(`[DEBUG]: ${message}`, obj);
    }

}