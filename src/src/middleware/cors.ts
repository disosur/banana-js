import cors from "cors";
// import { allowedOrigins } from './origins';

type StaticOrigin =
  | boolean
  | string
  | RegExp
  | Array<boolean | string | RegExp>;
type CustomOriginCallback = (err: Error | null, origin?: StaticOrigin) => void;

export default cors({
  credentials: true,
  origin(_requestOrigin: string | undefined, callback: CustomOriginCallback) {
    // Force allow CORS policy in development
    // if (process.env.NODE_ENV === 'development') {
    return callback(null, true);
    // }

    // if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
    //   callback(null, true);
    // } else {
    //   callback(new Error('Not allowed by CORS'));
    // }
  },
});
