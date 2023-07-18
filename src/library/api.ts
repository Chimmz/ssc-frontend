interface RequestConfig {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: string | FormData;
  headers?: object;
  mode?: string;
}

class API {
  _baseUrl = 'http://localhost:5000/api/v1';
  // process.env.NODE_ENV === 'development'
  // ? 'http://localhost:5000'
  // ? process.env.NEXT_PUBLIC_API_BASE_URL_REMOTE
  // process.env.NEXT_PUBLIC_API_BASE_URL_RENDER;

  async _makeRequest({ path, ...config }: RequestConfig) {
    const isApiCall = path.startsWith('/');
    try {
      const reqUrl = isApiCall ? this._baseUrl!.concat(path) : path;
      const res = await fetch(reqUrl, { ...config } as RequestInit);
      return await res.json();
    } catch (err) {
      console.log('Error log in _makeRequest: ', err);
      return err;
    }
  }

  async signup(credentials: { fullname: string; email: string; password: string }) {
    return this._makeRequest({
      path: '/users/signup',
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async login(credentials: { email: string; password: string }) {
    return this._makeRequest({
      path: '/users/login',
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async verifyEmail(verifId: string) {
    return this._makeRequest({
      path: `/users/email-verify/${verifId}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export default new API();
