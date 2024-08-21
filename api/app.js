// import express from 'express'; 
import router from './routes/post.route.js';




import express from 'express';

import  cors from "cors"
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import testRoute from './routes/test.route.js'
import userRoute from './routes/user.route.js';
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js"


const app = express(); // ya es leya keya ha kyu ke hma data json ke form ma chaiya.
app.use(cors({origin: process.env.CLIENT_URL , credentials: true}));
app.use(express.json())
app.use(cookieParser())
app.use("/api/posts",postRouter);
app.use("/api/auth",authRouter);
app.use("/api/test",testRoute);
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);




app.use("/api/posts", router);

app.use((req, res, next) => {
    // Set cookies with SameSite and Secure attributes
    res.cookie('session', 'exampleValue', {
        httpOnly: true,  // Prevents JavaScript access to cookies
        secure: true,    // Ensures cookies are only sent over HTTPS
        sameSite: 'Lax'  // Controls when cookies are sent
    });
    next();
});



app.listen(8800, () => {
    console.log("Server is running on port 8800");
});
