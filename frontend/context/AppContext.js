import { useEffect, useState, createContext } from "react";
import Cookie from "js-cookie";

const AppContext = createContext();

export const AppProvider = (props) => {
  const [cartItems, updateCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const cookieCart = JSON.parse(Cookie.get("cart"));

    if (cookieCart !== undefined) {
      let totalCount = 0;
      let totalPrice = 0;
      updateCart(cookieCart);
      cookieCart.forEach((item) => {
        totalCount += item.quantity;
        totalPrice += item.price * item.quantity;
        setTotalAmount(totalPrice);
        setTotalQuantity(totalCount);
      });
    } else {
      updateCart([]);
      setTotalAmount(0);
      setTotalQuantity(0);
    }
  }, []);

  const addItem = (item) => {
    let items = cartItems;
    let existingItem;
    if (items) existingItem = items.find((i) => i.id === item.id);

    if (!existingItem) {
      updateCart([
        ...(items || []),
        Object.assign({}, item, {
          quantity: 1,
        }),
      ]);
      setTotalAmount(totalAmount + item.price * 1);
      setTotalQuantity(totalQuantity + 1);
    } else {
      const index = items.findIndex((i) => i.id === item.id);
      items[index] = Object.assign({}, item, {
        quantity: existingItem.quantity + 1,
      });
      updateCart([...items]);
      setTotalAmount(totalAmount + existingItem.price);
      setTotalQuantity(totalQuantity + 1);
    }
    Cookie.set("cart", items, { sameSite: "None", secure: true, expires: 365 });
  };

  const removeItem = (item) => {
    let items = cartItems;
    const item_to_remove = items.find((i) => i.id === item.id);

    if (item_to_remove.quantity > 1) {
      const index = items.findIndex((i) => i.id === item.id);
      items[index] = Object.assign({}, item, {
        quantity: item_to_remove.quantity - 1,
      });
      updateCart([...items]);
      setTotalAmount(totalAmount - item.price);
      setTotalQuantity(totalQuantity - 1);
      Cookie.set("cart", items, {
        sameSite: "None",
        secure: true,
        expires: 365,
      });
    } else {
      deleteItem(item);
    }
  };

  const deleteItem = (item) => {
    let items = cartItems;
    const item_to_delete = items.find((i) => i.id === item.id);
    if (item_to_delete) {
      const index = items.findIndex((i) => i.id === item.id);
      items.splice(index, 1);
      updateCart([...(items || [])]);
      setTotalAmount(
        totalAmount - item_to_delete.price * item_to_delete.quantity
      );
      setTotalQuantity(totalQuantity - item_to_delete.quantity);
      Cookie.set("cart", items, {
        sameSite: "None",
        secure: true,
        expires: 365,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        updateCart,
        totalAmount,
        totalQuantity,
        addItem,
        removeItem,
        deleteItem,
        enableCart: true,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
