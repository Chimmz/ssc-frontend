interface RequestConfig extends RequestInit {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
}

type RequestCall<T = string> = (
  arg: T,
  options?: Pick<RequestInit, 'cache' | 'next'>
) => Promise<any>;

class API {
  _baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // _baseUrl = 'http://localhost:5000/api/v1';
  // process.env.NODE_ENV === 'development'
  // ? 'http://localhost:5000'

  async _makeRequest({ path, ...config }: RequestConfig) {
    const isApiCall = path.startsWith('/');
    try {
      const reqUrl = isApiCall ? this._baseUrl!.concat(path) : path;
      const res = await fetch(reqUrl, { ...config });

      return await res.json();
    } catch (err) {
      console.log('Error log in _makeRequest: ', err);
      return err;
    }
  }

  signup: RequestCall<{ fullname: string; email: string; password: string }> =
    async credentials => {
      return this._makeRequest({
        path: '/users/auth/signup',
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' }
      });
    };

  login: RequestCall<{ email: string; password: string }> = async credentials => {
    return this._makeRequest({
      path: '/users/auth/login',
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' }
    });
  };

  async googleSignIn(authToken: string) {
    return this._makeRequest({
      path: `/users/auth/google-signin?token=${authToken}`,
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

  getAllNews: RequestCall<{ query?: string; page: number; limit: number } | undefined> =
    async opts => {
      const searchQuery = opts?.query ? `q=${opts.query}` : '';
      const queryStr = opts ? `?${searchQuery}&page=${opts.page}&limit=${opts.limit}` : '';

      return this._makeRequest({
        path: `/news`.concat(queryStr),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
    };

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

  async requestPasswordReset(email: string) {
    return this._makeRequest({
      method: 'POST',
      path: `/users/auth/request-password-reset`,
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async validatePasswordResetToken(token: string) {
    return this._makeRequest({
      method: 'GET',
      path: `/users/auth/request-password-reset?token=${token}`,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async resetPassword(newPassword: string, resetToken: string) {
    return this._makeRequest({
      method: 'PATCH',
      path: `/users/auth/reset-password`,
      body: JSON.stringify({ password: newPassword, token: resetToken }),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async getPostSignupQuestionnaireStage(token: string) {
    return this._makeRequest({
      method: 'GET',
      path: `/users/questionnaire-stage`,
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
    });
  }

  async sendVerificationCodeSMS(phone: string, token: string) {
    return this._makeRequest({
      method: 'POST',
      body: JSON.stringify({ phone }),
      path: `/users/auth/phone`,
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
    });
  }

  async verifyPhoneVerificationCode(code: string, token: string) {
    return this._makeRequest({
      method: 'GET',
      path: `/users/auth/phone/verify?code=${code}`,
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
    });
  }

  async updateUser(body: object, token: string) {
    return this._makeRequest({
      method: 'PATCH',
      body: JSON.stringify(body),
      path: `/users/update`,
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
    });
  }
}

export default new API();
