import XsFormItem from '../form/src/form-item';

/* istanbul ignore next */
XsFormItem.install = function(Vue) {
  Vue.component(XsFormItem.name, XsFormItem);
};

export default XsFormItem;