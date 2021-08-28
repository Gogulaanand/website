import { useEffect, useState, createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import AuthContext from "@/context/AuthContext";
const AppContext = createContext();

export const AppProvider = (props) => {
  const [cartItems, updateCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [userCartId, setUserCartId] = useState(null);
  const [cookies, setCookie] = useCookies(["cart"]);
  const { user, getToken } = useContext(AuthContext);
  const cookieCart = cookies.cart;

  useEffect(() => {
    if (user !== null) {
      userCart();
      loadCartFromStrapi();
    }
    cartOperations();
  }, [user]);

  const calculateAmountQuantity = (items) => {
    let totalCount = 0;
    let totalPrice = 0;
    items.forEach((item) => {
      totalCount += item.quantity;
      totalPrice += item.price * item.quantity;
      setTotalAmount(totalPrice);
      setTotalQuantity(totalCount);
    });
  };

  const cartOperations = async (items) => {
    if (cookieCart !== undefined) {
      updateCart([...cookieCart]);
      calculateAmountQuantity(cookieCart);
    } else if (items) {
      updateCart([...items]);
      calculateAmountQuantity(items);
    } else {
      updateCart([]);
      setTotalAmount(0);
      setTotalQuantity(0);
    }
  };

  const userCart = async () => {
    if (user) {
      try {
        const token = await getToken();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/carts/${encodeURIComponent(
            user
          )}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.id) {
          setUserCartId(data.id);
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  };

  const loadCartFromStrapi = async () => {
    if (userCartId) {
      try {
        const token = await getToken();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/carts/${encodeURIComponent(
            userCartId
          )}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.id && data.items.length > 0) {
          cartOperations(data.items);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  const saveCartToStrapi = async () => {
    try {
      const token = await getToken();
      if (userCartId) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/carts/${encodeURIComponent(
            userCartId
          )}`,
          {
            method: "PUT",
            body: JSON.stringify({ items: cartItems, email: user }),
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
          method: "POST",
          body: JSON.stringify({ items: cartItems, email: user }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.id) setUserCartId(data.id);
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const saveCartToCookie = () => {
    setCookie("cart", cartItems, {
      path: "/",
      sameSite: "None",
      secure: true,
      maxAge: 2147483647,
    });
  };

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
    saveCartToCookie();
    saveCartToStrapi();
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
      saveCartToCookie();
      saveCartToStrapi();
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
      saveCartToCookie();
      saveCartToStrapi();
    }
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        updateCart,
        totalAmount,
        setTotalAmount,
        totalQuantity,
        setTotalQuantity,
        addItem,
        removeItem,
        deleteItem,
        enableCart: true,
        userCartId,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
