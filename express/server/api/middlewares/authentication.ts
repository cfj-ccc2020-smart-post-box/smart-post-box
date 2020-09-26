import * as express from 'express';
import * as jwt from 'jsonwebtoken';

class User {
  id: number;
  name: string;
}

export const expressAuthentication = (req: express.Request, securityName: string, scopes?: string[]): Promise<User> => {
  if (securityName === 'api_token') {
    let token: string;
    if (req.query && req.query.access_token && typeof req.query.access_token === 'string') {
      token = req.query.access_token;
    }

    if (token === 'guest') {
      return Promise.resolve({
        id: 1,
        name: 'Guest',
      });
    } else {
      return Promise.reject({});
    }
  }

  if (securityName === 'jwt') {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error('No token provided'));
      }
      jwt.verify(token, '[secret]', (err: unknown, decoded: { scopes: string; id: number; name: string }): void => {
        if (err) {
          reject(err);
        } else {
          // Check if JWT contains all required scopes
          for (const scope of scopes) {
            if (!decoded.scopes.includes(scope)) {
              reject(new Error('JWT does not contain required scope.'));
            }
          }
          if (!('id' in decoded || 'name' in decoded)) {
            reject(new Error('JWT does not contain required id/name.'));
          } else {
            resolve(decoded);
          }
        }
      });
    });
  }
};
