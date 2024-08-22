import { CrendentialModel } from "../configs/data-source";
import { creadentialMock } from "../mocks/mock";

export const createCredentialService = async (
  username: string,
  password: string
) => {
  const newCredential = await CrendentialModel.create({ username, password });
  await CrendentialModel.save(newCredential);
  
  return newCredential;
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
