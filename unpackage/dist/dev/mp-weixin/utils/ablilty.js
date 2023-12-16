"use strict";
function debounce(fn, delay) {
  let t = null;
  return function(e) {
    if (t !== null) {
      clearTimeout(t);
    }
    t = setTimeout(() => {
      fn.call(this, e);
    }, delay);
  };
}
exports.debounce = debounce;
