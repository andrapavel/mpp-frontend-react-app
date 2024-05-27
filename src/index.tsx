// store/types/authTypes.ts
export enum AuthActionTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
}

export interface AuthState {
    user: any; // Define your user type here
    isAuthenticated: boolean;
}

export type AuthAction = {
    type: AuthActionTypes;
    payload?: any; // Define payload type if needed
};
