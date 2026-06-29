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
    clientId: 'chatgpt-neebys',
    clientSecret: 'neebys-secret',
    redirectUri: 'https://chat.openai.com/aip/auth/callback',
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
          clientId,
      );

    if (!client) {
      return {
        message:
          'Invalid client.',
      };
    }

    const finalRedirect =
      redirectUri ||
      client.redirectUri;

    if (!finalRedirect) {
      return {
        message:
          'Invalid redirect URI.',
      };
    }

    const code =
      randomUUID();

    this.codes.add(code);

    return {
      redirect:
        `${finalRedirect}?code=${code}`,
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

  this.tokens.add(
    accessToken,
  );

  this.tokenUsers.set(
    accessToken,
    '1',
  );

  this.users.set('1', {
    uid: '1',
    name: 'Shailu',
    email: 'shailu@neebys.com',
    photo: '',
  });

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