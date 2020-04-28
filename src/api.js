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
     * @param {string} username - Username of attempting user.
     * @param {string} password - Password of attempting user.
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
     * Pings authentication server to determine whether access token is valid.
     * @param {string} token - API token provided via Betfund Authentication API.
     */
    async isActiveToken(token) {
        var headers = new Headers();
        headers.append("Authorization", "Bearer " + token);

        var options = {
            method: 'POST',
            headers: headers,
            redirect: 'follow'
        };
        return fetch(`${apiUrl}/api/v1/login/validate-token`, options);
    },
    /**
     * Gets current user information.
     * @param {string} token - API token provided via Betfund Authentication API.
     */
    async getMe(token) {
        return axios.get(`${apiUrl}/api/v1/users/me`, authHeaders(token));
    },
    /**
     * Updates current users information
     * @param {string} token - API token provided via Betfund Authentication API.
     * @param {object} data - Data to be updated about a user.
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
    async createUser(token, data) {
        return axios.post(`${apiUrl}/api/v1/users/`, data, authHeaders(token));
    },
    async passwordRecovery(email) {
        return axios.post(`${apiUrl}/api/v1/password-recovery/${email}`);
    },
    async resetPassword(password, token) {
        return axios.post(`${apiUrl}/api/v1/reset-password/`, {
            new_password: password,
            token,
        });
    },
};

export { betfundApi };