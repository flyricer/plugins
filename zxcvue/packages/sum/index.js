import Sum from './src/main'

Sum.install = function (Vue) {
    Vue.component(Sum.name, Sum);
};

export default Sum;