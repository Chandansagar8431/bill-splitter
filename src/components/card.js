import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCartEntries, setStage } from "../state/index";
import { useState } from "react";

const Card = ({ item, cart, isCartList, productView }) => {
  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem("cart")).length
  );
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
  const getIndexOfCartItem = (arr, id) => {
    return arr.findIndex((obj) => {
      return obj._id === id;
    });
  };

  const handleAddCart = (e, coressItem) => {
    e.stopPropagation();
    let idx;
    const cartArr = JSON.parse(localStorage.getItem("cart"));
    if (!cartArr.length || getIndexOfCartItem(cartArr, coressItem._id) === -1) {
      const item = { ...coressItem, qty: 1 };
      cartArr.push(item);
      idx = getIndexOfCartItem(cartArr, coressItem._id);
      localStorage.setItem("cart", JSON.stringify(cartArr));
    } else {
      idx = getIndexOfCartItem(cartArr, coressItem._id);
      const cartItem = cartArr[idx];
      cartItem.qty = cartItem.qty + 1;
      localStorage.setItem("cart", JSON.stringify(cartArr));
    }

    const cartCount = JSON.parse(localStorage.getItem("cartCount"));
    if (cartCount) {
      localStorage.setItem("cartCount", JSON.stringify(cartCount + 1));
      dispatch(setCartEntries({ entries: cartCount + 1 }));
    } else {
      localStorage.setItem("cartCount", JSON.stringify(1));
      dispatch(
        setCartEntries({
          entries: 1,
        })
      );
    }
  };

  if (stagedProduct) {
    console.log(stagedProduct.price);
  }

  return (
    <div
      className="flex flex-col rounded-md bg-slate-900 z-10"
      onClick={() => handleClick(item._id)}>
      <img
        className={`w-80 h-60 rounded-t-md`}
        src={`${item.imageURL}`}
        alt="pic"
      />
      {cart && (
        <>
          <p className="text-lg text-description-col mt-1">{item.name}</p>
          {!isCartList && !productView && <hr className="my-2"></hr>}
        </>
      )}
      <div
        className={`text-balance  text-description-col p-2
        }`}>
        {item.description}
      </div>
      <div className="text-description-col flex justify-between z-50 items-center pb-2 px-2">
        <p className="font-semibold text-lg">{item.price} $</p>
        <button
          className="bg-yellow-200 text-black p-1 rounded-lg "
          onClick={(e) => {
            handleAddCart(e, item);
          }}>
          {" "}
          Add to cart{" "}
        </button>
      </div>

      {/* {cart && (
       
      )} */}
    </div>
  );
};

export default Card;
