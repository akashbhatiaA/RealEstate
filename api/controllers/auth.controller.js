import bcrypt from "bcrypt"; // bcryptke help sa hmna jo password dala ha vo password ni show hoga or koi password he show hoga or koi..

import jwt from "jsonwebtoken"; // jwt it is just like a passport ,it provide the token to the user and then usr can excess the data.

import prisma from "./../lib/prisma.js";

export const register = async (req, res) => {
  //db operations
  const { username, email, password } = req.body; //  or username  , password, or email address valaa data store ho gya ha.

  // console.log(req.body) // eske help sa terminal ma show hoga
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // eg--- candsjkamdnkbjenigbrbgiuewjvkfbnbdrbjkbfdgeik

    console.log(hashedPassword); // eske help sa hma password terminal ma show hoga

    const newUser = await prisma.user.create({
      data: {
        username, // es pura ke help sa data mongo db ma store hoga..
        email,
        password: hashedPassword,
      },
    });
    // console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User already exist" });
  }
};

export const login = async (req, res) => {
  //db operations
  const { username, email, password } = req.body; //  or username  , password, or email address valaa data store ho gya ha. jo hmna postman ma jo data lekha ha vo data store ho jya ga...
  try {
    // CHECK IF THE EXISTS
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(404).json({ message: "invalid credentials!" });

    //CHECK IF THE PASSWORD IS CORRECT
    // hm bcrypt ke help sa compare kra ga password ko..

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER
    //  cookie is use for security purposes only.. koi be apka data base ko hack na kr pya ...
    // hmara token string ke form ma hota aha or hma cookies ke form ma chieya hota ha..
    //  res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );
    // hmara token string ke form ma hota aha or hma cookies ke form ma chieya hota ha.. eg postman ma jb hm jya ga  hm cookies ma ja kr  hma token cheyha

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // //  secure:true
        
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "logout successful" });
};

// // async ma hm await lgata he ha hmasa .
