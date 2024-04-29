import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactStars from 'react-stars'
import {getDocs} from 'firebase/firestore'
import {moviesRef} from '../firebase/firebase'
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prv) => [...prv, {...(doc.data()), id: doc.id}])
      })
      setLoading(false);
    }
    getData();
  },[])

  return (
    <div className="flex flex-wrap justify-between px-3 mt-2">
    {loading ? <div className="w-full flex justify-center items-center h-96"><ThreeDots height={40} color="white" /></div> : 
      data.map((e, i) => {
        return (
          <Link to={`/detail/${e.id}`}>
            <div key={i} className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500 flex first-letter:">
            <div>
            <img className="w-[144px] h-60 md:h-72 md:w-[260px] rounded-lg" src={e.image}/>
            <h1>
              {e.title}
            </h1>
            <h1 className="flex items-center">
              <span className="text-gray-300 mr-1">Rating:</span>
              <ReactStars
                size={20}
                half={true}
                value={e.rating/e.rated}
                edit={false}
              />
            </h1>
            <h1>
              <span className="text-gray-300">Author:</span> {e.Author}
            </h1>
           </div> 
          </div>
          </Link>
        );
      })
    }
    </div>
  );
};

export default Cards;