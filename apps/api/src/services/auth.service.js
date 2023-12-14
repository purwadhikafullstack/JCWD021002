import { getUserQuery } from "../queries/user.query";

export const getUserService = async () => {
  try {
    const res = await getUserQuery();

    return res
  } catch (err) {
    throw err
  }
}
