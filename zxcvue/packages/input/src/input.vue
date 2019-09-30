
<template>
  <input
    :type="type"
    :class="['xs-input', {'xs-input-error': show}]"
    ref='input'
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>
<script>
export default {
  name: "XsInput",
  data() {
    return {
    };
  },
  props: {
    type: {
      type: String,
      default: "text"
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    // show: Boolean
  },
  computed: {
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== 'XsFormItem') {
        parent = parent.$parent;
      }
      return parent;
    },
    show() {
      return this.$parent.show
    }
  },
  // watch: {
  //   show() {
  //     console.log(this.show)
  //     // return this.show
  //   }
  // },
  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);
    },
    handleChange(event) {
      this.$emit("change", event.target.value);
    },
    handleFocus(event) {
      this.$parent.show = false
      this.focused = true;
      this.$emit("focus", event);
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatchEvent("formitem.blur", event.target.value);
        // this.form.$emit("formitem.blur", event.target.value);
      }
    },
    dispatchEvent(eventName, params) {
      this.form.$emit(eventName, params)
    },
  },
  updated() {
    console.log(this.show)
  },
};
</script>

<style lang="less" scoped>
  .xs-input {
    width: 100%;
    background-color: #FFF;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    &:focus {
      border-color: blue
    }
  }
  .xs-input-error {
    border-color: red
  }
</style>