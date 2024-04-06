import React from "react";

const Branding = () => {
  return (
    <div className="flex gap-12  bg-gray-800">
      <img
        className="w-72"
        src="https://res.cloudinary.com/dfgvdlys4/image/upload/v1712142575/burger-5712704_640_gahyrm.jpg"
        alt="brand"
      />
      <div className="flex flex-col w-4/6">
        <div className="w-96 h-32 ml-10 flex flex-col my-10">
          <p className="text-white font-semibold italic">
            "Food for us comes from our relatives, whether they have wings or
            fins or roots. That is how we consider food. Food has a culture. It
            has a history. It has a story. It has relationships"
          </p>
          <p className="self-end text-white italic">
            - Food Furry, Owner and Manager
          </p>
        </div>

        <img
          className="h-64 w-5/6 self-center"
          src="https://res.cloudinary.com/dfgvdlys4/image/upload/v1712147160/kitchen-2373461_640_rekd1n.jpg"
          alt="brand pic"
        />
        <div className="w-96 h-32 ml-10 flex flex-col my-10 self-end">
          <p className="text-white font-semibold italic">
            Chefs and cooks are artists, whose working material is food. Cooking
            is the art of using colors, tastes, smells and forms to create an
            exquisite dish
          </p>
        </div>
      </div>
    </div>
  );
};

export default Branding;
