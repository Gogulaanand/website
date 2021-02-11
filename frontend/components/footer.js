export default function Footer() {
  return (
    <>
      <div className="flex-col w-screen">
        <div className="w-4/5 h-42 mx-40">
          <hr></hr>
        </div>
        <div className="w-4/5 h-42 mx-40 flex justify-between inset-x-0 bottom-0 my-6">
          <p className="my-18">&#169; 2021 Sunfabb. All rights reserved.</p>
          <div className="flex justify-center">
            <p className="pr-2">Made with</p>
            <svg className="heart" viewBox="0 0 32 29.6">
              <path
                d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
              />
            </svg>
            <p className="pl-2">in India</p>
            <style jsx>{`
              .heart {
                fill: red;
                position: relative;
                width: 20px;
              }
            `}</style>
          </div>
        </div>
      </div>
    </>
  );
}
