import axios from "axios";

const AUTH_VERIFY_URL = process.env.AUTH_VERIFY_URL || "http://localhost:3000/api/v1/auth/verifyUser";

export const verifyUser = async (req, res, next) => {
    try {
        // Support multiple header names: `authToken`, `auth-token`, and `Authorization: Bearer <token>`
        const token = req.headers.authtoken || req.headers['auth-token'];
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized',
                data: null,
                error: { message: 'Authentication token missing' }
            });
        }

        // Forward the token in headers to the auth verification endpoint. Include both common header names so the auth service can pick what it expects.
        const headers = {
            authToken: token,
            'auth-token': token,
        };

        const response = await axios.get(AUTH_VERIFY_URL, { headers });

        // Expect the auth service to return user info in response.data.data or response.data.user
        const user = response?.data?.data || response?.data?.user || response?.data;

        if (!user) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized',
                data: null,
                error: { message: 'Invalid authentication token' }
            });
        }

        // Attach user to request for downstream handlers
        req.user = user;
        return next();
    } catch (error) {
        // If auth service returned a response, surface its message when possible
        const statusCode = error.response?.status || 401;
        const message = error.response?.data?.message || 'Unauthorized';

        return res.status(statusCode).json({
            status: statusCode,
            message,
            data: null,
            error: { message: error.message }
        });
    }
}