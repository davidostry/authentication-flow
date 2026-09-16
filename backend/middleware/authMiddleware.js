import jwt from 'jsonwebtoken'

export async function logger(req, res, next) {
    console.log(req.method, req.url);
    next()

}

// export async function auth(req, res, next) {
//     const { authorization } = req.headers;
//     if(!authorization) return res.status(401).json({message: "missing authorization"});
    
//     if (!authorization.startsWith("Bearer ")) return res.status(401).json({ message: "invalid authorization format"});
//     const token = authorization.split(" ")[1];
//     if (!token) return res.status(401).json({message: "unathorized"});
    
//         try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = decoded;

//         next();
//     } catch (error) {
//         return res.status(401).json({
//             message: "invalid or expired token"
//         });
//     }
// }

export async function auth(req, res, next) {
    const { authorization } = req.headers;

    console.log("Authorization:", authorization);

    if (!authorization) {
        return res.status(401).json({
            message: "missing authorization"
        });
    }

    if (!authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "invalid authorization format"
        });
    }

    const token = authorization.split(" ")[1];

    console.log("Token:", token);

    if (!token) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded:", decoded);

        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: "invalid or expired token"
        });
    }
}
