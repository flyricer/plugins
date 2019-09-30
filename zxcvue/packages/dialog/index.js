import XsDialog from './src/dialog';

XsDialog.install = function (Vue) {
    Vue.component(XsDialog.name, XsDialog)
};

export default XsDialog;