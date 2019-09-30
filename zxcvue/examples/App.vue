<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <xs-sum :num1="1" :num2="2"></xs-sum>
    <xs-uploader
      action=''
      :uploadtips='uploadtips'
      multiple='multiple'>
      <template v-slot:default="{imglist}">
        <ul class="xs-upload-imglist">
          <li v-for="(item, index) in imglist" :key="item.id" @mouseenter="showbox(item)" @mouseleave="hidebox(item)">
            <img :src="getObjectURL(item)" />
            <div class="img-shadebox" v-show="item.active">
              <div class="iconbox">
                <span class="shadeicon" @click="imgView(item)">X</span>
                <span class="shadeicon" @click="imgRemove(imglist, index)">X</span>
              </div>
            </div>
          </li>
        </ul>
      <xs-dialog title="提示" :visible.sync="dialogVisible">
        <img class="dialogimg" width='100%' :src="dialogImageUrl" alt="" />
      </xs-dialog>
      </template>
    </xs-uploader>
    <hr>
    <xs-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <xs-form-item label='邮箱' prop="email">
        <xs-input v-model="ruleForm.email"></xs-input>
      </xs-form-item>
      <xs-form-item label='用户名' prop="name">
        <xs-input v-model="ruleForm.name"></xs-input>
      </xs-form-item>
      <xs-form-item label='密码' prop="password">
        <xs-input type='password' v-model="ruleForm.password"></xs-input>
      </xs-form-item>
      <xs-form-item>
        <xs-button @click.prevent="submitForm('ruleForm')">提交</xs-button>
      </xs-form-item>
    </xs-form>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
// import PageOne from "./components/pageone.vue";

export default {
  name: "app",
  data() {
    return {
      uploadtips: '建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M，一次最多可上传4张',
      dialogVisible: false,
      dialogImageUrl: '',
      ruleForm: {
        name: '',
        password: '',
        email: '',
      },
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [
          { required: true, min: 6, message: "密码至少6位", trigger: 'blur' },
          // { min: 6, message: '密码不能少于6位', trigger: 'blur'}
        ],
      email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
      ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //uploader
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(Object.values(file)[0]);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(Object.values(file)[0]);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(Object.values(file)[0]);
      }
      return url;
    },
    imgView(file) {
      this.dialogImageUrl = this.getObjectURL(file);
      console.log(this.dialogImageUrl)
      this.dialogVisible = true;
      console.log(this.dialogVisible)
    },
    imgRemove(imglist, index) {
      this.$delete(imglist, index);
      // this.$delete(this.imglist, index);
      // this.$refs.inputer.value = null
    },
    showbox(item) {
      this.$set(item,'active',true);
    },
    hidebox(item) {
      this.$set(item, 'active', false)
    },
  },
  mounted() {
    // this.$on('test', function() {
    //   console.log('test')
    // })
  },
  components: {
    HelloWorld,
    // PageOne
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
.xs-upload-imglist {
  vertical-align: middle;
  margin-left: 20px;
  display: inline-block;
  list-style: none;
  padding: 0px;
}
.xs-upload-imglist li{
  border: 1px dashed #ccc;
  width: 118px;
  height: 118px;
  position: relative;
  list-style: none;
  margin-right: 10px;
  display: inline-block
}
.xs-upload-imglist li img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.xs-upload-imglist li .img-shadebox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%
}
.shadeicon {
  flex: auto;
  color: #ffffff
}
.iconbox {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 100%;
  background: #333;
  opacity: .5;
}
.dialogimg {
  display: block;
  object-fit: cover
}
</style>
