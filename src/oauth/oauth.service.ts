import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class OauthService {
  private users =
    new Map<string, any>();

  private tokenUsers =
    new Map<string, string>();

  private clients = [
    {
      clientId:
        'chatgpt-dev',

      clientSecret:
        'neebys-secret',

      redirectUri:
        'http://localhost:5173/success',
    },
  ];

  private codes =
    new Set<string>();

  private tokens =
    new Set<string>();

  login(
    uid: string,
    name: string,
    email: string,
    photo?: string,
  ) {
    this.users.set(uid, {
      uid,
      name,
      email,
      photo: photo || '',
    });

    return {
      message:
        'User authenticated.',
      uid,
    };
  }

  authorize(
    clientId?: string,
    redirectUri?: string,
  ) {
    const client =
      this.clients.find(
        (c) =>
          c.clientId ===
            clientId &&
          c.redirectUri ===
            redirectUri,
      );

    if (!client) {
      return {
        message:
          'Invalid client.',
      };
    }

    const code =
      randomUUID();

    this.codes.add(code);

    return {
      redirect:
        `${redirectUri}?code=${code}`,
    };
  }

  token(code: string) {
    if (
      !this.codes.has(code)
    ) {
      return {
        message:
          'Invalid authorization code.',
      };
    }

    this.codes.delete(code);

    const accessToken =
      randomUUID();

    // IMPORTANT
    this.tokens.add(
      accessToken,
    );

    this.tokenUsers.set(
      accessToken,
      'demo',
    );

    return {
      access_token:
        accessToken,

      token_type:
        'Bearer',

      expires_in:
        3600,
    };
  }

  me(token?: string) {
    if (
      !token ||
      !this.tokens.has(
        token,
      )
    ) {
      return {
        message:
          'Invalid access token.',
      };
    }

    const uid =
      this.tokenUsers.get(
        token,
      );

    const user =
      this.users.get(
        uid || '',
      );

    return (
      user || {
        id: '1',
        name:
          'Shailu',
        email:
          'demo@neebys.com',
      }
    );
  }

  revoke(token?: string) {
    if (
      !token ||
      !this.tokens.has(
        token,
      )
    ) {
      return {
        message:
          'Invalid access token.',
      };
    }

    this.tokens.delete(
      token,
    );

    this.tokenUsers.delete(
      token,
    );

    return {
      message:
        'Access token revoked successfully.',
      };
  }
}