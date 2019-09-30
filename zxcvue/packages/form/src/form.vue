<template>
  <div>
    <form class="xs-form">
      <slot></slot>
    </form>
  </div>
</template>

<script>
// import AsyncValidator from "async-validator";

export default {
  name: "XsForm",
  componentName: "XsForm",
  props: {
    model: Object,
    rules: Object
  },
  data() {
    return {
      fields: []
      // formError: {}
    };
  },
  created() {
    this.$on("form.addField", field => {
      // console.log(field.prop);
      if (field) {
        this.fields.push(field);
      }
      // console.log(this.fields);
    });
    // this.$on("form.removeField", field => {
    //   if (field) {
    //     this.fields = this.fields.filter(({ prop }) => prop !== field.prop);
    //   }
    // });
  },
  updated() {
    // console.log(this.formValues)
    // console.log(this.formRules)
    // console.log(this.formError)
  },
  methods: {
    validate(callback) {
      // if (!this.model) {
      //   console.warn(
      //     "[Element Warn][Form]model is required for validate to work!"
      //   );
      //   return;
      // }
      // let promise;
      // // if no callback, return promise
      // if (typeof callback !== "function" && window.Promise) {
      //   promise = new window.Promise((resolve, reject) => {
      //     callback = function(valid) {
      //       valid ? resolve(valid) : reject(valid);
      //     };
      //   });
      // }
      let valid = true;
      // let count = 0;
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      // if (this.fields.length === 0 && callback) {
      //   callback(true);
      // }
      // let invalidFields = {};
      this.fields.forEach(field => {
        // console.log(field.name)
        field.validate("", (message, field) => {
          if (message) {
            valid = false;
          }
          // invalidFields = objectAssign({}, invalidFields, field);
          // if (
          //   typeof callback === "function" &&
          //   ++count === this.fields.length
          // ) {
            // callback(valid, invalidFields);
            callback(valid);
          // }
        });
      });
      // if (promise) {
      //   return promise;
      // }
    }
  },
  computed: {
    // formRules() {
    //   const descriptor = {};
    //   this.fields.forEach(({ prop }) => {
    //     descriptor[prop] = this.rules[prop];
    //   });
    //   return descriptor;
    // },
    // formValues() {
    //   return this.fields.reduce((data, { prop }) => {
    //     data[prop] = this.model[prop];
    //     return data;
    //   }, {});
    // }
  }
};
</script>

<style lang="less" scoped>
  .xs-form {
    
  }
</style>