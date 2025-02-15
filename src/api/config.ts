import axios from "axios";
import { API_ENDPOINTS, BASE_URL } from "./end-points";

// Function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("accessToken") || "";
  }
  return "";
};

// Function to check maintenance mode
const checkOnMaintain = async () => {
  try {
    const res = await api.get(API_ENDPOINTS.MAINTENANCE);
    if (res?.data.in_maintenance && !res?.data.allow_access_in_maintenance) {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        localStorage.setItem("mode", "maintain");
        window.location.href = "/maintenance-unplanned";
      }
    }
  } catch (error) {
    console.error("Error checking maintenance mode:", error);
  }
};

// Create a single Axios instance
const DOMAIN = 'https://demoinstitute.dev.eduley.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    host: "backend-dev.eduley.com",
    origin: DOMAIN,
    referer: `${DOMAIN}/`,
  },
});

// Request Interceptor
api.interceptors.request.use(
  async (options) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("mode", "notmaintain");
    }

    const token = getAuthToken();
    
    // Set headers correctly
    options.headers.set('origin', DOMAIN);
    options.headers.set('referer', `${DOMAIN}/`);
    if (token) {
      options.headers.set('Authorization', `JWT ${token}`);
    }

    return options;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) return Promise.reject(error);

    const { status } = error.response;

    if (status === 503) {
      checkOnMaintain();
    }
    if ([401, 403].includes(status)) {
      localStorage.clear();
      window.location.href = "/";
    }
    if (status === 400) {
      window.location.reload();
    }

    return Promise.reject({ error, data: error.response });
  }
);

export default api;

export interface InstituteConfig {
  name: string;
  tagline: string;
  domain: string;
  logo: string;
  footer_logo: string;
  favicon: string;
  primary_color: string;
  secondary_color: string;
  phone: string;
  address: string;
  facebook_link?: string;
  twitter_link?: string;
  instagram_link?: string;
  youtube_link?: string;
  // ... add other fields as needed
}

export const DEFAULT_INSTITUTE_CONFIG: InstituteConfig = {
  primary_color: '#6C1717',
  secondary_color: '#F7F7F7',
  name: 'Eduley',
  logo: 'https://media.dev.eduley.com/media/king-long-logo-3900x800.png',
  tagline: 'Success your Dream and make it true',
  phone: '9818177117',
  facebook_link: undefined,
  twitter_link: undefined,
  instagram_link: undefined,
  youtube_link: undefined,
  domain: 'https://demoinstitute.dev.eduley.com',
  footer_logo: '',
  favicon: '',
  address: '',
};

export async function getInstituteConfig(): Promise<InstituteConfig> {
  try {
    const response = await api.get(API_ENDPOINTS.INSTITUTE);
    
    if (!response.data || !response.data[0]) {
      console.warn('Invalid institute config response, using fallback config');
      return DEFAULT_INSTITUTE_CONFIG;
    }
    
    // Merge the API response with default values for any missing properties
    return {
      ...DEFAULT_INSTITUTE_CONFIG,
      ...response.data[0]
    };
    
  } catch (error) {
    console.error('Error fetching institute config:', error);
    return DEFAULT_INSTITUTE_CONFIG;
  }
}
