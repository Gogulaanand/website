import * as PhotoSwipe from "photoswipe";
import * as PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";

export default function Home() {
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
    <>
      <div className="home flex justify-center h-screen">
        <div className="lg:m-72 md:m-48 sm:m-32">
          <p className="lg:text-4xl md:text-2xl sm:text-xl">Some text</p>
          <div
            className="flex-col absolute bottom-12 cursor-pointer"
            onClick={() => {
              var elem = document.getElementById("home-gallery");
              elem.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <svg
              className="animate-bounce w-6 h-6 text-amber-900 mx-auto"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
            <p className="lg:text-xl md:text-base sm:text-sm">
              Checkout products
            </p>
          </div>
        </div>
      </div>
      <div
        className="mx-auto w-4/5 h-4/5 lg:pt-32 md:pt-18 sm:pt-12"
        id="home-gallery"
      >
        <div className="text-center">
          <p>Some of our collections</p>
        </div>
        <div className="grid grid-cols-6 grid-rows-9 gap-2 mx-auto mt-32 h-auto">
          <div className="w-full col-span-2 row-span-1 overflow-hidden">
            <img
              src="https://source.unsplash.com/8b1cWDyvT7Y"
              className="object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-2000 cursor-pointer"
              id="0"
              onClick={handleGalleryView}
            />
          </div>
          <div className="w-full col-span-2 row-span-1 overflow-hidden">
            <img
              src="https://source.unsplash.com/5VXH4RG88gc"
              className="object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-2000 cursor-pointer"
              id="1"
              onClick={handleGalleryView}
            />
          </div>
          <div className="w-full col-span-2 row-span-1 overflow-hidden">
            <img
              src="https://source.unsplash.com/XtUd5SiX464"
              className="object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-2000 cursor-pointer"
              id="2"
              onClick={handleGalleryView}
            />
          </div>
          <div className="w-full col-span-1 row-span-3 overflow-hidden">
            <img
              src="https://source.unsplash.com/JYGnB9gTCls"
              className="object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-2000 cursor-pointer"
              id="3"
              onClick={handleGalleryView}
            />
          </div>
          <div className="w-full col-span-3 row-span-3 overflow-hidden">
            <img
              src="https://source.unsplash.com/-RBuQ2PK_L8"
              className="object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-2000 cursor-pointer"
              id="4"
              onClick={handleGalleryView}
            />
          </div>
          <div className="w-full col-span-2 row-start-5 row-end-7 overflow-hidden">
            <img
              src="https://source.unsplash.com/P44RIGl9V54"
              className="object-cover w-full h-full transform hover:scale-110 transition hover:ease-in-out hover:duration-2000 cursor-pointer"
              id="5"
              onClick={handleGalleryView}
            />
          </div>
        </div>

        {/* <!-- Root element of PhotoSwipe. Must have class pswp. --> */}
        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
          {/* <!-- Background of PhotoSwipe.  */}
          {/* It's a separate element, as animating opacity is faster than rgba(). --> */}
          <div class="pswp__bg"></div>

          {/* <!-- Slides wrapper with overflow:hidden. --> */}
          <div class="pswp__scroll-wrap">
            {/* <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. --> */}
            <div class="pswp__container">
              {/* <!-- don't modify these 3 pswp__item elements, data is added later on --> */}
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
            </div>

            {/* <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. --> */}
            <div class="pswp__ui pswp__ui--hidden">
              <div class="pswp__top-bar">
                {/* <!--  Controls. Order can be changed. --> */}

                <div class="pswp__counter"></div>

                <button
                  class="pswp__button pswp__button--close"
                  title="Close (Esc)"
                ></button>

                <button
                  class="pswp__button pswp__button--share"
                  title="Share"
                ></button>

                <button
                  class="pswp__button pswp__button--fs"
                  title="Toggle fullscreen"
                ></button>

                <button
                  class="pswp__button pswp__button--zoom"
                  title="Zoom in/out"
                ></button>

                {/* <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR --> */}
                {/* <!-- element will get class pswp__preloader--active when preloader is running --> */}
                <div class="pswp__preloader">
                  <div class="pswp__preloader__icn">
                    <div class="pswp__preloader__cut">
                      <div class="pswp__preloader__donut"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div>
              </div>

              <button
                class="pswp__button pswp__button--arrow--left"
                title="Previous (arrow left)"
              ></button>

              <button
                class="pswp__button pswp__button--arrow--right"
                title="Next (arrow right)"
              ></button>

              <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
