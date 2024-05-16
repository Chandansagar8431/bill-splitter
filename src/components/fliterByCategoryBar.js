import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearchedItems } from "../state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { category } from "../data/categoryAndPriceInfo";

const FliterByCategoryBar = ({
  handleCategoryAndPriceAsWell,
  setIsSearching,
  setPriceFilteredProducts,
}) => {
  const dispatch = useDispatch();
  const [isCategory, setisCategory] = useState(false);
  const [cat, setCat] = useState({});
  const priceFilter = useSelector(
    (state) => state.authAndProducts.filter.price
  );
  const categoryFilter = useSelector(
    (state) => state.authAndProducts.filter.category
  );
  const searchedItems = useSelector((state) => state.authAndProducts.searched);

  useEffect(() => {
    handleCategoryAndPriceAsWell(...categoryFilter.selectedCategories);
  }, [categoryFilter.selectedCategories, handleCategoryAndPriceAsWell]);

  const handleFilter = (category) => {
    if (category === "category") {
      setisCategory(!isCategory);
    }
  };

  const applyCategoryFilter = (category, price = null) => {
    if (cat[category]) {
      setPriceFilteredProducts(null);
      dispatch(
        setFilter({
          filter: {
            price: {
              isApplied: priceFilter?.isApplied,
              priceRange: { ...priceFilter.priceRange },
            },
            category: {
              isApplied: categoryFilter.isApplied,
              selectedCategories: [
                ...categoryFilter.selectedCategories.filter(
                  (list) => list !== category
                ),
              ],
            },
          },
        })
      );
      const catCopy = cat;
      delete catCopy[category];
      setCat(catCopy);
      if (searchedItems?.searchLists.length !== 0) {
        dispatch(setSearchedItems({ searchLists: [], noResults: false }));
      }
      setIsSearching(false);
    } else {
      console.log("cat");
      setCat({ ...cat, [category]: category });
      setPriceFilteredProducts(null);
      dispatch(
        setFilter({
          filter: {
            price: {
              isApplied: priceFilter?.isApplied,
              priceRange: { ...priceFilter.priceRange },
            },
            category: {
              isApplied: categoryFilter.isApplied,
              selectedCategories: [
                ...categoryFilter.selectedCategories,
                category,
              ],
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
    <>
      <div className=" flex flex-col self-stretch w-full">
        <div className=" relative flex  justify-between items-center">
          <p className="text-white">Category </p>
          {!isCategory ? (
            <FontAwesomeIcon
              icon={faAngleDown}
              onClick={() => handleFilter("category")}
              className="text-white"
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleUp}
              onClick={() => handleFilter("category")}
              className="text-white"
            />
          )}
        </div>

        {isCategory && (
          <div>
            {category.map((list, index) => (
              <div className=" flex gap-4 items-center" key={index}>
                {categoryFilter.selectedCategories.includes(list) ? (
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    className="bottom-4 left-0 cursor-pointer text-white"
                    onClick={() => {
                      applyCategoryFilter(list);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faSquare}
                    className="cursor-pointer text-gray-400"
                    onClick={() => {
                      applyCategoryFilter(list);
                    }}
                  />
                )}
                <p className="text-white">{list}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FliterByCategoryBar;
