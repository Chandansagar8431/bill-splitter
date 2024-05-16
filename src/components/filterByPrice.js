import {
  faAngleDown,
  faAngleUp,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, setSearchedItems } from "../state";
import { priceRange } from "../data/categoryAndPriceInfo";

const FilterByPrice = ({
  appliedFilter,
  setPriceFilteredProducts,
  setIsSearching,
}) => {
  // const sessionToken = sessionStorage.getItem("token");
  const [isFilter, setIsFilter] = useState(false);
  const priceFilter = useSelector(
    (state) => state.authAndProducts.filter.price
  );
  console.log(priceFilter.priceRange);
  const categoryFilter = useSelector(
    (state) => state.authAndProducts.filter.category
  );
  const searchedItems = useSelector(
    (state) => state.authAndProducts.searchedItems
  );

  const dispatch = useDispatch();
  console.log(priceFilter);
  console.log(categoryFilter);

  const handlePriceRange = (list) => {
    if (priceFilter.priceRange[list]) {
      dispatch(
        setFilter({
          filter: {
            price: {
              isApplied: priceFilter.isApplied,
              priceRange: {},
            },
            category: {
              isApplied: categoryFilter.isApplied,
              selectedCategories: [...categoryFilter.selectedCategories],
            },
          },
        })
      );
      if (searchedItems?.searchLists.length !== 0) {
        dispatch(setSearchedItems({ searchLists: [], noResults: false }));
      }
      setIsSearching(false);
    } else {
      dispatch(
        setFilter({
          filter: {
            price: {
              isApplied: priceFilter.isApplied,
              priceRange: { [list]: list },
            },
            category: {
              isApplied: categoryFilter.isApplied,
              selectedCategories: [...categoryFilter.selectedCategories],
            },
          },
        })
      );
      if (searchedItems?.searchLists.length !== 0) {
        dispatch(setSearchedItems({ searchLists: [], noResults: false }));
      }
      setIsSearching(false);
    }
  };

  return (
    <div className="mt-2 w-full">
      <div className="flex items-center justify-between">
        <p className="text-white">Filter price</p>
        {!isFilter ? (
          <>
            <FontAwesomeIcon
              icon={faAngleDown}
              className="text-white"
              onClick={() => {
                dispatch(
                  setFilter({
                    filter: {
                      price: {
                        isApplied: !priceFilter?.isApplied,
                        priceRange: { ...priceFilter.priceRange },
                      },
                      category: {
                        isApplied: categoryFilter.isApplied,
                        selectedCategories: [
                          ...categoryFilter.selectedCategories,
                        ],
                      },
                    },
                  })
                );
                setIsFilter(!isFilter);
              }}
            />
          </>
        ) : (
          <>
            <FontAwesomeIcon
              icon={faAngleUp}
              className="text-white"
              onClick={() => {
                dispatch(
                  setFilter({
                    filter: {
                      price: {
                        isApplied: !priceFilter.isApplied,
                        priceRange: { ...priceFilter.priceRange },
                      },
                      category: {
                        isApplied: categoryFilter.isApplied,
                        selectedCategories: [
                          ...categoryFilter.selectedCategories,
                        ],
                      },
                    },
                  })
                );
                setIsFilter(!isFilter);
              }}
            />
          </>
        )}
      </div>
      {/* <hr className="border-gray-500 my-1"></hr> */}

      {isFilter &&
        priceRange.map((list, index) => {
          if (index === 0) {
            return (
              <div
                key={index}
                className="flex gap-4 items-center "
                onClick={() => {}}>
                {priceFilter.priceRange[list.toString()] ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSquareCheck}
                      className="cursor-pointer text-white"
                      onClick={() => handlePriceRange(list.toString())}
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faSquare}
                      className="cursor-pointer text-gray-400"
                      onClick={() => handlePriceRange(list.toString())}
                    />
                  </>
                )}

                <p className="text-white">Price below {list[0]} $</p>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="flex gap-4 items-center "
                onClick={() => {}}>
                {priceFilter.priceRange[list.toString()] ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSquareCheck}
                      className="cursor-pointer text-white"
                      onClick={() => handlePriceRange(list.toString())}
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faSquare}
                      className="cursor-pointer text-gray-400"
                      onClick={() => handlePriceRange(list.toString())}
                    />
                  </>
                )}

                <p className="text-white">
                  Price from {list[0]} $ - {list[1]} $
                </p>
              </div>
            );
          }
        })}
    </div>
  );
};

export default FilterByPrice;
