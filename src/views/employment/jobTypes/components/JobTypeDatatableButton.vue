<template>
    <div>
        <div id="form-component">
            <Selector :onProcess="updateState" :items="btns"/>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from "vuex";
    export default {
        name: "JobTypeDatatableButton",
        props: ["row"],
        data() {
            return {
                updateState: false,
                /**
                 * Datatable action button props
                 */
                btns: [
                    {
                        text: "Update",
                        action: () => this.toggleNestedComp(),
                        perms: true,
                    },
                    {
                        text: "Delete",
                        action: () => this.toggleDelete(),
                        perms: true,
                    },
                ],
            };
        },
        computed: {


        },
        watch: {
        },
        methods: {
            /**
             * Emits an event named 'updateProject' with a
             * payload @type {object}
             */
            toggleNestedComp() {
                this.$root.$emit("update-job-type", {
                    val: this.row,
                    updateId: this.row.id,
                    type: "update"
                });
            },
            /**
             * Emits an event named 'deleteProject' with a
             * payload @type {object}
             */
            toggleDelete() {
                this.$root.$emit("delete-job-type", { updateId: this.row.id });
            },
        }
    };
</script>
