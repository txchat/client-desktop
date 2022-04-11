/* eslint-disable */
import lang from 'quasar/lang/zh-CN.js'
import '@quasar/extras/material-icons/material-icons.css'
import { Dialog, Meta, Notify } from 'quasar'

const colors = require('theme/colors.config')

export default {
    config: {
        brand: colors,
        notify: {
            position: 'top',
            color: 'primary',
            textColor: 'white',
            icon: 'announcement',
            timeout: 2500,
        },
    },
    plugins: { Dialog, Meta, Notify },
    lang: lang,
}
