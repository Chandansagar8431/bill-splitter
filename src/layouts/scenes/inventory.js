import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, setStage } from "../../state/index";
import Card from "../../components/card";
import ProductWidget from "./productWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import FliterByCategoryBar from "../../components/fliterByCategoryBar";
import { useLocation } from "react-router-dom";
import FilterByPrice from "../../components/filterByPrice";

const Inventory = ({ isSearching, setIsSearching }) => {
  const dispatch = useDispatch();
  const [isFilter, setIsFilter] = useState(false);
  const [filterInfo, setFilterInfo] = useState({ isClicked: false });
  const [appliedFilter, setAppliedFilter] = useState({ category: [] });
  const [directPriceFilteredProducts, setdirectPriceFilteredProducts] =
    useState();
  const products = useSelector((state) => state.authAndProducts.products);
  const stagedProducts = useSelector((state) => state.authAndProducts.stage);
  const sessionToken = sessionStorage.getItem("token");
  const priceFilter = useSelector(
    (state) => state.authAndProducts.filter.price
  );
  const searchedItems = useSelector(
    (state) => state.authAndProducts.searchedItems
  );

  // Effect is called when the app initially loads first
  useEffect(() => {
    let ignore = false;
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3100/shop/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
        const productLists = await response.json();
        if (!ignore) {
          dispatch(
            setProducts({
              products: productLists,
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
    return () => {
      ignore = true;
    };
  }, [sessionToken, dispatch]);

  // Function to handle the category filter along with the price filter if the price filter is applied  present
  const handleCategoryAndPriceAsWell = useCallback(
    async (...category) => {
      const query = category.reduce((acc, cur) => {
        acc[cur] = cur;
        return acc;
      }, {});
      const queryParams = new URLSearchParams({
        ...query,
      });
      try {
        if (Object.keys(priceFilter.priceRange).length !== 0) {
          const priceRangeASArr = Object.keys(priceFilter.priceRange)[0].split(
            ","
          );
          const [first, last] = priceRangeASArr;
          if (category.length === 0) {
            const getProducts = async () => {
              try {
                if (first && last) {
                  const response = await fetch(
                    `http://localhost:3100/shop/products/price?first=${priceRangeASArr[0]}&last=${priceRangeASArr[1]}`,
                    {
                      method: "GET",
                      headers: {
                        Authorization: `Bearer ${sessionToken}`,
                      },
                    }
                  );
                  const productLists = await response.json();

                  dispatch(
                    setProducts({
                      products: productLists,
                    })
                  );
                } else if (first && !last) {
                  const response = await fetch(
                    `http://localhost:3100/shop/products/price?first=${priceRangeASArr[0]}`,
                    {
                      method: "GET",
                      headers: {
                        Authorization: `Bearer ${sessionToken}`,
                      },
                    }
                  );
                  const productLists = await response.json();

                  dispatch(
                    setProducts({
                      products: productLists,
                    })
                  );
                }
              } catch (error) {
                console.error(error);
              }
            };
            getProducts();
          }

          if (category.length !== 0) {
            if (first && last) {
              const response = await fetch(
                `http://localhost:3100/shop/filter/?${queryParams}&first=${priceRangeASArr[0]}&last=${priceRangeASArr[1]}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${sessionToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              const filteredLists = await response.json();
              dispatch(setProducts({ products: filteredLists }));
              setdirectPriceFilteredProducts(null);
            }
            if (first && !last) {
              const response = await fetch(
                `http://localhost:3100/shop/filter/?${queryParams}&first=${priceRangeASArr[0]}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${sessionToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              const filteredLists = await response.json();
              dispatch(setProducts({ products: filteredLists }));
            }
          }
        } else {
          if (category.length === 0) {
            const getProducts = async () => {
              try {
                const response = await fetch(
                  `http://localhost:3100/shop/products`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${sessionToken}`,
                    },
                  }
                );
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
          }
          if (category.length !== 0) {
            const response = await fetch(
              `http://localhost:3100/shop/filter/?${queryParams}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${sessionToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            const filteredLists = await response.json();
            dispatch(setProducts({ products: filteredLists }));
          }
        }

        console.log(category);
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, sessionToken, priceFilter]
  );

  // handle filter popup
  const handleFilter = () => {
    setIsFilter(!isFilter);
  };
  // cooking up the items to render on landing page with the condition of whether is there
  //only a price filtered products or not
  let renderProductLists;

  if (searchedItems.searchLists?.length !== 0 && !searchedItems.noResults) {
    renderProductLists = searchedItems.searchLists?.map((item) => (
      <Card key={item._id} item={item} />
    ));
  } else if (
    searchedItems.searchLists.length === 0 &&
    searchedItems.noResults
  ) {
    renderProductLists = <h1 className="text-white z-40">No items found</h1>;
  } else {
    renderProductLists = products.map((item) => (
      <Card key={item._id} item={item} />
    ));
  }

  return (
    <div className="relative">
      {!isFilter ? (
        <div className="flex flex-col relative">
          <div className="w-56 p-2 text-white  bg-[#2C2C2D]  rounded-lg my-2 ">
            <div className="flex justify-between items-center">
              <p>Filter By</p>
              <FontAwesomeIcon
                icon={faPlus}
                className=" cursor-pointer"
                onClick={() => handleFilter()}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <h1 className="font-sans text-blue-100 text-xl p-3">
                Hot meal for today
              </h1>
              <div
                className={`flex flex-wrap gap-8 rounded-lg justify-center bg-[#2C2C2D]  py-4  my-2 ${
                  stagedProducts ? "opacity-30" : "opacity-100"
                } ${
                  stagedProducts ? "pointer-events-none" : "pointer-events-auto"
                }`}>
                {renderProductLists}
              </div>
            </div>
          </div>
          {stagedProducts && <ProductWidget key={stagedProducts._id} />}
        </div>
      ) : (
        <div className="flex gap-2">
          <div>
            <div className=" w-56 p-2 text-white bg-[#2C2C2D]  rounded-lg my-2  flex flex-col ">
              <div className="flex justify-between items-center self-stretch w-56">
                <p>Filter By</p>
                <FontAwesomeIcon
                  icon={faMinus}
                  className=" cursor-pointer mr-4"
                  onClick={() => handleFilter()}
                />
              </div>
              <hr className="border-gray-500 my-1"></hr>
              <FliterByCategoryBar
                // appliedFilter={appliedFilter}
                // setAppliedFilter={setAppliedFilter}
                handleCategoryAndPriceAsWell={handleCategoryAndPriceAsWell}
                setPriceFilteredProducts={setdirectPriceFilteredProducts}
                setIsSearching={setIsSearching}
              />
              {}
              <FilterByPrice
                appliedFilter={appliedFilter}
                priceFilteredProducts={directPriceFilteredProducts}
                setPriceFilteredProducts={setdirectPriceFilteredProducts}
                setIsSearching={setIsSearching}
              />
            </div>
          </div>
          <div className="relative">
            <div className="flex flex-col ">
              <h1 className="font-sans text-blue-100 text-xl p-3">
                Hot meal for today
              </h1>
              <div
                className={`flex flex-wrap gap-8 rounded-lg justify-center bg-[#2C2C2D] px-4 py-4 my-2 ml-2 ${
                  stagedProducts ? "opacity-30" : "opacity-100"
                } ${
                  stagedProducts ? "pointer-events-none" : "pointer-events-auto"
                }`}>
                {renderProductLists}
              </div>
            </div>
            {stagedProducts && <ProductWidget key={stagedProducts._id} />}
          </div>
        </div>
      )}

      {/* </div> */}
      {/* {stagedProducts && <ProductWidget key={stagedProducts._id} />} */}
    </div>
  );
};

export default Inventory;
