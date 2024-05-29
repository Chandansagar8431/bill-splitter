import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setStage } from "../state/index";
import { useState } from "react";

const Card = ({ item, cart, isCartList, productView }) => {
  const [count, setCount] = useState(1);
  const stagedProduct = useSelector((state) => state.authAndProducts.stage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(
      setStage({
        product: item,
      })
    );
  };

  if (stagedProduct) {
    console.log(stagedProduct.price);
  }

  return (
    <div className="flex flex-col " onClick={() => handleClick(item._id)}>
      <img className={`w-64 h-52 `} src={`${item.imageURL}`} alt="pic" />
      {cart && (
        <>
          <p className="text-lg text-description-col mt-1">{item.name}</p>
          {!isCartList && !productView && <hr className="my-2"></hr>}
        </>
      )}
      <div
        className={`text-balance  text-description-col
        }`}>
        {item.description}
      </div>

      {/* {cart && (
       
      )} */}
    </div>
  );
};

export default Card;
