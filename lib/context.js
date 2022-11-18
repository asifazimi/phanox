import { useEffect, useState, createContext, useContext } from "react";

export const ProductContext = createContext({});

export const ProductContextProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalQuantities, setTotalQunatities] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  //   add product to cart
  const onAdd = (product, quantity) => {
    // Increase total quantity
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
  };

  return (
    <ProductContext.Provider
      value={{
        increaseQuantity,
        decreaseQuantity,
        quantity,
        onAdd,
        cartItems,
        setQuantity,
        totalQuantities,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
