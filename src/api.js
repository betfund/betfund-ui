import axios from 'axios';

// Stores the base URL for Betfund API
const apiUrl = process.env.REACT_APP_BETFUND_AUTH_API_URL

/**
 * Creates a formatted header for API calls.
 * @param {string} token - API token provided via Betfund API.
 */
function authHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

/**
 * Client for Betfund API.
 */
const betfundApi = {
  /**
   * Retrieves the JWT access token of registered user.
   * @param {string} username - Username of attempting user
   * @param {string} password - Password of attempting user
   */
  async logInGetToken(username, password) {
    // Set headers
    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    // Set params
    var params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    // Set request options
    var options = {
      method: 'POST',
      headers: headers,
      body: params,
      redirect: 'follow'
    };
    return fetch(`${apiUrl}/api/v1/login/access-token`, options);
  },
  /**
   * Pings API server to determine whether access token is valid.
   * @param {string} token - JWT token provided via Betfund API.
   */
  async isActiveToken(token) {
    var headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    var options = {
      method: 'POST',
      headers: headers,
      redirect: 'follow'
    };
    return fetch(`${apiUrl}/api/v1/login/validate-token`, options);
  },
  /**
   * Gets current user information
   * @param {string} token - JWT token provided via Betfund API
   */
  async getMe(token) {
    return axios.get(`${apiUrl}/api/v1/users/me`, authHeaders(token));
  },
  /**
   * Updates current users information
   * @param {string} token - API token provided via Betfund Authentication API
   * @param {object} data - Data to be updated about a user
   */
  async updateMe(token, data) {
    return axios.put(`${apiUrl}/api/v1/users/me`, data, authHeaders(token));
  },
  async getUsers(token) {
    return axios.get(`${apiUrl}/api/v1/users/`, authHeaders(token));
  },
  async updateUser(token, userId, data) {
    return axios.put(`${apiUrl}/api/v1/users/${userId}`, data, authHeaders(token));
  },
  /**
   * Registers a user.
   * @param {string} email - Email of registering user
   * @param {string} password - Password of registering user
   * @param {string} firstName - First name of registering user
   * @param {string} lastName - Last name of registering user
   */
  async createUser(email, password, firstName, lastName) {
    // Set headers
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    // Set body
    var body = JSON.stringify({
      "email": email,
      "password": password,
      "first_name": firstName,
      "last_name": lastName
    });
    // Set options
    var options = {
      method: 'POST',
      headers: headers,
      body: body,
      redirect: 'follow'
    };
    return fetch(`${apiUrl}/api/v1/users/open`, options);
  },
  /**
   * Forgot password recovery email instructions.
   * @param {string} email - Email of registered user
   */
  async passwordRecovery(email) {
    // Set options
    var options = {
      method: 'POST',
      redirect: 'follow'
    };
    return fetch(`${apiUrl}/api/v1/password-recovery/${email}`, options);
  },
  /**
   * Resets password for user.
   * @param {string} newPassword - New password for user
   * @param {string} token - JWT password reset token
   */
  async resetPassword(newPassword, token) {
    // Set headers
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    // Set body
    var body = JSON.stringify({
      "new_password": newPassword,
      "token": token
    });
    // Set options
    var options = {
      method: 'POST',
      headers: headers,
      body: body,
      redirect: 'follow'
    };
    return fetch(`${apiUrl}/api/v1/reset-password`, options);
  },
  /**
   * Calls UpcomingEvents endpoint.
   * @param {int} sportId - ID of sport
   * @param {int} asOf - Date to search on
   */
  async upcomingEvents(asOf = null, sportId = null) {
    // Set URL params
    var params = {
      as_of: asOf,
      sport_id: sportId
    }
    // Endpoint URL
    var url = new URL(`${apiUrl}/api/v1/events/upcoming`)
    // Extend URL with params if not null
    Object.keys(params).forEach(function (key) {
      if (params[key] != null) {
        url.searchParams.append(key, params[key])
      }
    });
    // Set options
    var options = {
      method: 'GET',
      redirect: 'follow'
    };
    return fetch(url, options);
  }
};

export { betfundApi };
