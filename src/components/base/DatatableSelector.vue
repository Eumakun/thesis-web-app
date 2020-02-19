<template>
    <b-dropdown :disabled="onProcess || disable" right text="Actions" variant="primary"  class="m-1">
        <template slot="button-content">
            <slot name="header">
                <span v-if="!onProcess">Select &nbsp;&nbsp;</span>
                <span v-else><i class="fa fa-circle-o-notch fa-spin"></i> Working &nbsp;&nbsp;</span>
            </slot>
        </template>
        <b-dropdown-item v-for="(item,index) in items"
                         v-if="item.perms != null ? item.perms : true"
                         :key="index"
                         :disabled="item.disabled != null ? item.disabled : false"
                         @click="item.action()"
        >
<!--            <span > <i :class="button_icon(item.text)"></i></span>-->
            {{ item.text }}
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
    export default {
        name: 'DatatableSelector',
        props: {
            items: {
                default() {
                    return [];
                }
            },
            onProcess: {
                default() {
                    return false;
                }
            },
            disable: {
                default() {
                    return false;
                }
            }
        },
        methods: {
            /**
             * Set button icon based on the item text
             */
            button_icon(value) {
                switch(value.toLowerCase()){
                    case 'view':
                        return "fa fa-eye text-primary";
                    case 'cancel':
                        return "fa fa-ban text-danger";
                    case 'assign':
                        return "fa fa-user-plus text-success";
                    case 'finalize':
                        return "fa fa-check text-success";
                    case 'reject':
                    case 'delete':
                        return "fa fa-times text-danger";
                    case 'update':
                        return "fa fa-edit text-dark";
                    case 'work items':
                        return "fa fa-book text-primary";
                    case 'view issue':
                        return "fa fa-exclamation-triangle text-danger";
                    case 'archive':
                        return "fa fa-archive text-dark";
                    case 'close':
                        return "fa fa-lock text-dark";
                    case 'open':
                    case 're-open':
                        return "fa fa-unlock text-success";
                    default:
                        return "fa fa-circle text-dark";
                }
            }
        }
    }
</script>

<style >
    .dropdown-menu.show {
        overflow:auto
    }
</style>
