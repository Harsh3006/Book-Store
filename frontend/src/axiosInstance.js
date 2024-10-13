import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
  baseURL,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
});

// Set up request interceptor to include the access token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.withCredentials) {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Set up response interceptor to handle errors or perform actions on responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Perform actions on successful responses
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.request.status === 401 && originalRequest.withCredentials && !originalRequest._retry) {
      // Access token has expired, attempt to refresh it
      originalRequest._retry = true;
      try {
        const response = await axios.post(`${baseURL}refresh-token/`, {
          refresh_token: localStorage.getItem('refresh_token'),
        });

        const { access_token } = response.data;

        // Update the access token in the local storage
        localStorage.setItem('access_token', access_token);

        // Update the access token in the axios headers
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        // Retry the original failed request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
