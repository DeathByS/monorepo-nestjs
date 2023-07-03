export const JWT_OPTIONS = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  expiresIn: 60 * 60,
};

export interface JwtPayload {
  id: number;
  nid: string;
  email: string;
}
