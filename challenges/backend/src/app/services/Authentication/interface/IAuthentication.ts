interface IAuthenticationResult{
  authenticated: boolean,
  userId: string,
  internalUserId: number,
  internalUserUUID: string,
  token: string,
  type: number,
  privileges: string,
}

export interface IAuthentication{

	createAuthToken(credentials: {
		userId: string,
		password: string
	}): Promise<IAuthenticationResult>
}