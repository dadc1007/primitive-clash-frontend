export const handleUnauthorized = (): void => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_data");

  if (!window.location.pathname.includes("/login")) {
    window.location.href = "/login";
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem("auth_token");
};
