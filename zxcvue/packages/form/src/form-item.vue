<template>
  <div class="xs-form-item">
    <label class="xs-form-label" :for="prop" v-if="label">{{label}}</label>
    <div class="xs-form-slot">
      <slot></slot>
      <transition name="fade">
        <div class="xs-form-error" v-show='show'>{{ fieldError }}</div>
      </transition>
    </div>
  </div>
</template>

<script>
import AsyncValidator from "async-validator";

export default {
  name: "XsFormItem",
  componentName: "XsFormItem",
  props: {
    prop: String,
    label: String,
    // fields: Array
  },
  data() {
    return {
      show: false,
      // fields: [], // field: {prop, el}，保存 FormItem 的信息。
      formError: {},
      validateMessage: '',
    };
  },
  computed: {
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== 'XsForm') {
        parent = parent.$parent;
      }
      return parent;
    },
    model() {
      return this.form.model;
    },
    rules() {
      return this.form.rules;
    },
    fieldError() {
      if (!this.prop) {
        return "";
      }
      // const formError = this.form.formError;
      // this.show = true
      return this.formError[this.prop] || "";
    },
    formRules() {
      const descriptor = {};
      // this.fields.forEach(({ prop }) => {
        descriptor[this.prop] = this.rules[this.prop];
      // });
      return descriptor;
    },
    formValues() {
      const itemdata = {}
      // return this.fields.reduce((data, { prop }) => {
        itemdata[this.prop] = this.model[this.prop];
        return itemdata;
      // }, {});
    }
  },
  methods: {
    validate(trigger, callback) {
      const validator = new AsyncValidator(this.formRules);
      validator.validate(this.formValues, errors => {
        console.log(errors)
        let formError = {}
        if (errors && errors.length) {
          this.show = true
          errors.forEach(({ message, field }) => {
            formError[field] = message;
          });
        } else {
          formError = {};
        }
        this.formError = formError
        console.log(this.formError)
        // const errInfo = [];
        // this.fields.forEach(({ prop }) => {
        //   if (this.formError[prop]) {
        //     errInfo.push(this.formError[prop]);
        //   }
        // });
        this.validateMessage = errors ? errors[0].message : '';
        // console.log(this.validateMessage)
        callback(this.validateMessage);
      });
    },
    addValidateEvents() {
        this.$on('formitem.blur', this.onFieldBlur);
        // this.$on('el.form.change', this.onFieldChange);
    },
    onFieldBlur() {
      this.validate('blur');
    },
    // onFieldChange() {
    //   if (this.validateDisabled) {
    //     this.validateDisabled = false;
    //     return;
    //   }
    //   this.validate('change');
    // },
  },
  mounted() {
    // if (this.prop) {
    //   this.fields = [...this.fields, {
    //     prop: this.prop,
    //     el: this.$el
    //   }];
    // }
    if (this.prop) {
      this.form.$emit('form.addField', this);
    }
    this.addValidateEvents()
  },
  // beforeDestroy() {
  //   if (this.prop) {
  //     this.dispatchEvent("form.removeField", {
  //       prop: this.prop
  //     });
  //   }
  // },
  // this.$on("form.addField", field => {
  //     if (field) {
  //       this.fields = [...this.fields, field];
  //     }
  //   });
  //   this.$on("form.removeField", field => {
  //     if (field) {
  //       this.fields = this.fields.filter(({ prop }) => prop !== field.prop);
  //     }
  //   });
};
</script>

<style lang="less" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all 1s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .xs-form-item {
    display: flex;
    margin-bottom: 22px
  }
  .xs-form-label {
    width: 100px;
    text-align: right;
    line-height: 40px;
    padding-right: 10px;
  }
  .xs-form-slot {
    flex: auto;
    position: relative;
  }
  .xs-form-error {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
</style>