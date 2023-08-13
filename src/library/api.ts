interface RequestConfig {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: string | FormData;
  headers?: object;
  mode?: string;
}

class API {
  _baseUrl = process.env.REACT_APP_API_BASE_URL;
  // _baseUrl = 'http://localhost:5000/api/v1';
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
      path: '/users/auth/signup',
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async login(credentials: { email: string; password: string }) {
    return this._makeRequest({
      path: '/users/auth/login',
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async googleSignIn(outhToken: string) {
    return this._makeRequest({
      path: `/users/auth/google-signin?token=${outhToken}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async verifyEmail(verifId: string, email: string | null) {
    return this._makeRequest({
      path: `/users/auth/email-verify/${verifId}?email=${email}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async resendVerificationEmail(email: string) {
    return this._makeRequest({
      path: `/users/auth/send-email-verification?email=${email}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async newsLetterSubscribe(email: string) {
    return this._makeRequest({
      path: `/users/newsletter?email=${email}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async getAllNews(opts?: { query?: string; page: number; limit: number }) {
    const searchQuery = opts?.query ? `q=${opts.query}` : '';
    const queryStr = opts ? `?${searchQuery}&page=${opts.page}&limit=${opts.limit}` : '';

    return this._makeRequest({
      path: `/news`.concat(queryStr),
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async getStartups(limit?: number) {
    return this._makeRequest({
      path: `/startups`.concat(`?limit=${limit}`),
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async getRandomStartups(limit?: number) {
    return this._makeRequest({
      path: `/startups/random?limit=${limit}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async searchStartups(queryStr: string) {
    return this._makeRequest({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      path: `/startups/search` + queryStr
    });
  }

  async getStartupFilters() {
    return this._makeRequest({
      method: 'GET',
      path: `/startups/filters`,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export default new API();
