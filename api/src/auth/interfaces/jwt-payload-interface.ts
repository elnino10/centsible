export interface JwtPayloadInterface {
    sub: string; // Subject (user ID)
    email: string; // User email
    username: string; // Username,
    exp: number; // Expiration time (in seconds since epoch)
}