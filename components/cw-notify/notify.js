import { WHITE } from '../../libs/function/color.js';

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

const Notify = function(options) {
  const context = options.context || getContext();
  const notify = context.selectComponent(options.selector);
  delete options.context;
  delete options.selector;
  if (notify) {
    notify.show(options);
    return notify;
  }

  console.warn('未找到 #cw-notify 节点，请确认 selector 及 context 是否正确');
}

Notify.clear = function (options) {
  options = Object.assign(Object.assign({}, defaultOptions), parseOptions(options));
  const context = options.context || getContext();
  const notify = context.selectComponent(options.selector);

  if (notify) {
    notify.hide();
  }
};

export default Notify