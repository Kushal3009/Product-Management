// Morgan stream for Winston integration
import morgan from "morgan";
import logger from "./logger.js";

// Stream writes to logger with HTTP level
const stream = {
    write: (message) => logger.http(message.trim()),
};

// Morgan middleware to structure log using `||`
// It will log the user's username if available in `req.user.branch_code`
const morganMiddleware = morgan(
    (tokens, req, res) => {
        const source = process.env.SOURCE;
        const username = req.user?.branch_code
            ? `${req.user.branch_code}-${req.user.user_type?.toUpperCase?.() || ''}`
            : "anonymous";

        return [
            tokens["remote-addr"](req, res),
            "||",
            source,
            "||",
            username,
            "||",
            tokens.method(req, res),
            "||",
            tokens.url(req, res),
            "||",
            tokens.status(req, res),
            "||",
            tokens["response-time"](req, res),
            "ms",
        ].join(" ");
    },
    { stream }
);

export default morganMiddleware;
