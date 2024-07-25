import { ICredential } from "../interfaces/ICredential";
import { creadentialMock } from "../mocks/mock";

export const createCredentialService = async (
  username: string,
  password: string
) => {
  const newCredential: ICredential = await {
    id: creadentialMock.length + 1,
    username,
    password,
  };
  return newCredential.id;
};

export const loginCredentialService = (username: string, password: string) => {
  let result: number | undefined = undefined;

  const credential = creadentialMock.find(
    (credential) =>
      credential.username === username && credential.password === password
  );
  if (credential) {
    result = credential.id;
  }

  return result;
};


