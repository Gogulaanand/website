import dynamic from "next/dynamic";
const SvgLoading = dynamic(() => import("./SvgLoading"));
export default function Fetching() {
  return (
    <div className="mx-auto w-4/5 h-screen mt-32 flex justify-center">
      <div className="m-auto w-full h-full flex justify-center">
        <SvgLoading color={"black"} />
        <h1 className="ml-3">Fetching...</h1>
      </div>
    </div>
  );
}