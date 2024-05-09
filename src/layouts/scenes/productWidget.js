import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import { setStage } from "../../state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ProductWidget = () => {
  const dispatch = useDispatch();
  const stagedProduct = useSelector((state) => state.authAndProducts.stage);
  const cartArr = JSON.parse(localStorage.getItem("cart"));
  console.log(cartArr);

  const navigate = useNavigate();

  const getIndexOfCartItem = (arr, id) => {
    return arr.findIndex((obj) => {
      return obj._id === id;
    });
  };

  const handleClick = () => {
    let idx;
    const cartArr = JSON.parse(localStorage.getItem("cart"));
    if (
      !cartArr.length ||
      getIndexOfCartItem(cartArr, stagedProduct._id) === -1
    ) {
      const item = { ...stagedProduct, qty: 1 };
      cartArr.push(item);
      idx = getIndexOfCartItem(cartArr, stagedProduct._id);
      localStorage.setItem("cart", JSON.stringify(cartArr));
      dispatch(setStage({ product: item }));
    } else {
      idx = getIndexOfCartItem(cartArr, stagedProduct._id);
      const cartItem = cartArr[idx];
      cartItem.qty = cartItem.qty + 1;
      localStorage.setItem("cart", JSON.stringify(cartArr));
      dispatch(setStage({ product: cartItem }));
    }

    const cartCount = JSON.parse(localStorage.getItem("cartCount"));
    if (cartCount) {
      localStorage.setItem("cartCount", JSON.stringify(cartCount + 1));
    } else {
      localStorage.setItem("cartCount", JSON.stringify(1));
    }
    const query = `index=${idx}`;
    navigate(`/cart/${stagedProduct._id}?${query}`);
  };

  return (
    <div className="p-4 m-3 w-96 h-92 bg-product-view absolute top-12 z-20 flex flex-col">
      <img className="w-96 h-72" src={`${stagedProduct.imageURL}`} alt="pic" />
      <p className="text-description-col text-lg">{stagedProduct.name}</p>
      <div className="text-balance  text-description-col">
        {stagedProduct.description}
      </div>
      <p className=" text-description-col text-xl">
        Price: {stagedProduct.price} $
      </p>
      <div className="flex  justify-stretch gap-2 w-full">
        <button
          className="w-56 bg-gray-300 rounded-md p-1 mt-1.5"
          onClick={() => handleClick()}>
          Add
        </button>
        <button className="w-56 bg-gray-300 rounded-md  p-1 mt-1.5">Buy</button>
      </div>
      <FontAwesomeIcon
        icon={faXmark}
        size="xl"
        className="absolute top-1 left-96 z-20 pl-2.5 text-white cursor-pointer"
        onClick={() => {
          dispatch(
            setStage({
              stage: null,
            })
          );
        }}
      />
    </div>
  );
};

export default ProductWidget;
