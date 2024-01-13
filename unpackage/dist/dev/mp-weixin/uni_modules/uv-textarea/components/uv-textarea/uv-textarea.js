"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvTextarea_components_uvTextarea_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-textarea",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvTextarea_components_uvTextarea_props.props],
  data() {
    return {
      // 输入框的值
      innerValue: "",
      // 是否处于获得焦点状态
      focused: false,
      // 过滤处理方法
      innerFormatter: (value) => value
    };
  },
  created() {
    this.innerValue = this.modelValue;
  },
  watch: {
    value(newVal) {
      this.innerValue = newVal;
    },
    modelValue(newVal) {
      this.innerValue = newVal;
    }
  },
  computed: {
    // 组件的类名
    textareaClass() {
      let classes = [], { border, disabled } = this;
      border === "surround" && (classes = classes.concat(["uv-border", "uv-textarea--radius"]));
      border === "bottom" && (classes = classes.concat(["uv-border-bottom", "uv-textarea--no-radius"]));
      disabled && classes.push("uv-textarea--disabled");
      return classes.join(" ");
    },
    // 组件的样式
    textareaStyle() {
      const style = {};
      return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
    },
    maxlen() {
      return this.maxlength < 0 ? this.maxlength < 0 ? -1 : 140 : this.maxlength;
    },
    getCount() {
      try {
        return this.innerValue.length > this.maxlen ? this.maxlen : this.innerValue.length;
      } catch (e) {
        return 0;
      }
    }
  },
  methods: {
    // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
    setFormatter(e) {
      this.innerFormatter = e;
    },
    onFocus(e) {
      this.$emit("focus", e);
    },
    onBlur(e) {
      this.$emit("blur", e);
      this.$uv.formValidate(this, "blur");
    },
    onLinechange(e) {
      this.$emit("linechange", e);
    },
    onInput(e) {
      let { value = "" } = e.detail || {};
      const formatter = this.formatter || this.innerFormatter;
      const formatValue = formatter(value);
      this.innerValue = value;
      this.$nextTick(() => {
        this.innerValue = formatValue;
        this.valueChange();
      });
    },
    // 内容发生变化，进行处理
    valueChange() {
      const value = this.innerValue;
      this.$nextTick(() => {
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
        this.$uv.formValidate(this, "change");
      });
    },
    onConfirm(e) {
      this.$emit("confirm", e);
    },
    onKeyboardheightchange(e) {
      this.$emit("keyboardheightchange", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.innerValue,
    b: common_vendor.s({
      height: _ctx.autoHeight ? "auto" : _ctx.$uv.addUnit(_ctx.height)
    }),
    c: common_vendor.s(_ctx.$uv.addStyle(_ctx.textStyle)),
    d: _ctx.placeholder,
    e: _ctx.$uv.addStyle(_ctx.placeholderStyle, "string"),
    f: _ctx.placeholderClass,
    g: _ctx.disabled,
    h: _ctx.focus,
    i: _ctx.autoHeight,
    j: _ctx.fixed,
    k: _ctx.cursorSpacing,
    l: _ctx.cursor,
    m: _ctx.showConfirmBar,
    n: _ctx.selectionStart,
    o: _ctx.selectionEnd,
    p: _ctx.adjustPosition,
    q: _ctx.disableDefaultPadding,
    r: _ctx.holdKeyboard,
    s: $options.maxlen,
    t: _ctx.confirmType,
    v: _ctx.ignoreCompositionEvent,
    w: _ctx.confirmHold,
    x: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    y: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args)),
    z: common_vendor.o((...args) => $options.onLinechange && $options.onLinechange(...args)),
    A: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    B: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args)),
    C: common_vendor.o((...args) => $options.onKeyboardheightchange && $options.onKeyboardheightchange(...args)),
    D: _ctx.count && $options.maxlen != -1
  }, _ctx.count && $options.maxlen != -1 ? {
    E: common_vendor.t($options.getCount),
    F: common_vendor.t($options.maxlen),
    G: common_vendor.s({
      "background-color": _ctx.disabled ? "transparent" : "#fff"
    }),
    H: common_vendor.s(_ctx.$uv.addStyle(_ctx.countStyle))
  } : {}, {
    I: common_vendor.n($options.textareaClass),
    J: common_vendor.s($options.textareaStyle)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d5a7e73a"], ["__file", "D:/uniapp毕设/lucky/uni_modules/uv-textarea/components/uv-textarea/uv-textarea.vue"]]);
wx.createComponent(Component);
