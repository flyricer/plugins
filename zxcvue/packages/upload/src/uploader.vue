<template>
  <form :action="action">
    <div class="xs-upload-group">
      <span class="xs-upload-tips">{{uploadtips}}</span>
      <div class="xs-upload-content">
        <!-- <ul class="xs-upload-imglist">
          <li v-for="(item, index) in imglist" :key="item.id" @mouseenter="showbox(item)" @mouseleave="hidebox(item)">
            <img :src="getObjectURL(item)" />
            <div class="img-shadebox" v-show="item.active">
              <div class="iconbox">
                <span class="shadeicon" @click="imgView(item)">X</span>
                <span class="shadeicon" @click="imgRemove(index)">X</span>
              </div>
            </div>
          </li>
        </ul> -->
        <slot :imglist='imglist'></slot>
        <div class="xs-upload-inputbox">
          <form>
            <label for="fileinp"></label>
            <input
              type="file"
              class="xs-upload-input"
              id="fileinp"
              @change="addImg"
              ref="inputer"
              :multiple='multiple'
              accept="image/png, image/jpeg, image/gif, image/jpg"
            />
            <i class="upload-icon"></i>
          </form>
        </div>
      </div>
      <span class="img-warning" v-show='showwarning'>{{warningtext}}</span>
      <button class="submit-btn" @click.prevent="submit">提交</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'XsUploader',
  data() {
    return {
      formData: new FormData(),
      imglist: [],
      num: 0,
      success: false,
      dialogImageUrl: '',
      dialogVisible: false,
      showwarning: false,
      warningtext: '',
    };
  },
  props: {
    action: String,
    uploadtips: String,
    multiple: String,
    needtips: Boolean
  },
  methods: {
    addImg() {
      let inputDOM = this.$refs.inputer;
      let img = {}
      this.fil = inputDOM.files;
      let len = this.fil.length;
      if (len > 4) {
        this.showwarning = true;
        this.warningtext = "一次最多可上传4张图片";
        return false;
      }
      for (let i = 0; i < len; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        if (size > 5 * 1024 * 1024) {
          this.showwarning = true;
          this.warningtext = "单张图片不能大于5M！";
          return false;
        }
        this.$set(
          img,
          this.fil[i].name + "?" + new Date().getTime() + i,
          this.fil[i]
        );
        this.$set(
          img,
          'id',
          ++this.num
        );
        this.$set(
          img,
          'active',
          false
        );
        this.imglist.push(img)
        img = {}
      }
      // console.log(this.imglist)
      this.showwarning = false;
      this.warningtext = "";
    },
    // getObjectURL(file) {
    //   var url = null;
    //   if (window.createObjectURL != undefined) {
    //     // basic
    //     url = window.createObjectURL(Object.values(file)[0]);
    //   } else if (window.URL != undefined) {
    //     // mozilla(firefox)
    //     url = window.URL.createObjectURL(Object.values(file)[0]);
    //   } else if (window.webkitURL != undefined) {
    //     // webkit or chrome
    //     url = window.webkitURL.createObjectURL(Object.values(file)[0]);
    //   }
    //   return url;
    // },
    // imgView(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    // imgRemove(index) {
    //   this.$delete(this.imglist, index);
    //   // this.imglist.splice(index, 1)
    //   this.$refs.inputer.value = null
    // },
    // showbox(item) {
    //   var _this=this;
    //     this.$nextTick(function () {
    //       this.imglist.forEach(function (item) {
    //         _this.$set(item,'active',false);
    //       });
    //       this.$set(item,'active',true);
    //     });
    // },
    // hidebox(item) {
    //   this.$set(item, 'active', false)
    // },
    // updated() {
    //   console.log(this.imglist)
    // },
    submit(event) {
      // console.log(this.imglist)
      // event.preventDefault();
      for (let file of this.imglist) {
        let name = Object.keys(file)[0].split("?")[0];
        this.formData.append("multipartFiles", Object.values(file)[0], name); 
      }
      console.log('success')
      // this.$http
      //   .post(this.action, this.formData, {
      //     headers: { "Content-Type": "multipart/form-data" }
      //   })
      //   .then(res => {
      //     this.success = true;
      //     setTimeout(() => {
      //       this.success = false
      //     },2000)
      //   });
    }
  }
};
</script>

<style lang='less' scoped>
.xs-upload-group {
  border: 1px solid #999999
}
.xs-upload-tips {
  font-size: 14px;
  margin-left: 30px;
}
.xs-upload-content {
  padding: 10px;
  position: relative;
}
.xs-upload-inputbox {
  position: relative;
  width: 118px;
  height: 118px;
  display: inline-block;
  border: 1px dashed #ccc;
  vertical-align: middle;
  .xs-upload-input {
      width: 118px;
      height: 118px;
      opacity: 0;
  }
  .upload-icon {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 50%;
    left: 50%;
    z-index: -1;
    transform: translate(-50%, -50%);
  }
}
.upload-icon::before {
  position: absolute;
  content: '';
  width: 30px;
  height: 1px;
  top: 50%;
  left: 0;
  background-color: #cccccc;
}
.upload-icon::after {
  position: absolute;
  left: 50%;
  content: '';
  width: 1px;
  height: 30px;
  background-color: #cccccc
}
// .xs-upload-imglist {
//   vertical-align: middle;
//   margin-left: 20px;
//   display: inline-block;
//   list-style: none;
//   padding: 0px;
// }
// .xs-upload-imglist li{
//   border: 1px dashed #ccc;
//   width: 118px;
//   height: 118px;
//   position: relative;
//   list-style: none;
//   margin-right: 10px;
//   display: inline-block
// }
// .xs-upload-imglist li img {
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// }
// .xs-upload-imglist li .img-shadebox {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%
// }
// .shadeicon {
//   flex: auto;
//   color: #ffffff
// }
// .iconbox {
//   display: flex;
//   justify-content: center;
//   text-align: center;
//   align-items: center;
//   height: 100%;
//   background: #333;
//   opacity: .5;
// }
.img-warning {
  color: red;
  font-size: 14px;
  margin-left: 30px;
  display: block
}
.submit-btn {
  margin: 4px 10px;
  position: relative;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
