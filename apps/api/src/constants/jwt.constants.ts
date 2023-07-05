export const JWT_OPTIONS = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  expiresIn: 60 * 60, // 3600s = 1h
};

export const JWT_REFRESH_OPTIONS = {
  secret: process.env.REFRESH_TOKEN_SECRET,
  expiresIn: 60 * 60 * 24 * 7, // 7 days
};

export interface JwtPayload {
  id: number;
  nid: string;
  email: string;
}
