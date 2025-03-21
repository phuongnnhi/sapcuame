import apiService from "./apiServices";

interface AuthResponse {
  message: string;
  user?: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    role?: string;
  };
  token?: string;
  refreshToken?: string;
}

// Register a new user
export const registerUser = async (userData: {
  name: string;
  email?: string;
  phone: string;
  password: string;
  address?: string;
  role?: string;
}): Promise<AuthResponse> => {
  try {
    const response = await apiService.post<AuthResponse>("/auth/register", userData);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken); // Store refresh token
      }
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Log in a user
export const loginUser = async (loginData: {
  email?: string;
  phone?: string;
  password: string;
}): Promise<AuthResponse> => {
  try {
    const response = await apiService.post<AuthResponse>("/auth/login", loginData);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken); // Store refresh token
      }
  
      return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Log out a user
export const logoutUser = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
  
      await apiService.post("/auth/logout", {token}, {
        headers: {
          "Content-Type": "application/json"
        },
      });
  
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

// Get Logged-In User Details
export const getUserDetails = async (): Promise<AuthResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await apiService.get<AuthResponse>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};