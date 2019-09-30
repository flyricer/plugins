
<template>
  <button
    class="xs-button"
    @click="handleClick"
  >
  <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
export default {
  name: 'XsButton',
  data() {
    return {
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
};
</script>
