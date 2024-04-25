
import { useState, useEffect } from "react";
import Item from "./cartitem";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState([]);
  const [ctotal, setCtotal] = useState(null);
  const [refr, setRef] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch("http://localhost:5003/getcart/" + localStorage.user);
        if (!res.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const json = await res.json();
        setItems([...json]);
        let temp = 0;
        for (const i of json) {
          const res = await fetch("http://localhost:5002/getproduct/" + i.product);
          if (!res.ok) {
            throw new Error("Failed to fetch product");
          }
          const jsonp = await res.json();
          temp = temp + jsonp.price * i.quantity;
        }
        setCtotal(temp);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("");
      }
    };

    getItems();
  }, [refr]);

  const checkout = async () => {
    const user = localStorage.user;
    const res = await fetch("http://localhost:5003/buy", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ user, ctotal }),
    });
    if (res.ok) {
      alert("Successfully placed order");
      nav("/order/" + localStorage.user);
    }
  };

  return (
    <div>
      <section class="text-gray-600 body-font w-full">
        <div class="container px-5 py-2 mx-auto w-full">
          <div class="flex flex-col text-center w-full mb-5">
            <h1 class="text-2xl font-medium title-font text-gray-900 tracking-widest">YOUR CART</h1>
          </div>
          <div class="grid grid-flow-row gap-4  items-center ">
            {error ? <p>{error}</p> : items.map((n) => (
              <Item key={n.product} id={n.product} quan={n.quantity} setr={setRef} r={refr} />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-around mt-4 bg-slate-200 p-4 rounded-lg">
            <h1 className="text-black font-semibold text-2xl">Cart total - Rs {ctotal}</h1>
            <button className="bg-blue-500 p-2 text-xl rounded-lg text-white" onClick={checkout}>Checkout</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
