import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) { }

  use(req: Request, res: Response, next: NextFunction) {
    // Check if the request has an authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract the token from the authorization header
    const [type, token] = authHeader.split(' ')[1];
    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token using the JWT secret from the configuration
    try {
      const decoded = jwt.verify(token, this.config.getOrThrow<string>('JWT_SECRET'));
      req.user = decoded; // Attach the decoded user information to the request object

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}