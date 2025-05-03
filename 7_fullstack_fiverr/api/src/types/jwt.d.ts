import * as jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  // Extend SignOptions to allow `string` instead of `StringValue`
  export interface SignOptions {
    expiresIn?: string | number; // Override StringValue with string | number
  }
}