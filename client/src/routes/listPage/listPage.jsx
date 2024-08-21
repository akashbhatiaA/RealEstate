import Filter from "../../components/filter/Filter";
import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
//   const { postResponse } = useLoaderData();
  // console.log(x);
  // console.log(postResponse.data);
  
  const data = useLoaderData();
  // console.log(data.postResponse);

  return (
    <div className="listpage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {/* {postResponse.data.map((item)=>(
                <Card key={item.id} item={item}/>
                //item ka use database src -> lib -> database.js ko access karne ke liye use kia ha
            ))} */}
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>

      <div className="mapContainer">
        {/* <Map items={postResponse.data}/> */}
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
