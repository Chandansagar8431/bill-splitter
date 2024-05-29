import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNonSharedLists, setShareCount } from "../state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SharingLists = () => {
  const count = useSelector((state) => state.authAndProducts.shareCount);
  const nonSharedLists = useSelector(
    (state) => state.authAndProducts.nonSharedLists
  );
  const dispatch = useDispatch();
  console.log(count);

  const handleClick = (list, id) => {
    const newCount = count.filter((list) => list.id !== id);
    const lists = [...nonSharedLists, list];
    dispatch(setNonSharedLists({ lists }));

    console.log(newCount);
    console.log(count);
    dispatch(setShareCount(newCount));
  };
  return (
    <>
      <div className="overflow-x-auto mt-6">
        Added {count.length} friends to share
        <div>
          <ul className="list-none bg-product-view rounded-md px-1 py-2">
            {count.map((list) => (
              <li
                key={list.id}
                className="inline-block ml-1 bg-black px-1 rounded-lg  text-gray-400 ">
                {list.name}
                <FontAwesomeIcon
                  icon={faXmark}
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => handleClick(list, list.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SharingLists;
