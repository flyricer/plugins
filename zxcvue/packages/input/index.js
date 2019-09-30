import XsInput from './src/input';

/* istanbul ignore next */
XsInput.install = function(Vue) {
  Vue.component(XsInput.name, XsInput);
};

export default XsInput;