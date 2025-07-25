export const authId = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}