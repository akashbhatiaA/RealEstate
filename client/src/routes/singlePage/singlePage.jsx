import './singlePage.scss';
import Slider from '../../components/slider/Slider';
import { singlePostData, userData } from '../../lib/dummydata';
import Map from '../../components/map/Map';
import { Navigate, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useContext, useState } from 'react';
import {AuthContext} from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest';
import Chat from '../../components/chat/Chat';

function SinglePage () {
  const navigate = useNavigate();
  const x = useLoaderData() ;
  const [saved, setSaved] = useState(x.isSaved);
  const {currentUser} = useContext(AuthContext);
  const [chatVisible, setChatVisible] = useState(false);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: x.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  // const handleMessage = () => {
  //   if (!currentUser) {
  //     navigate("/login");
  //   } else {
  //     // Toggle the chat visibility or navigate to the chat page
  //     setChatVisible((prev) => !prev);
  //   }
  // };

  // const handleMessage = () => {
  //   if (!currentUser) {
  //     navigate("/login");
  //   } else {
  //     // Navigate to the chat page and pass the post owner's ID
  //     navigate(`/chat?receiverId=${x.user.id}`);
  //   }
  // };
  
// console.log(x);
  // console.log(x.post.images);
// console.log(x.post);
  // console.log(x.post.isSaved);
  // console.log(x.images);


    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">
                <Slider images={x.images} />
                    <div className="info">
                      <div className="top">
                        <div className="post">
                            <h1>{x.title}</h1>
                            <div className="address">
                                <img src="/pin.png"
                                 alt="" />
                                 <span>{x.address}</span>
                            </div>
                            <div className="price">$ {x.price}</div>
                        </div>
                        <div className="user">
                            <img src= {x.user.avatar} alt="" />
                            <span>{x.user.username}</span>
                        </div>
                    </div>
                    <div className="bottom"   dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(x.postDetail.desc),
                        }}> 
                    </div>
                    {/* <div className="bottom">
                      <p>{x.post.postDetail.desc}</p>
                    </div> */}
                    </div>
                </div>
            </div>
            <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" 
               alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {x.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" 
               alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {x.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" 
               alt="" />
              <div className="featureText">
                <span>Income Fees</span>
                <p>{x.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png"
               alt="" />
              <span>{x.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png"
               alt="" />
              <span>{x.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png"
               alt="" />
              <span>{x.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png"
               alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {x.postDetail.school > 999
                    ? x.postDetail.school / 1000 + "km"
                    : x.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{x.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{x.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
           <Map items={[x] } />
          </div>
          <div className="buttons">
            {/* <button onClick={handleMessage}>
              <img src="/chat.png"
               alt="" />
              Send a Message
              
            </button> */}
            <button onClick={handleSave} 
            style={{
              backgroundColor: saved? "#fece51" : "white"
            }}
            >
              <img src="/save.png"
               alt="" />
               {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
      {/* {chatVisible && <Chat chats={[{ id: x.user.id, receiver: x.user }]} />} */}

    </div>
    )
}

export default SinglePage;


