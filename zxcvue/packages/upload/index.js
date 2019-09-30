import XsUploader from './src/uploader'

XsUploader.install = function (Vue) {
    Vue.component(XsUploader.name, XsUploader)
}

export default XsUploader