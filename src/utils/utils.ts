import { Order, UserType } from "../types";

export function sortUsersByUsername(users: UserType[], order?: Order | null): UserType[] {
  if (order === "asc") {
      return users.slice().sort((a, b) => a.username.localeCompare(b.username));
  } else if (order === "desc") {
      return users.slice().sort((a, b) => b.username.localeCompare(a.username));
  } else {
      return users.slice();
  }
}
