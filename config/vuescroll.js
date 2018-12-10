export default {
    // vuescroll
    vuescroll: {
      mode: 'native',
      // vuescroll's size(height/width) should be a percent(100%)
      // or be a number that is equal to its parentNode's width or
      // height ?
      sizeStrategy: 'percent',
      /** Whether to detect dom resize or not */
      detectResize: true,
      // pullRefresh or pushLoad is only for the slide mode...
      pullRefresh: {
        enable: false,
        tips: {
          deactive: 'Pull to Refresh',
          active: 'Release to Refresh',
          start: 'Refreshing...',
          beforeDeactive: 'Refresh Successfully!'
        }
      },
      pushLoad: {
        enable: false,
        tips: {
          deactive: 'Push to Load',
          active: 'Release to Load',
          start: 'Loading...',
          beforeDeactive: 'Load Successfully!'
        },
        auto: false,
        autoLoadDistance: 0
      },
      paging: false,
      zooming: true,
      snapping: {
        enable: false,
        width: 100,
        height: 100
      },
      /* shipped scroll options */
      scroller: {
        /*
          允许滚动出边界
          true 或者 false 或者一个数组指定哪个方向可以超出边界，可选项分别是：
          ['top','bottom','left','right']
        */
        bouncing: true,
        /** Enable locking to the main axis if user moves only slightly on one of them at start */
        locking: true,
        /** Minimum zoom level */
        minZoom: 0.5,
        /** Maximum zoom level */
        maxZoom: 3,
        /** Multiply or decrease scrolling speed **/
        speedMultiplier: 1,
        /** This configures the amount of change applied to deceleration when reaching boundaries  **/
        penetrationDeceleration: 0.03,
        /** This configures the amount of change applied to acceleration when reaching boundaries  **/
        penetrationAcceleration: 0.08,
        /** Whether call e.preventDefault event when sliding the content or not */
        preventDefault: true,
        /** Whether call preventDefault when (mouse/touch)move*/
        preventDefaultOnMove: true
      }
    },
    scrollPanel: {
      // when component mounted.. it will automatically scrolls.
      initialScrollY: false,
      initialScrollX: false,
      // feat: #11
      scrollingX: false,
      scrollingY: true,
      speed: 400,
      easing: undefined,
      // 是否有一个padding样式，样式的大小应该和rail/bar的大小是一样。
      padding: false,
      // Sometimes, the nativebar maybe on the left,
      // See https://github.com/YvesCoding/vuescroll/issues/64
      verticalNativeBarPos: 'right'
    },
    //
    rail: {
      background: '#01a99a',
      opacity: 0,
      /** Rail's size(Height/Width) , default -> 6px */
      size: '0.3rem',
      /** Specify rail and bar's border-radius, or the border-radius of rail and bar will be equal to the rail's size. default -> false **/
      specifyBorderRadius: false,
      /** Rail the distance from the two ends of the X axis and Y axis. **/
      gutterOfEnds: '0.1rem',
      /** Rail the distance from the side of container. **/
      gutterOfSide: '0.1rem',
      /** Whether to keep rail show or not, default -> false, event content height is not enough */
      keepShow: false
    },
    bar: {
      /** How long to hide bar after mouseleave, default -> 500 */
      showDelay: 3000,
      /** Whether to show bar on scrolling, default -> true */
      onlyShowBarOnScroll: true,
      /** Whether to keep show or not, default -> false */
      keepShow: false,
      /** Bar's background , default -> #00a650 */
      background: 'rgb(24, 144, 255)',
      /** Bar's opacity, default -> 1  */
      opacity: 1,
      /** Styles when you hover scrollbar, it will merge into the current style */
      hoverStyle: false
    }
  };