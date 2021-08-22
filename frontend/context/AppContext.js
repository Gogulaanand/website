import { useEffect, useState, createContext } from "react";
import Cookie from "js-cookie";

const AppContext = createContext();

export const AppProvider = (props) => {
  const [cart, updateCart] = useState({
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
  });

  useEffect(() => {
    const cookieCart = Cookie.get("cart");

    if (cookieCart !== undefined) {
      let totalCount = 0;
      let totalPrice = 0;
      JSON.parse(cookieCart).forEach((item) => {
        totalCount += item.quantity;
        totalPrice += item.price * item.quantity;
        updateCart({
          items: JSON.parse(cookieCart),
          totalAmount: totalPrice,
          totalQuantity: totalCount,
        });
      });
    } else {
      updateCart({
        items: [],
        totalAmount: 0,
        totalQuantity: 0,
      });
    }
  }, []);

  const addItem = (item) => {
    let items = cart.items;
    let existingItem;
    if (items) existingItem = items.find((i) => i.id === item.id);

    if (!existingItem) {
      updateCart({
        items: [
          ...(items || []),
          Object.assign({}, item, {
            quantity: 1,
          }),
        ],
        totalAmount: cart.totalAmount + item.price * 1,
        totalQuantity: cart.totalQuantity + 1,
      });
    } else {
      const index = items.findIndex((i) => i.id === item.id);
      items[index] = Object.assign({}, item, {
        quantity: existingItem.quantity + 1,
      });
      updateCart({
        items,
        totalAmount: cart.totalAmount + existingItem.price,
        totalQuantity: cart.totalQuantity + 1,
      });
    }
    Cookie.set("cart", items, { sameSite: "None", secure: true, expires: 365 });
  };

  const removeItem = (item) => {
    let items = cart.items;
    const item_to_remove = items.find((i) => i.id === item.id);

    if (item_to_remove.quantity > 1) {
      const index = items.findIndex((i) => i.id === item.id);
      items[index] = Object.assign({}, item, {
        quantity: item_to_remove.quantity - 1,
      });
      updateCart({
        items,
        totalAmount: cart.totalAmount - item.price,
        totalQuantity: cart.totalQuantity - 1,
      });
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
    let items = cart.items;
    const item_to_delete = items.find((i) => i.id === item.id);
    if (item_to_delete) {
      const index = items.findIndex((i) => i.id === item.id);
      items.splice(index, 1);
      updateCart({
        items: [...(items || [])],
        totalAmount:
          cart.totalAmount - item_to_delete.price * item_to_delete.quantity,
        totalQuantity: cart.totalQuantity - item_to_delete.quantity,
      });
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
        cart,
        updateCart,
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
