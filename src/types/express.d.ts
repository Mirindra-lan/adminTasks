import "express";

declare global {
  namespace Express {
    interface Request {
      userInfo?: any; // ou un type précis (recommandé)
    }
  }
}