import { injectable } from "inversify";
import { IAuthentication } from "../interface/IAuthentication";



@injectable()
export class Authentication implements IAuthentication {

  // @ts-ignore
  createAuthToken(credentials: { userId: string; password: string; }): Promise<IAuthenticationResult> {        
  }
}
