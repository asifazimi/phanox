import { useEffect, useState, createContext, useContext } from "react";
// Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProductContext = createContext({});

export const ProductContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalQuantities, setTotalQunatities] = useState(0);
  const [subtotalPrice, setSubtotalPrice] = useState(0);

  const increaseQuantity = () => {
    setQty((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  //   add product to cart
  const onAdd = (product, quantity) => {
    // Increase Price
    setSubtotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    // Increase quantity
    setTotalQunatities((prevTotal) => prevTotal + quantity);

    // Check if the product is already in the cart
    const exist = cartItems.find((item) => item.slug === product.slug);

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }

    // Success Toast
    toast.success(`${quantity} ${product.title} added!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item.slug === product.slug);
    const newCartItems = cartItems.filter((item) => item.slug !== product.slug);

    // Decrease Price
    setSubtotalPrice(
      (prevSubtotalPrice) =>
        prevSubtotalPrice - foundProduct.price * foundProduct.quantity
    );

    // Decrease quantity
    setTotalQunatities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);

    // Info Toast
    toast.info(`${product.title} removed!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <ProductContext.Provider
      value={{
        increaseQuantity,
        decreaseQuantity,
        qty,
        onAdd,
        cartItems,
        totalQuantities,
        subtotalPrice,
        onRemove,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
