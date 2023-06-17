interface CookieStatic {
  get(cookieName: string): string;

  set(key: string, value: string, expiresDay: number): void;

  check(key: string, value: string | number, time: number, forceUpdate: boolean): void;

  clear(cookieName: string): void;

  parse(str: string): object;
}

declare const Cookie: CookieStatic;

export default Cookie;
