import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { AuthContext } from "../context/Authprovider";
import { toast } from "react-toastify";

function Cards({ item, scaleEffect }) {
  const [isLiked, setLiked] = useState(false);

  const { user } = useContext(AuthContext);
  const handelLikeClicked = () => {
    setLiked(!isLiked);
  };
  const { name, image, recipe, price, _id } = item;

  const handelAddtoCart = (item) => {
    if (user && user?.email) {
      const cartItems = {
        menuId: _id,
        image,
        quanitty: 1,
        name,
        price,
        email: user.email,
      };
      console.log(cartItems);
      fetch("http://127.0.0.1:3001/api/v1/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItems),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message === "Item Already Exists") {
            toast.warning("Item is already in the cart");
          } else if (data.status === "Success") {
            toast.success("Item Added to Cart");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Please log in to add items to the cart");
    }
  };
  return (
    <div className="mb-4 p-2">
      <div>
        <div className="card bg-base-100  w-auto shadow-xl relative">
          <div
            className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-greenish ${
              isLiked ? "text-red-500" : "text-white"
            }`}
            onClick={handelLikeClicked}
          >
            <FaHeart className="h-5 w-5 " />
          </div>
          {/* <Link to={`/menu/${item._id}`}> */}
          <figure>
            <img
              src={item.image}
              alt="Dish"
              className={`transition-all duration-200 md:h-72 ${
                scaleEffect ? "hover:scale-105" : ""
              }`}
            />
          </figure>
          {/* </Link> */}
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>Description Of the Item</p>
            <div className="card-actions justify-between items-center">
              <h5 className="font-semibold">
                <span className="text-sm text-red-500">$</span>
                {item.price}
              </h5>

              <button
                className="btn text-white bg-greenish"
                onClick={() => handelAddtoCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
