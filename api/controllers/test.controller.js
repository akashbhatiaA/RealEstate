import jwt from 'jsonwebtoken';

export const shouldBeLoggedIn = (req, res) => {
    const token = req.cookies.token;

    if(!token) res.status(401).json({message: "Not authenticated"});

        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            if(err) res.status(403).json({ message: "Token is not valid" });
        })

        res.status(200).json({ message: "You are Authenticated" });
}
export const shouldBeAdmin = (req, res) => {

    const token = req.cookies.token;

    if(!token) res.status(401).json({message: "Not authenticated"})

        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            if(err) res.status(403).json({ message: "Token is not valid" });

            if(!payload.isAdmin) {
                return res.status(403).json({ message: "Not Authorized" })
            }

        })

        res.status(200).json({ message: "You are Authenticated" });

}