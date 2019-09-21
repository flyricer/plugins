<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <sum :num1="1" :num2="2"></sum>
    <uploader></uploader>
    <page-one></page-one>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import PageOne from "./components/pageone.vue";

export default {
  name: "app",
  data() {
    return {
      form: {
        name: "",
        email: ""
      },
      rule: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      // 调用form组件的validate方法
      this.$refs.baseForm
      .validate()
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
    },

  },
  components: {
    HelloWorld,
    PageOne
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
