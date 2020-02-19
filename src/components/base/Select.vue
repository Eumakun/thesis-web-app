<template>
    <div class="app-select">
        <b-dropdown :disabled="disabled" :text="selected ? selected.text : defaultText">
            <div v-if="search" :style="{padding:'5px',margin: 0}">
                <input v-model="searchText" type="text" class="form-control" placeholder="Search here...">
            </div>
            <b-dropdown-item
                    v-for="(option,index) in componentOptions"
                    :key="index"
                    :disabled="option.flag"
                    @click="onSelect(option)"
                    :active="selected && selected.value == option.value"
            >
                <span class="parent-desc" v-if="option.parentDesc">{{option.parentDesc}}</span>
                <br v-if="option.parentDesc">
                {{option.text || option.text}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>
<script>
    import _ from "lodash";
    export default {
        props: {
            defaultText: {
                default() {
                    return "Please select";
                }
            },
            selected: {
                default() {
                    return { value: null, text: this.defaultText };
                }
            },
            onSelect: {
                default() {
                    return () => {};
                }
            },
            options: {
                default() {
                    return [];
                }
            },
            search: {
                default() {
                    return false;
                }
            },
            disabled: {
                default() {
                    return false;
                }
            }
        },
        data() {
            return {
                componentOptions: [],
                searchText: ""
            };
        },
        mounted() {
            this.componentOptions = this.options;
        },
        computed: {},
        watch: {
            /**
             * Watches the prop options
             * @param newValue
             * **/
            options: function(newValue) {
                this.componentOptions = newValue;
            },
            /**
             * Watches the prop selected
             * @param newValue
             **/
            selected: function(newValue) {
                this.searchText = "";
            },
            /**
             * Searches the options for a specific key
             * @returns {Array}
             * @param newValue
             */
            searchText: function(newValue) {
                if (newValue == "") this.componentOptions = this.options;
                if (newValue.length < 1) return;
                this.componentOptions = _.filter(this.options, option => {
                    return option.text.toLowerCase().includes(newValue.toLowerCase());
                });
                // TODO: INCASE CODE ABOVE DOESNT WORK
                /**
                 * let arr = []
                 * this.options.forEach((e) => {
                 * console.log(e,newValue)
                 * if(e.text !== null) {
                 *   if (e.text.toLowerCase().includes(newValue.toLowerCase())) {
                 *     arr.push(e)
                 *   }
                 * }
                 * })
                 * this.componentOptions = arr
                 */
            }
        },
        methods: {}
    };
</script>
<style lang="scss">
    .app-select {
        width: 100%;
        padding:0;
        .dropdown {
            width: 100%;
            max-width: 600px;
            word-wrap: break-word;
            &.show {
                .dropdown-toggle {
                    color: #000;
                }
            }
            .dropdown-toggle {
                text-overflow: ellipsis !important;
                overflow: hidden !important;
                white-space: initial !important;
                word-wrap: break-word;
                width: 100%;
                text-align: left;
                display: flex;
                justify-content: space-between !important;
                background-color: #f8f9fa;
                border-color: #c2cfd6;
                color: #3e515b;
                &:disabled {
                    opacity: 1 !important;
                    background-color: #c2cfd6 !important;
                    border-color: #c2cfd6 !important;
                    color: #3e515b !important;
                }
                &::after {
                    margin-top: 8px;
                }
            }
            .dropdown-menu {
                width: 100%;
                max-height: 300px;
                overflow-y: auto;
                overflow-x: hidden;
                text-overflow: ellipsis !important;
                white-space: initial !important;
                word-wrap: break-word;
            }
        }

        .parent-desc {
            font-weight: bold;
            color: #2151a2;
        }

    }
</style>