export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthSuccessResponse {
  userId: string;
  username: string;
  email: string;
  gold: number;
  gems: number;
  level: number;
  trophies: number;
  token?: string;
}
