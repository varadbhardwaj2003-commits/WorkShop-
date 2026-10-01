const cache = {};
const TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
    if (req.method === "GET") {
        const key = req.originalUrl || req.url;
        const cached = cache[key];

        if (cached && (Date.now() - cached.createdAt < TTL)) {
            res.setHeader("X-Cache", "HIT");
            return res.json(cached.data);
        }

        res.setHeader("X-Cache", "MISS");

        const originalJson = res.json.bind(res);
        res.json = function (body) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                cache[key] = {
                    data: body,
                    createdAt: Date.now()
                };
            }
            return originalJson(body);
        };

        return next();
    }

    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
        const originalJson = res.json.bind(res);
        res.json = function (body) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                for (const key in cache) {
                    delete cache[key];
                }
            }
            return originalJson(body);
        };
        return next();
    }

    next();
}

module.exports = cacheMiddleware;
