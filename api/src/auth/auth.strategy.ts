import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            // Automatically extracts 'Bearer <token>' from the Authorization header
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET'), // Use the JWT secret from the environment variables
        });
    }
    // Runs automatically AFTER the token is successfully verified
    async validate(payload: { sub: string; email: string; username: string }) {
        return { userId: payload.sub, username: payload.username, email: payload.email };
    }
}