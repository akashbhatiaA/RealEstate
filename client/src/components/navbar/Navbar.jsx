import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";


function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if(currentUser) fetch();


  const user = true;
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="data:image/jpeg;base64,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"
           alt="" />
          <span>BhatiaEstate</span>
        </a>
        <a href="/">Home</a>
        
        <Link to= "/list">Properities</Link>
        <Link to= "/about">About</Link>
        {/* <Link to= "/:id">SinglePage</Link> */}
      </div>
      <div className="right">
      
            {currentUser ? (
              <div className="user">
                <img src= { currentUser.avatar || "/noavatar.jpg" }
                 alt="" />
                 <span className="john">{currentUser.username}</span>
                <Link to = "/profile" className="profile">
                  {number > 0 && <div className="notification">{number}</div>}
                  <span>Profile</span>
                </Link>
              </div>
            ) : (
              <>
              <a href="/login">Sign in</a>
              <a href="/register" className="register">
              Sign up
              </a>
              </>
            )}
         
        
        <div className="menuIcon">
          <img
            src="https://github.com/safak/react-estate-ui/blob/completed/public/menu.png?raw=true"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;