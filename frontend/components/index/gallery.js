import * as PhotoSwipe from "photoswipe";
import * as PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import Image from "next/image";
import "photoswipe/dist/default-skin/default-skin.css";
import "photoswipe/dist/photoswipe.css";

export default function Gallery() {
  const openPhotoSwipe = (index = 0) => {
    var pswpElement = document.querySelectorAll(".pswp")[0];
    var items = [
      {
        src: "https://source.unsplash.com/8b1cWDyvT7Y",
        w: 964,
        h: 1024,
      },
      {
        src: "https://source.unsplash.com/5VXH4RG88gc",
        w: 964,
        h: 1024,
      },
      {
        src: "https://source.unsplash.com/XtUd5SiX464",
        w: 964,
        h: 1024,
      },
      {
        src: "https://source.unsplash.com/JYGnB9gTCls",
        w: 964,
        h: 1024,
      },
      {
        src: "https://source.unsplash.com/-RBuQ2PK_L8",
        w: 964,
        h: 1024,
      },
      {
        src: "https://source.unsplash.com/P44RIGl9V54",
        w: 964,
        h: 1024,
      },
    ];

    var options = {
      index,
      history: false,
      focus: false,
      showHideOpacity: true,
      clickToCloseNonZoomable: true,
      showAnimationDuration: 0,
      hideAnimationDuration: 0,
      tapToClose: true,
      spacing: 0,
      loop: false,
      preload: [1, 3],
    };

    var gallery = new PhotoSwipe(
      pswpElement,
      PhotoSwipeUI_Default,
      items,
      options
    );
    gallery.init();
  };

  const handleGalleryView = (e) => {
    openPhotoSwipe(parseInt(e.target.id, 10));
  };
  return (
    <div className="mx-auto w-4/5 h-4/5 lg:py-24" id="home-gallery">
      <div className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl sm:leading-12 md:text-6xl text-transparent bg-gradient-to-r bg-clip-text from-orange-300 via-red-400 to-purple-400">
        <p>Some of our collections...</p>
      </div>
      <div className="grid grid-cols-6 grid-rows-9 gap-2 mx-auto mt-16 h-auto">
        <div className="w-full col-span-2 row-span-1 overflow-hidden">
          <Image
            alt=""
            src="/gallery1.jpeg"
            className="animate-fadeIn object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-2000 cursor-pointer"
            id="0"
            onClick={handleGalleryView}
            layout="responsive"
            height={500}
            width={500}
          />
        </div>
        <div className="w-full col-span-2 row-span-1 overflow-hidden">
          <Image
            alt=""
            src="/gallery2.jpeg"
            className="animate-fadeIn object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-2000 cursor-pointer"
            id="1"
            onClick={handleGalleryView}
            layout="responsive"
            height={500}
            width={500}
          />
        </div>
        <div className="w-full col-span-2 row-span-1 overflow-hidden">
          <Image
            alt=""
            src="/gallery3.jpeg"
            className="animate-fadeIn object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-2000 cursor-pointer"
            id="2"
            onClick={handleGalleryView}
            layout="responsive"
            height={500}
            width={500}
          />
        </div>
        <div className="w-full col-span-2 row-span-3 overflow-hidden">
          <Image
            alt=""
            src="/gallery4.jpeg"
            className="animate-fadeIn object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-2000 cursor-pointer"
            id="3"
            onClick={handleGalleryView}
            layout="responsive"
            height={500}
            width={500}
          />
        </div>
        <div className="w-full col-span-2 row-span-3 overflow-hidden">
          <Image
            alt=""
            src="/gallery5.jpeg"
            className="animate-fadeIn object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-2000 cursor-pointer"
            id="4"
            onClick={handleGalleryView}
            layout="responsive"
            height={500}
            width={500}
          />
        </div>
        <div className="w-full col-span-2 row-span-3 overflow-hidden">
          <Image
            alt=""
            src="/gallery6.jpeg"
            className="animate-fadeIn object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-2000 cursor-pointer"
            id="5"
            onClick={handleGalleryView}
            layout="responsive"
            height={500}
            width={500}
          />
        </div>
      </div>

      {/* <!-- Root element of PhotoSwipe. Must have class pswp. --> */}
      <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
        {/* <!-- Background of PhotoSwipe.  */}
        {/* It's a separate element, as animating opacity is faster than rgba(). --> */}
        <div className="pswp__bg"></div>

        {/* <!-- Slides wrapper with overflow:hidden. --> */}
        <div className="pswp__scroll-wrap">
          {/* <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. --> */}
          <div className="pswp__container">
            {/* <!-- don't modify these 3 pswp__item elements, data is added later on --> */}
            <div className="pswp__item"></div>
            <div className="pswp__item"></div>
            <div className="pswp__item"></div>
          </div>

          {/* <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. --> */}
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              {/* <!--  Controls. Order can be changed. --> */}

              <div className="pswp__counter"></div>

              <button
                className="pswp__button pswp__button--close"
                title="Close (Esc)"
              ></button>

              <button
                className="pswp__button pswp__button--share"
                title="Share"
              ></button>

              <button
                className="pswp__button pswp__button--fs"
                title="Toggle fullscreen"
              ></button>

              <button
                className="pswp__button pswp__button--zoom"
                title="Zoom in/out"
              ></button>

              {/* <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR --> */}
              {/* <!-- element will get class pswp__preloader--active when preloader is running --> */}
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip"></div>
            </div>

            <button
              className="pswp__button pswp__button--arrow--left"
              title="Previous (arrow left)"
            ></button>

            <button
              className="pswp__button pswp__button--arrow--right"
              title="Next (arrow right)"
            ></button>

            <div className="pswp__caption">
              <div className="pswp__caption__center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
