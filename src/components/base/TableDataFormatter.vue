<template>
    <span :class="customClass" :style="customStyle">{{ formatted_value }}</span>
</template>
<script>
    import { currencyNumber } from "@/utils/number-formats";
    export default {
        props: ['value'],
        data() {
            return {
                customClass: null,
                customStyle: null,
                projectStatusValues: ['pending', 'finalized'],
            }
        },
        computed: {
            formatted_value () {
                //format currency
                if(this.value == "" || this.value == null || this.value == undefined) {
                    return 'N/A'
                }
                // if(!isNaN(this.value)){
                //   return "Php. " + currencyNumber(this.value);
                // }
                //format date
                if(this.$moment(this.value, "DD/MM/YYYY", true).isValid()){
                    return this.$moment(this.value).format("LL");
                }
                return this.value;
            }
        }
    }
</script>
<style scoped>

</style>
