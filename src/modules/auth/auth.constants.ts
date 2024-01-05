import { env } from "process";

export const authConstants = {
    jwtSecret: env.SECRET_KEY,
    jwtExpirationTime: env.JWT_TOKEN_EXPIRATION
};
