
<template>
  <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div v-show="visible" class="xs-dialog__wrapper" @click.self="handleWrapperClick">
      <div
        role="dialog"
        :class="['xs-dialog', { 'is-fullscreen': fullscreen, 'xs-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style"
      >
        <div class="xs-dialog__header">
          <slot name="title">
            <span class="xs-dialog__title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="xs-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose"
          >
            <i class="xs-dialog__close xs-icon xs-icon-close"></i>
          </button>
        </div>
        <div class="xs-dialog__body" v-if="rendered">
          <slot></slot>
        </div>
        <div class="xs-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "XsDialog",
  data() {
    return {
      closed: false
    };
  },
  props: {
    fullscreen: Boolean,
    modal: {
      type: Boolean,
      default: true
    },
    top: {
      type: String,
      // default: "15vh"
    },
    showClose: {
      type: Boolean,
      default: true
    },
    rendered: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    width: String,
    visible: Boolean
  },
  computed: {
    style() {
      let style = {};
      if (!this.fullscreen) {
        style.marginTop = this.top;
        if (this.width) {
          style.width = this.width;
        }
      }
      return style;
    }
  },
  methods: {
    handleWrapperClick() {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose() {
      if (typeof this.beforeClose === "function") {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit("update:visible", false);
        this.$emit("close");
        this.closed = true;
      }
    },
    afterEnter() {
      this.$emit("opened");
    },
    afterLeave() {
      this.$emit("closed");
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        // this.$emit("open");
        // this.$el.addEventListener("scroll", this.updatePopper);
        // this.$nextTick(() => {
        //   this.$refs.dialog.scrollTop = 0;
        // });
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        // this.$el.removeEventListener("scroll", this.updatePopper);
        // if (!this.closed) this.$emit("close");
        // if (this.destroyOnClose) {
        //   this.$nextTick(() => {
        //     this.key++;
        //   });
        // }
      }
    }
  },
  mounted() {
    if (this.visible) {
      this.rendered = true;
      // this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>

<style lang="less" scoped>
  .xs-dialog__wrapper {
    position: absolute;
    border: 1px solid #333333;
    top: 50%;
    left: 50%;
    background-color: #ccc;
    z-index: 99;
    transform: translate(-50%, -50%);
  }
  .xs-dialog__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .xs-dialog__title {
      padding: 4px 16px;
      display: inline-block;
    }
    .xs-dialog__headerbtn {
      position: relative;
      width: 16px;
      height: 16px;
      border: 1px solid transparent;
      margin-right: 16px;
      .xs-icon {
        &::before {
          position: absolute;
          content: '';
          width: 100%;
          height: 1px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          background-color: #999999
        }
        &::after {
          position: absolute;
          content: '';
          width: 1px;
          height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          background-color: #999999
        }
      }
    }
  }
  .xs-dialog__body {
  
  }
</style>