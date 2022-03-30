import { injectable } from "inversify";
import { createLogger, transports, format } from "winston";
import { IWinstonLogger } from "../interface/IWinstonLogger";

@injectable()
export class WinstonLogger implements IWinstonLogger {

  private settings = {
    level: "debug",
    timestamp: () => new Date().toISOString(),
    format: format.combine(
      format.colorize({ all: true }),
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.printf(
       info => {
        return `${info.timestamp} [${info.level}]: ${info.message}`;
       }
      )
    )
  };
  private winstonLogger: any = createLogger({
    transports: [new transports.Console(this.settings)]
  });

  public getLogger(){
    return this.winstonLogger;
  }

}