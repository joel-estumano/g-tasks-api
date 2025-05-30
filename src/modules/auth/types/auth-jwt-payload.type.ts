export type AuthJwtPayload = {
    sub: string;
    email: string;
    name: string;
};

export type AuthJwtResponse = {
    access_token: string;
    refresh_token: string;
};
