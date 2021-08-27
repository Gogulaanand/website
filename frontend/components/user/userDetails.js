import { useContext } from "react";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";

export default function UserDetails() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <>
      <div>
        <p className="my-2 mx-4 text-lg">Logged in as: {user}</p>
        <Link href="/" passHref>
          <a
            onClick={logoutUser}
            className="my-2 mx-4 inline-flex align-center bg-indigo-50 hover:bg-indigo-50 cursor-pointer rounded-md shadow-md text-indigo-800 hover:text-indigo-800 font-medium border border-transparent px-5 py-2"
          >
            Logout
          </a>
        </Link>
      </div>
    </>
  );
}
