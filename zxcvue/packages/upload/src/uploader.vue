<template>
  <form action="">
    <div class="upload-group">
      <p class="help-block">(建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M，最多可上传4张)</p>
      <p class="warning" v-show='showwarning'>*{{warningtext}}</p>
      <transition name="fade">
        <p class="warning" v-show='success'>上传成功</p>
      </transition>
      <div class="upload-content">
        <ul class="upload-imgs">
          <li v-for="(item, index) in imglist" :key="item.id" @mouseenter="showbox(item)" @mouseleave="hidebox(item)">
            <img :src="getObjectURL(item)" />
            <div class="imgbox" v-show="item.active">
              <div class="iconbox">
                <span class="imgcoin imgview" @click="imgView(item)">X</span>
                <span class="imgcoin imgremove" @click="imgRemove(index)">X</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="upload-inputbox">
          <form>
            <label for="fileinp"></label>
            <input
              type="file"
              class="upload"
              id="fileinp"
              @change="addImg"
              ref="inputer"
              multiple
              accept="image/png, image/jpeg, image/gif, image/jpg"
            />
            <i class="upload-icon"></i>
            <input type="submit" value="提交">
          </form>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Uploader',
  data() {
    return {
      formData: new FormData(),
      imglist: [],
      imgLen: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      num: 0,
      showwarning: false,
      warningtext: '',
      success: false
    };
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
        this.imglist.push(img)
      }
      this.showwarning = false;
      this.warningtext = "";
      this.success = true;
          setTimeout(() => {
            this.success = false
          },2000)
    },
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
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    imgRemove(index) {
      // this.$delete(this.imglist, index);
      this.imglist.splice(index, 1)
      this.$refs.inputer.value = null
    },
    showbox(item) {
      var _this=this;
        this.$nextTick(function () {
          this.imglist.forEach(function (item) {
            _this.$set(item,'active',false);
          });
          this.$set(item,'active',true);
        });
    },
    hidebox(item) {
      this.$set(item, 'active', false)
    },
    submit() {
      for (let key of this.imglist) {
        let name = key.split("?")[0];
        this.formData.append("multipartFiles", Object.values(key), name);
      }
      this.$http
        .post("/opinion/feedback", this.formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          this.success = true;
          setTimeout(() => {
            this.success = false
          },2000)
        });
    }
  }
};
</script>

<style lang='less' scoped>
.upload-group {
  border: 1px solid #999999
}
.upload-content {
  padding: 10px;
  text-align: left;
}
.upload-inputbox {
  position: relative;
  width: 118px;
  height: 118px;
  display: inline-block;
  border: 1px dashed #ccc;
  vertical-align: middle;
}
.upload-inputbox .upload {
    width: 118px;
    height: 118px;
    opacity: 0;
}
.upload-inputbox .upload-icon {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 50%;
  left: 50%;
  /* z-index: -1; */
  transform: translate(-50%, -50%);
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
.upload-imgs {
  vertical-align: middle;
  margin-right: 20px;
  display: inline-block;
  list-style: none;
  padding: 0px;
}
.upload-imgs li{
  border: 1px dashed #ccc;
  width: 118px;
  height: 118px;
  position: relative;
  list-style: none;
  margin-right: 10px;
  display: inline-block
}
.upload-imgs li img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.upload-imgs li .imgbox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%
}
.imgcoin {
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
.warning {
  color: red
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
