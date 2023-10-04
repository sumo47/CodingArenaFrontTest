import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";


function Cart() {
	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState(0);
	const [formData, setformData] = useState({
		email: "",
		password: "",
	  });
	  const [loggedIn, setLoggedIn] = useState(false);
	
	

	useEffect(() => {
		// Fetch the list of courses in the cart from your API
		axios
			.get("https://coding-arena-backend.glitch.me/cart")
			.then((response) => {
				setCart(response.data);

				// Calculate the total when the cart data is fetched
				const cartTotal = response.data.reduce(
					(acc, course) => acc + course.price,
					0
				);
				setTotal(cartTotal);
			})
			.catch((error) => {
				console.error("Error fetching cart data:", error);
			});
			
		
	}, []);

	
	const removeFromCart = async (courseId) => {
		try {
			// Make an API request to remove the course from the backend
			await axios.delete(`https://coding-arena-backend.glitch.me/cart/remove/${courseId}`);

			// After successful removal from the backend, update the cart on the frontend
			setCart((prevCart) => {
				// Filter out the removed item
				const updatedCart = prevCart.filter((course) => course.id !== courseId);

				// Recalculate the total based on the updatedCart
				const cartTotal = updatedCart.reduce(
					(acc, course) => acc + course.price,
					0
				);

				// Update the total
				setTotal(cartTotal);

				return updatedCart;
			});
		} catch (error) {
			console.error("Error removing course from cart:", error);
		}
	};

	const navigate = useNavigate();

	const navigatecourses = () => {
		navigate("/courselist");
	};

	const navigatecheckout = () => {
		// Check if the user is authenticated (token is available)
		const token = localStorage.getItem('jwtToken');
	
		if (token) {
		  // User is logged in; navigate to the checkout page
		  navigate("/checkout");
		} else {
		  // User is not logged in; display a message or open the login popup
		  // Here, you can set a state variable to show a login popup or display a message to the user
		  alert("Please log in to continue to checkout.");
		}
	  };



	return (
		<div>
			<h1
				style={{
					fontSize: "33px",
					color: "#a11afe",
					fontWeight: "800",
					marginTop: "35px",
					marginLeft: "70px",
				}}>
					
				Shopping Cart
			</h1>
			<div className='flex mt-2'>
				{/* cart section */}

				<div className='flex flex-col  p-4  ' style={{ marginLeft: "40px" ,width:'650px'}}>
				
					<ul className='flex flex-col divide-y divide-gray-700'>
						
						{cart.length === 0 ? (
							<p>Your cart is empty.</p>
						) : (
							<div>
								{cart.map((course) => (
									<CartItem
										key={course.id}
										price={course.price}
										course={course}
										removeFromCart={removeFromCart}
										
									/>
								))}
							</div>
						)}
					</ul>

					<div className='flex justify space-x-4 my-3'>
						<button
							type='button'
							className='px-6 py-2 border rounded-md '
							style={{
								backgroundColor: "#f5ac82",
								color: "white",
								fontSize: "18px",
							}}
							onClick={navigatecourses}>
							Back to Shop
						</button>

						<button
							type='button'
							className='px-6 py-2 border rounded-md '
							style={{
								backgroundColor: "#a11afe",
								color: "white",
								fontSize: "18px",
							}}
							onClick={navigatecheckout}>
							Continue to Checkout
						</button>
					</div>
				</div>

				{/* order item section */}
				<div class='flex flex-col  p-4 ' style={{ marginLeft: "120px" }}>
					<div class='container mx-auto'>
						<div class='bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-left'>
							<div class='text-gray-700 font-bold py-1'>Total: ₹ {total} </div>

							<div class='text-gray-600 py-1'>Original Price ₹ {total}</div>
							
							<div classname='text-600'>
							<i class="fa-solid fa-check"></i>
								COUPON123 is Applied </div>

							<div class='mt-4 flex items-center'>
								<input
									class='w-full px-3 py-2 border rounded-l-lg'
									type='text'
									placeholder='Enter Coupon'
								/>
								<button
									class='px-4 py-2 rounded-r-lg flex-shrink-0'
									style={{
										backgroundColor: "#a11afe",
										color: "white",
										fontSize: "18px",
									}}>
									Apply Coupon
								</button>
							</div>

							<button
								class='w-full mt-4 px-4 py-2 rounded-lg'
								style={{
									backgroundColor: "#a11afe",
									color: "white",
									fontSize: "18px",
								}}
								onClick={navigatecheckout}>
								Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
			

		</div>
	);

	
}

export default Cart;
