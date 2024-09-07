import React, { useContext, useState, useEffect } from "react";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../context/Authprovider";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Cart() {
  const { user } = useContext(AuthContext);
  const [cart, refetch, isLoading, isError] = useCart();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => item.price * item.quantity;

  // Handle quantity increase
  const handleIncrease = async (item) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/carts/${item._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: item.quantity + 1 }),
        }
      );

      if (response.ok) {
        const updatedItem = await response.json();
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem._id === item._id ? updatedItem.data : cartItem
          )
        );
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Handle quantity decrease
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );

        if (response.ok) {
          const updatedItem = await response.json();
          setCartItems(
            cartItems.map((cartItem) =>
              cartItem._id === item._id ? updatedItem.data : cartItem
            )
          );
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // Calculate the cart subtotal
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + calculateTotalPrice(item),
    0
  );

  // Calculate the order total
  const orderTotal = cartSubtotal;

  // Handle item deletion
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/api/v1/carts/${item._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 'Success') {
              setCartItems(
                cartItems.filter((cartItem) => cartItem._id !== item._id)
              );
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
            } 
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire("Error!", "Failed to delete the item.", "error");
          });
      }
    });
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading cart data.</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-[#FCFCFC]">
      <div className="py-12 pt-48 flex flex-col justify-center items-center space-y-10 text-center">
        <h2 className="md:text-5xl text-4xl font-bold leading-snug">
          Items Added to The
          <span className="text-greenish"> Food</span>
        </h2>
      </div>

      {/* Cart table */}
      {cartItems.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-greenish text-white rounded-sm">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="Food item" />
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="w-10 mx-2 text-center overflow-hidden appearance-none"
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>${calculateTotalPrice(item).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-ghost btn-xs text-red-500"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <p>Name: {user?.displayName || "None"}</p>
              <p>Email: {user?.email}</p>
              <p>
                User_id: <span className="text-sm">{user?.uid}</span>
              </p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Shopping Details</h3>
              <p>Total Items: {cartItems.length}</p>
              <p>
                Total Price:{" "}
                <span id="total-price">${orderTotal.toFixed(2)}</span>
              </p>
              <button className="btn btn-md bg-red-400 text-white px-8 py-1">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl mt-20 font-semibold">
          <p>Cart is empty. Please add products.</p>
          <Link to="/menu">
            <button className="btn bg-greenish rounded-full text-white font-semibold px-5 mt-4">
              Back to Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
export default Cart;
