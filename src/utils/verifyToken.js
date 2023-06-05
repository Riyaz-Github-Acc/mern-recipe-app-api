import jwt from "jsonwebtoken";

// Verify
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
            if (err)
                return res
                    .status(403)
                    .json({ message: "You are not Authenticated!!!" });
            next();
        });
    } else {
        res.status(401).json({ message: "Invalid Token!!!" });
    }
};
