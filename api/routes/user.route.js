// import express from "express";

// import {register,login,logout} from './../controllers/auth.controller.js';  
// const router = express.Router();



// router.post("/register",register);
// router.post("/logout",logout);

// router.post("/login",login);

// export default router;


import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  savePost,
  profilePosts,
  getNotificationNumber
} from "../controllers/user.controller.js";
import { verifyToken } from "./../middleware/verifyToken.js"

const router = express.Router();

router.get("/", getUsers);
// router.get("/search/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.get("/profilePosts", verifyToken, profilePosts);
router.get("/notification", verifyToken, getNotificationNumber);

export default router;