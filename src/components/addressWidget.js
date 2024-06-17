import React, { useEffect, useState } from "react";
import { countries } from "../data/countries";
import Modal from "../components/modal";
import Navbar from "../components/navbar";
import { countriesAndItsStates } from "../data/statesForCountries";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../state";
import state from "../state";
import { v4 as uuidv4 } from "uuid";

const AddressWidget = () => {
  const [country, setCountry] = useState("");
  const [type, setType] = useState("home");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [pinCode, setPinCode] = useState(null);
  const [addressdetails, setAddressDetails] = useState(" ");
  const { user } = useSelector((state) => state.authAndProducts);
  const token = sessionStorage.getItem("token");
  const [address, setAddress] = useState([]);
  const [edit, setEdit] = useState({ editting: false, type: "" });
  const [selectedAddress, setSelectedAddress] = useState("");
  const dispatch = useDispatch();
  console.log(address);
  console.log(selectedAddress);
  console.log(selectedAddress);

  useEffect(() => {
    let ignore = false;
    const getUserInfo = async () => {
      const response = await fetch("http://localhost:3100/user/userDetails", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const userDetails = await response.json();
      if (!ignore) {
        setAddress([...userDetails.address]);
      }
    };
    getUserInfo();

    return () => {
      ignore = true;
    };
  }, [token, user]);

  const countryList = countries.map((country, index) => {
    if (country === " ") {
      return (
        <option key={country + index} value={country}>
          Select country
        </option>
      );
    } else {
      return (
        <option key={country + index} value={country}>
          {country}
        </option>
      );
    }
  });
  const stateList = countriesAndItsStates[country].map((state, index) => (
    <option key={state + index} value={state}>
      {state}
    </option>
  ));

  const updateUserAddress = async (uid, completeAddress) => {
    try {
      const response = await fetch(
        `http://localhost:3100/user/address${
          edit?.editting ? `/edit/${edit.type}` : ""
        }`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [edit?.editting ? edit.type : type]: {
              id: uid,
              address: completeAddress,
            },
          }),
        }
      );
      const updatedUser = await response.json();

      dispatch(setAuth({ user: updatedUser, token: token }));
      setAddress([...updatedUser.address]);
      setSelectedAddress(
        updatedUser.address[updatedUser.address.length - 1][type].address
      );
      return updatedUser.address;
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      const completeAddress = `${name}, ${addressdetails}, ${city}, ${state}, ${country}, ${pinCode}. \n Moble No: ${mobileNumber}`;
      console.log(completeAddress);
      const userAddress = await updateUserAddress(edit?.id, completeAddress);

      setAddressDetails("");
      setName("");
      setCity("");
      setMobileNumber("");
      setCity("");
      setPinCode("");
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id, type) => {
    try {
      const response = await fetch(
        `http://localhost:3100/user/address/${type}/${id}`,
        {
          method: "Delete",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updatedUser = await response.json();
      dispatch(setAuth({ user: updatedUser, token: token }));
      setAddress([...updatedUser.address]);
    } catch (error) {
      console.error(error);
    }
  };

  const addresses = address.map((list, index) => {
    console.log(list.home);
    if (list.home) {
      return (
        <div key={list + index}>
          {" "}
          <h1 className="text-description-col">Home</h1>
          <div className="flex justify-between gap-4">
            <h1 className="text-white flex-wrap">
              <input
                type="radio"
                checked={selectedAddress === list.home.address}
                value={list.home.address}
                className="border-2 cursor-pointer bg-black mr-2"
                onChange={(e) => setSelectedAddress(e.target.value)}
              />
              {list.home.address}
            </h1>
            <div className="flex">
              <button
                className=" border-2 h-8  rounded-lg  ml-16 border-blue-200 bg-white text-black font-semibold px-0.5"
                onClick={() => {
                  setIsOpen(true);
                  setEdit({
                    ...edit,
                    editting: true,
                    type: "home",
                    id: list.home.id,
                  });
                }}>
                Edit
              </button>
              <button
                className=" border-2  h-8  rounded-lg  ml-2 border-blue-200 bg-white text-black font-semibold px-0.5"
                onClick={() => handleDelete(list.home.id, "home")}>
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    } else if (list.office) {
      return (
        <div key={list + index}>
          <h1 className="text-description-col">Office</h1>
          <div className="flex justify-between gap-4">
            <h1 key={list + index} className="text-white">
              <input
                type="radio"
                checked={selectedAddress === list.office.address}
                value={list.office.address}
                className="border-2 cursor-pointer bg-black mr-2"
                onChange={(e) => setSelectedAddress(e.target.value)}
              />
              {list.office.address}
            </h1>
            <div className="flex">
              <button
                className=" border-2 h-8  rounded-lg  ml-16 border-blue-200 bg-white text-black font-semibold px-0.5"
                onClick={() => {
                  setIsOpen(true);
                  setEdit({
                    ...edit,
                    editting: true,
                    type: "office",
                    id: list.office.id,
                  });
                }}>
                Edit
              </button>
              <button
                className=" border-2 h-8  rounded-lg  ml-2 border-blue-200 bg-white text-black font-semibold px-0.5"
                onClick={() => handleDelete(list.office.id, "office")}>
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    } else if (list.other) {
      return (
        <div key={list + index}>
          <h1 className="text-description-col">Other</h1>
          <div className="flex justify-between">
            <h1 key={list + index} className="text-white">
              <input
                type="radio"
                checked={selectedAddress === list.other.address}
                value={list.other.address}
                className="border-2 cursor-pointer bg-black mr-2"
                onChange={(e) => setSelectedAddress(e.target.value)}
              />
              {list.other.address}
            </h1>
            <div className="flex">
              <button
                className=" border-2 h-8  rounded-lg  ml-16 border-blue-200 bg-white text-black font-semibold px-0.5"
                onClick={() => {
                  setIsOpen(true);
                  setEdit({
                    ...edit,
                    editting: true,
                    type: "other",
                    id: list.other.id,
                  });
                }}>
                Edit
              </button>
              <button
                className=" border-2 h-8  rounded-lg  ml-2 border-blue-200 bg-white text-black font-semibold px-0.5"
                onClick={() => handleDelete(list.other.id, "other")}>
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    }
  });
  console.log(addresses);
  const handleCountry = (e) => {
    console.log(e.target.value);
    setCountry(e.target.value);
    setStates(countriesAndItsStates[e.target.value]);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setEdit(null);
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completeAddress = `${name}, ${addressdetails}, ${city}, ${state}, ${country}, ${pinCode}. \n Moble No: ${mobileNumber}`;
    console.log(completeAddress);

    const uid = uuidv4();

    const userAddress = await updateUserAddress(uid, completeAddress);

    setAddressDetails("");
    setName("");
    setCity("");
    setMobileNumber("");
    setCity("");
    setPinCode("");
    handleClose();
  };

  return (
    <>
      <div className=" relative h-full w-full ">
        {addresses}
        <button
          className=" m-4 border-2 bg-slate-300 self-start px-2 w-3/6 font-semibold rounded-lg h-14 text-lg"
          onClick={handleOpen}>
          {" "}
          + Add address
        </button>

        <Modal
          className={`${isOpen ? "overFlow-y-hidden" : null} `}
          isOpen={isOpen}
          onClose={handleClose}>
          <div className=" ">
            <form className=" flex flex-col ml-2 p-4 ">
              <div>
                <input
                  type="radio"
                  disabled={edit?.editting && edit?.type !== "home"}
                  value={"home"}
                  checked={edit?.type ? edit.type === "home" : type === "home"}
                  onChange={(e) => setType(e.target.value)}
                />
                <label className="ml-2 text-description-col">Home</label>
                <input
                  type="radio"
                  value={"office"}
                  disabled={edit?.editting && edit?.type !== "office"}
                  checked={
                    edit?.type ? edit.type === "office" : type === "office"
                  }
                  onChange={(e) => setType(e.target.value)}
                  className="ml-2"
                />
                <label className="ml-2 text-description-col">Office</label>
                <input
                  type="radio"
                  value={"other"}
                  disabled={edit?.editting && edit?.type !== "other"}
                  checked={
                    edit?.type ? edit.type === "other" : type === "other"
                  }
                  onChange={(e) => setType(e.target.value)}
                  className="ml-2"
                />
                <label className="ml-2 text-description-col">Other</label>
              </div>
              <label className=" text-description-col my-2">Country </label>

              <select
                className=" rounded-md focus:outline-none p-1"
                value={country}
                onChange={(e) => handleCountry(e)}>
                {countryList}
              </select>

              <label className="text-description-col my-2"> Full Name</label>

              <input
                value={name}
                type="text"
                className="focus:outline-none rounded-md px-1"
                onChange={(e) => setName(e.target.value)}
              />

              <label className=" text-description-col my-2">
                Mobile Number
              </label>

              <input
                type="number"
                value={mobileNumber}
                className="focus:outline-none rounded-md px-1"
                onChange={(e) => setMobileNumber(e.target.value)}
              />

              <label className="text-description-col my-2">Pin code</label>

              <input
                type="number"
                value={pinCode}
                className=" focus:outline-none rounded-md px-1"
                onChange={(e) => setPinCode(e.target.value)}
              />

              <label className="text-description-col my-2">
                Flat, House No, Street, Area / Locality
              </label>

              <input
                type="text"
                value={addressdetails}
                className=" rounded-md focus:outline-none px-1"
                onChange={(e) => setAddressDetails(e.target.value)}
              />

              <label className="text-description-col my-2">State</label>

              <select
                value={state}
                className="rounded-md focus:outline-none p-1"
                onChange={(e) => setState(e.target.value)}>
                {stateList}
              </select>
              <label className="text-description-col my-2"> City</label>
              <input
                type="text"
                value={city}
                className="focus:outline-none rounded-md px-1 "
                onChange={(e) => setCity(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="font-semibold rounded-md  mt-8 self-end bg-slate-300 border-2 border-gray-600 p-1"
                  onClick={(e) => {
                    edit?.editting ? handleEdit(e) : handleSubmit(e);
                  }}>
                  {" "}
                  Submit{" "}
                </button>
                <button
                  className=" font-semibold rounded-md  mt-8 self-end bg-slate-300 border-2 border-gray-600 p-1"
                  onClick={handleClose}>
                  close
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AddressWidget;
