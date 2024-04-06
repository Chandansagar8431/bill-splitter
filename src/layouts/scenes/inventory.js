import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, setStage } from "../../state/index";
import Card from "../../components/card";
import ProductWidget from "./productWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Inventory = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.authAndProducts.products);
  const stagedProducts = useSelector((state) => state.authAndProducts.stage);
  const sessionToken = sessionStorage.getItem("token");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3100/shop/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
        const productLists = await response.json();
        dispatch(
          setProducts({
            products: productLists,
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [sessionToken, dispatch]);

  const renderProductLists = products.map((item) => (
    <Card key={item._id} item={item} />
  ));

  return (
    <div className="relative">
      <div className="flex flex-col">
        <h1 className="font-sans text-blue-100 text-xl p-3">
          Hot meal for today
        </h1>
        <div
          className={`flex flex-wrap flex-stretch gap-6 justify-center ${
            stagedProducts ? "opacity-30" : "opacity-100"
          } ${stagedProducts ? "pointer-events-none" : "pointer-events-auto"}`}>
          {renderProductLists}
        </div>
      </div>
      {stagedProducts && <ProductWidget key={stagedProducts._id} />}
      {stagedProducts && (
        <FontAwesomeIcon
          icon={faXmark}
          size="xl"
          className="absolute top-12 left-96 z-20 pl-2.5 text-white"
          onClick={() => {
            dispatch(
              setStage({
                stage: null,
              })
            );
          }}
        />
      )}
    </div>
  );
};

export default Inventory;
