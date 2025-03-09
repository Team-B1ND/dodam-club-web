import cookie from "js-cookie";

class Cookie {
  public getCookie(key: string): string | undefined {
return cookie.get(key) ?? undefined;
  }

  public setCookie(key: string, value: string): void {
    cookie.set(key, value);
  }

  public removeCookie(key: string): void {
    cookie.remove(key);
  }
}

export default new Cookie();