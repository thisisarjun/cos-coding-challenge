// NOTE: since its dev api we will be calling, no need to stub the actual request
import { expect } from "chai";
import { DependencyIdentifier } from "../../../../DependencyIdentifiers";
import { IAuthentication } from "../../interface/IAuthentication";
import { testContainer } from "./testContainer";

describe("Authentication", () => {

  let authentication:IAuthentication;

  beforeEach(() => {
    testContainer.snapshot();
    authentication = testContainer.get<IAuthentication>(DependencyIdentifier.AUTHENTICATION)
  });

  afterEach(() => {
    testContainer.restore();
  });

  it("should get the right error if wrong data is passed", async () => {

    try{
      await authentication.generateAuthToken({
        password: '',
        userId: ''
      });
      throw new Error(' should have thrown an error but didnt');
    }catch(err: any){
      expect(err.response.data).to.deep.equals({
        msgKey: 'user.not-authenticated',
        params: { userId: 'unknown' },
        message: 'Authentisierung für Benutzer "unknown" fehlgeschlagen.'
      });
    }
  }).timeout(10000);

  it("should get the right response if correct data is passed", async () => {

    const data = await authentication.generateAuthToken({
      userId: 'buyer-challenge@caronsale.de',
      password: 'Test123.'
    });
    expect(data).to.haveOwnProperty('token');

  }).timeout(10000);
});