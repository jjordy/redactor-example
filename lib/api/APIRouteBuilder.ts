import createDebugger from "debug";
const debug = createDebugger("nirvana-stack:routeBuilder");
const reqDebugger = createDebugger("nirvana-stack:route");

import { NextApiRequest, NextApiResponse } from "next";

interface NextRequestWithLogger extends NextApiRequest {
  logger: typeof reqDebugger;
}

type RouteFn = (
  req: NextRequestWithLogger,
  res: NextApiResponse
) => Promise<any>;
type RouteFnWithNext = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (err?: Error) => void
) => Promise<any> | boolean;
type RouteObj = Record<
  "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | string,
  RouteFn
>;
/**
 * Express like route builder
 * define express like routes and export the
 * build method for a nicely setup api route.
 * the reason why there is a lot of resolve(1)
 * is because next.js needs to know when we finish
 * our work so it doesnt throw an erronous warning
 * about not resolving the api response
 */
export default class APIRouteBuilder {
  routes: RouteObj = {};
  middlewares: RouteFnWithNext[] = [];
  build() {
    return async (req: NextRequestWithLogger, res: NextApiResponse) => {
      return new Promise(async (resolve) => {
        req.logger = reqDebugger;
        try {
          for (const middleware of this.middlewares) {
            await middleware(req, res, (result) => {
              // if the middleware fn calls next and passes an error
              // we need to handle it here.
              if (result instanceof Error) {
                res.status(500).json({ error: result.message, success: false });
                return resolve(1);
              }
            });
          }
          // check to make sure a middleware didnt bail early
          // without this we would potential send http headers twice
          if (!res.headersSent && req.method) {
            if (!this.routes[req.method]) {
              debug(`[${req.method}]: ${req.url} - Not Supported`);
              // let the client know this method isnt supported.
              res.setHeader("Allow", Object.keys(this.routes));
              res.status(405).json({
                success: false,
                message: `Method ${req.method} Not Allowed`,
              });
              return resolve(1);
            }
            Object.keys(this.routes).forEach(async (key) => {
              const handler = this.routes[key];
              // if we have a handler match for this method we execute it.
              if (req.method === key) {
                debug(
                  `[${req.method}]: ${req.url}\n[Query]:`,
                  req.query,
                  `[Body]:`,
                  req.body
                );
                try {
                  await handler(req, res);
                  return resolve(1);
                } catch (err: any) {
                  debug(err);
                  // handle our route errors safely.
                  res.status(500).json({
                    message: err.message,
                    err: JSON.stringify(err, null, 2),
                  });
                  return resolve(1);
                }
              }
            });
          }
        } catch (err) {
          debug("RouteBuilder Error: ", err);
          if (!res.headersSent) {
            res.status(500).end();
            return resolve(1);
          }
        }
      });
    };
  }

  delete(handler: RouteFn) {
    this.routes["DELETE"] = handler;
  }

  get(handler: RouteFn) {
    this.routes["GET"] = handler;
  }

  patch(handler: RouteFn) {
    this.routes["PATCH"] = handler;
  }
  post(handler: RouteFn) {
    this.routes["POST"] = handler;
  }

  put(handler: RouteFn) {
    this.routes["PUT"] = handler;
  }

  use(handler: RouteFnWithNext) {
    this.middlewares.push(handler);
  }
}
