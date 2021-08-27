import { useContext, useState } from "react";
import { XIcon, PlusIcon, MinusIcon } from "@heroicons/react/solid";

import AppContext from "@/context/AppContext";
export default function ItemControls(props) {
  const { addItem, removeItem, deleteItem } = useContext(AppContext);
  const [count, setcount] = useState(props.data.quantity);
  const [disableMinus, setdisableMinus] = useState(count === 1);

  return (
    <>
      <div className="flex md:px-5 ml-32 mt-7">
        <div className="flex md:justify-center top-full left-0">
          <MinusIcon
            disabled={disableMinus}
            className="w-6 h-6 text-gray-400 cursor-pointer"
            onClick={() => {
              setcount(count - 1);
              if (count - 1 === 1) setdisableMinus(true);
              removeItem({
                id: props.data.id,
                price: props.item.price,
              });
            }}
          ></MinusIcon>
          <p className="mx-4">{count}</p>
          <PlusIcon
            className="w-6 h-6 text-gray-400 cursor-pointer"
            onClick={() => {
              setcount(count + 1);
              setdisableMinus(false);
              addItem({
                id: props.data.id,
                price: props.item.price,
              });
            }}
          ></PlusIcon>
        </div>
      </div>
      <XIcon
        className="ml-24 w-6 h-6 text-gray-400 m-5 mt-7 cursor-pointer"
        onClick={() => {
          setSelected(0);
          deleteItem({ id: props.data.id });
        }}
      ></XIcon>
    </>
  );
}
