import { useContext } from "react";
import { Button } from "antd";

import AuthContext from "@/context/AuthContext";

export default function UserDetails() {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <p className="my-2 mx-4 text-lg">Logged in as: {user}</p>
      <Button href="#" onClick={logoutUser} className="my-2 mx-4">
        Logout
      </Button>
    </div>
  );
}
