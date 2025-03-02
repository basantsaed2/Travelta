import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../../../Redux/CartSlice";
import { useAuth } from '../../../Context/Auth';
import { Link } from "react-router-dom";
import Logo from "../../../Assets/Images/Logo.jsx";

const CartPage = () => {

    const auth = useAuth();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + Math.abs(item.price), 0);
    };

    const calculateTotalDiscount = () => {
        return cartItems.reduce((total, item) => total + Math.abs(item.DiscountPrice), 0);
    };

    // Proper subtraction and formatting
    const totalPrice = calculateTotal();
    const totalDiscountPrice = calculateTotalDiscount();  

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
    localStorage.removeItem('selectedPlanId');
  };

  
  return (
    <>
    <div className="w-full flex flex-col h-screen">
    <nav className="bg-mainColor shadow-md px-4 py-2 flex items-center justify-around">
        <div className='flex items-center space-x-4'>
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <Logo />
        </div>
        <span className="text-xl font-semibold text-white">Travelta</span>
        </div>

        {/* Sidebar Toggle Button */}
        <h1 className="text-xl font-semibold text-white">Hello, <span>{auth.user.name}</span></h1>

        </nav>
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen py-10 px-6">


        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-10">
        🛒 Your Cart
        </h1>

        {cartItems.length === 0 ? (
        <div className="bg-white p-6 sm:p-10 rounded-lg shadow-md text-center">
        <p className="text-lg sm:text-xl text-gray-600 font-medium">Your cart is empty!</p>
        <Link to="/dashboard/plans">
        <button className="mt-6 px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all">
        Continue Shopping
        </button>
        </Link>
        </div>
        ) : (
        <div className="space-y-6">
        {/* Grid Layout for Products and Promo */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Product List */}
        <div className="col-span-1 xl:col-span-1 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Product</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Price</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b border-gray-200">
                        <div className="flex items-center">
                        {/* <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-lg mr-4"
                        /> */}
                        <span className="text-lg font-medium text-gray-800">{item.name}</span>
                        </div>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-800 font-semibold">
                    {Math.abs(item.DiscountPrice ?item.DiscountPrice:item.price).toFixed(2)} EGP
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-center">
                        <button
                            onClick={() => handleRemoveItem(item)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all"
                        >
                        Remove
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* Promo Code Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            {/* <h2 className="text-xl font-bold text-gray-800 mb-4">Promo Code</h2>
            <div className="flex flex-col xl:flex-row items-center gap-4 mb-6">
            <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={applyPromoCode}
                disabled={promoApplied}
                className={`px-6 py-2 ${promoApplied ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"} text-white rounded-lg shadow-md transition-all`}
            >
                {promoApplied ? "Applied" : "Apply"}
            </button>
            </div>
            {promoApplied && (
            <p className="text-green-600 font-semibold">
                🎉 Promo code applied! You saved $.
            </p>
            )} */}
            {/* <div className="border-t pt-4"> */}
            <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-700">Total:</span>
                <span className="text-lg font-bold text-gray-800">{totalPrice} EGP</span>
            </div>
            <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-700">Discount:</span>
                <span className="text-lg font-bold text-gray-800">  {(totalPrice - totalDiscountPrice).toFixed(2)} EGP
                </span>
            </div>
            <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-700">Total After Discount:</span>
                <span className="text-lg font-bold text-gray-800">  {(totalDiscountPrice).toFixed(2)} EGP
                </span>
            </div>
            {/* </div> */}
        </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <button
            onClick={() => dispatch(clearCart())}
            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all"
            >
            Clear Cart
            </button>
            <Link to="/dashboard/checkout" state={{ cartItems, totalPrice ,totalDiscountPrice}} className="flex-1 text-center px-6 py-3 bg-mainColor text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all">
            Proceed to Checkout
            </Link>
        </div>
        </div>
        </div>
        )}
    </div>
    </div>
    </>
  );
};

export default CartPage;
