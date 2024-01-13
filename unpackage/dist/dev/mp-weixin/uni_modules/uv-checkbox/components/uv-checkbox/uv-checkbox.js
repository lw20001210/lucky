"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvCheckbox_components_uvCheckbox_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-checkbox",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvCheckbox_components_uvCheckbox_props.props],
  data() {
    return {
      isChecked: false,
      // 父组件的默认值，因为头条小程序不支持在computed中使用this.parent.shape的形式
      // 故只能使用如此方法
      parentData: {
        iconSize: 12,
        labelDisabled: null,
        disabled: null,
        shape: "square",
        activeColor: null,
        inactiveColor: null,
        size: 18,
        value: null,
        modelValue: null,
        iconColor: null,
        placement: "row",
        borderBottom: false,
        iconPlacement: "left",
        labelSize: 14,
        labelColor: "#303133"
      }
    };
  },
  computed: {
    // 是否禁用，如果父组件uv-raios-group禁用的话，将会忽略子组件的配置
    elDisabled() {
      return this.disabled !== "" ? this.disabled : this.parentData.disabled !== null ? this.parentData.disabled : false;
    },
    // 是否禁用label点击
    elLabelDisabled() {
      return this.labelDisabled !== "" ? this.labelDisabled : this.parentData.labelDisabled !== null ? this.parentData.labelDisabled : false;
    },
    // 组件尺寸，对应size的值，默认值为21px
    elSize() {
      return this.size ? this.size : this.parentData.size ? this.parentData.size : 21;
    },
    // 组件的勾选图标的尺寸，默认12px
    elIconSize() {
      return this.iconSize ? this.iconSize : this.parentData.iconSize ? this.parentData.iconSize : 12;
    },
    // 组件选中激活时的颜色
    elActiveColor() {
      return this.activeColor ? this.activeColor : this.parentData.activeColor ? this.parentData.activeColor : "#2979ff";
    },
    // 组件选未中激活时的颜色
    elInactiveColor() {
      return this.inactiveColor ? this.inactiveColor : this.parentData.inactiveColor ? this.parentData.inactiveColor : "#c8c9cc";
    },
    // label的颜色
    elLabelColor() {
      return this.labelColor ? this.labelColor : this.parentData.labelColor ? this.parentData.labelColor : "#606266";
    },
    // 组件的形状
    elShape() {
      return this.shape ? this.shape : this.parentData.shape ? this.parentData.shape : "circle";
    },
    // label大小
    elLabelSize() {
      return this.$uv.addUnit(this.labelSize ? this.labelSize : this.parentData.labelSize ? this.parentData.labelSize : "15");
    },
    elIconColor() {
      const iconColor = this.iconColor ? this.iconColor : this.parentData.iconColor ? this.parentData.iconColor : "#ffffff";
      if (this.elDisabled) {
        return this.isChecked ? this.elInactiveColor : "transparent";
      } else {
        return this.isChecked ? iconColor : "transparent";
      }
    },
    iconClasses() {
      let classes = [];
      classes.push("uv-checkbox__icon-wrap--" + this.elShape);
      if (this.elDisabled) {
        classes.push("uv-checkbox__icon-wrap--disabled");
      }
      if (this.isChecked && this.elDisabled) {
        classes.push("uv-checkbox__icon-wrap--disabled--checked");
      }
      return classes;
    },
    iconWrapStyle() {
      const style = {};
      style.backgroundColor = this.isChecked && !this.elDisabled ? this.elActiveColor : "#ffffff";
      style.borderColor = this.isChecked && !this.elDisabled ? this.elActiveColor : this.elInactiveColor;
      style.width = this.$uv.addUnit(this.elSize);
      style.height = this.$uv.addUnit(this.elSize);
      if (this.parentData.iconPlacement === "right") {
        style.marginRight = 0;
      }
      return style;
    },
    checkboxStyle() {
      const style = {};
      if (this.parentData.borderBottom && this.parentData.placement === "row") {
        this.$uv.error("检测到您将borderBottom设置为true，需要同时将uv-checkbox-group的placement设置为column才有效");
      }
      if (this.parentData.borderBottom && this.parentData.placement === "column") {
        style.paddingBottom = "8px";
      }
      return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.updateParentData();
      if (!this.parent) {
        this.$uv.error("uv-checkbox必须搭配uv-checkbox-group组件使用");
      }
      this.$nextTick(() => {
        let parentValue = [];
        if (this.parentData.value.length) {
          parentValue = this.parentData.value;
        } else if (this.parentData.modelValue.length) {
          parentValue = this.parentData.modelValue;
        }
        if (this.checked) {
          this.isChecked = true;
        } else if (this.$uv.test.array(parentValue)) {
          this.isChecked = parentValue.some((item) => {
            return item === this.name;
          });
        }
      });
    },
    updateParentData() {
      this.getParentData("uv-checkbox-group");
    },
    // 横向两端排列时，点击组件即可触发选中事件
    wrapperClickHandler(e) {
      this.parentData.iconPlacement === "right" && this.iconClickHandler(e);
    },
    // 点击图标
    iconClickHandler(e) {
      this.preventEvent(e);
      if (!this.elDisabled) {
        this.setRadioCheckedStatus();
      }
    },
    // 点击label
    labelClickHandler(e) {
      this.preventEvent(e);
      if (!this.elLabelDisabled && !this.elDisabled) {
        this.setRadioCheckedStatus();
      }
    },
    emitEvent() {
      this.$emit("change", this.isChecked);
      this.$nextTick(() => {
        this.$uv.formValidate(this, "change");
      });
    },
    // 改变组件选中状态
    // 这里的改变的依据是，更改本组件的checked值为true，同时通过父组件遍历所有uv-checkbox实例
    // 将本组件外的其他uv-checkbox的checked都设置为false(都被取消选中状态)，因而只剩下一个为选中状态
    setRadioCheckedStatus() {
      this.isChecked = !this.isChecked;
      this.emitEvent();
      typeof this.parent.unCheckedOther === "function" && this.parent.unCheckedOther(this);
    }
  },
  watch: {
    checked() {
      this.isChecked = this.checked;
    }
  }
};
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  _easycom_uv_icon2();
}
const _easycom_uv_icon = () => "../../../uv-icon/components/uv-icon/uv-icon.js";
if (!Math) {
  _easycom_uv_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      name: "checkbox-mark",
      size: $options.elIconSize,
      color: $options.elIconColor
    }),
    b: common_vendor.o((...args) => $options.iconClickHandler && $options.iconClickHandler(...args)),
    c: common_vendor.n($options.iconClasses),
    d: common_vendor.s($options.iconWrapStyle),
    e: common_vendor.t(_ctx.label),
    f: $options.elDisabled ? $options.elInactiveColor : $options.elLabelColor,
    g: $options.elLabelSize,
    h: $options.elLabelSize,
    i: common_vendor.o((...args) => $options.labelClickHandler && $options.labelClickHandler(...args)),
    j: common_vendor.s($options.checkboxStyle),
    k: common_vendor.o((...args) => $options.wrapperClickHandler && $options.wrapperClickHandler(...args)),
    l: common_vendor.n(`uv-checkbox-label--${$data.parentData.iconPlacement}`),
    m: common_vendor.n($data.parentData.borderBottom && $data.parentData.placement === "column" && "uv-border-bottom")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a311a468"], ["__file", "D:/uniapp毕设/lucky/uni_modules/uv-checkbox/components/uv-checkbox/uv-checkbox.vue"]]);
wx.createComponent(Component);
