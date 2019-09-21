import XsForm from './src/form'

XsForm.install = function (Vue) {
    Vue.component(XsForm.name, XsForm);
};

export default XsForm;