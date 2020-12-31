export default function products() {
  return (
    <div className="m-auto w-4/5 h-4/5">
      <div className="grid grid-cols-6 grid-rows-9 gap-2 mx-auto mt-32 h-auto">
        <div className="w-full col-span-2 row-span-1 overflow-hidden">
          <img
            src="https://source.unsplash.com/8b1cWDyvT7Y"
            className="object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-400 cursor-pointer"
          />
        </div>
        <div className="w-full col-span-2 row-span-1 overflow-hidden">
          <img
            src="https://source.unsplash.com/5VXH4RG88gc"
            className="object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-400 cursor-pointer"
          />
        </div>
        <div className="w-full col-span-2 row-span-1 overflow-hidden">
          <img
            src="https://source.unsplash.com/XtUd5SiX464"
            className="object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-400 cursor-pointer"
          />
        </div>
        <div className="w-full col-span-1 row-span-3 overflow-hidden">
          <img
            src="https://source.unsplash.com/JYGnB9gTCls"
            className="object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-400 cursor-pointer"
          />
        </div>
        <div className="w-full col-span-3 row-span-3 overflow-hidden">
          <img
            src="https://source.unsplash.com/-RBuQ2PK_L8"
            className="object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-400 cursor-pointer"
          />
        </div>
        <div className="w-full col-span-2 row-start-5 row-end-7 overflow-hidden">
          <img
            src="https://source.unsplash.com/P44RIGl9V54"
            className="object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
