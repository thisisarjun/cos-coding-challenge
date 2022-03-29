export interface IAuthenticationResult{
  authenticated: boolean,
  userId: string,
  internalUserId: number,
  internalUserUUID: string,
  token: string,
  type: number,
  privileges: string,
}

export interface IAuthentication{

	generateAuthToken(credentials: {
		userId: string,
		password: string
	}): Promise<IAuthenticationResult>
}