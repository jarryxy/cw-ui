import { getCurrentPage } from '../function/common.js';

function onPageScroll(event) {
  const {
    cwPageScroller = []
  } = getCurrentPage();
  cwPageScroller.forEach(scroller => {
    if (typeof scroller === 'function') {
      // @ts-ignore
      scroller(event);
    }
  });
}

export const pageScrollMixin = scroller => ({
  page:null,
  beforeMount() {
	  const page = this.page = getCurrentPage();
    if (page.cwPageScroller && Array.isArray(page.cwPageScroller)) {
      page.cwPageScroller.push(scroller.bind(this));
    } else {
      page.cwPageScroller = typeof page.onPageScroll === 'function' ? [page.onPageScroll.bind(page), scroller.bind(this)] : [scroller.bind(this)];
    }
    page.onPageScroll = onPageScroll;
  },

  beforeDestroy() {
    let _a;
	const page = this.page
    page.cwPageScroller = ((_a = page.cwPageScroller) === null || _a === void 0 ? void 0 : _a.filter(item => item !== scroller)) || [];
  }
});