import { BaseBtn, BaseBtnGroup } from './buttons/base-buttons'
import { BaseCheckbox } from './checkbox/base-checkbox'
import { BaseExpansionItem } from './expansion-item/base-expansion-item'
import { BaseSearchInput } from './search-input/base-search-input'

declare module 'vue' {
    /**
     * Typing 全局组件
     * @see https://github.com/johnsoncodehk/volar/tree/master/extensions/vscode-vue-language-features#usage
     */
    export interface GlobalComponents {
        // buttons
        BaseBtn: typeof BaseBtn
        BaseBtnGroup: typeof BaseBtnGroup

        // inputs
        BaseCheckbox: typeof BaseCheckbox
        BaseSearchInput: typeof BaseSearchInput

        // expansion
        BaseExpansionItem: typeof BaseExpansionItem
    }
}

export {}
