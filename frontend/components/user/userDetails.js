import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function UserDetails() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div>
        <p className="my-2 mx-4 text-lg">Logged in as: {user}</p>
      </div>
    </>
  );
}
