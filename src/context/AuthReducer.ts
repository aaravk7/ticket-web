export interface State {
  user: User | null;
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  mobile: number;
  email: string;
  fullName: string;
  role: UserRole;
}

export type AppAction = {
  type: "LOGIN" | "LOGOUT";
  payload: User | null;
};

export const authReducer = (state: State, action: AppAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };

    default:
      return state;
  }
};
