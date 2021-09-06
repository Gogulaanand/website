import { useSession } from "next-auth/client";

export default function UserDetails() {
  const [session] = useSession();

  return (
    <>
      <div>
        <p className="my-2 mx-4 text-lg">
          Logged in as: {session?.user?.email}
        </p>
      </div>
    </>
  );
}
