<template>
    <div>
        <CCard>
            <CCardHeader>
                <CIcon name="cil-list"/> User List
            </CCardHeader>
            <CCardBody>
                <b-row lg="12" class="mb-2 pull-right">
                    <b-col lg="12">
                        <b-button variant="primary" @click="showUserModal">Create New User</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="12">
                        <UserTable :callbackRefresh="fetchUsersDatatable"/>
                    </b-col>
                </b-row>
            </CCardBody>
        </CCard>
        <b-modal okTitle="Save" :title="title" size="md" ref="userModal">
            <b-form @submit.stop.prevent="onSubmit">
                <b-row>
                    <b-col lg="12">
                        <b-form-group
                                id="name"
                                label="Name"
                                label-for="name"
                        >
                            <b-form-input
                                    id="lng"
                                    v-model="form.name"
                                    type="text"
                                    required
                                    placeholder="Full Name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="12">
                        <b-form-group
                                id="email"
                                label="Email"
                                label-for="email"
                        >
                            <b-form-input
                                    id="email"
                                    v-model="form.email"
                                    type="text"
                                    required
                                    placeholder="Email"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-form>
            <template slot="modal-footer">
                <b-button type="submit" :disabled="getCreatingUserState.initial || getUpdatingUserState.initial" variant="primary"  @click="onSubmit">Save</b-button>
                <b-button variant="secondary"  @click="hideModal">Close</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import UserTable from './components/UserTable'
    export default {
        name: "index.vue",
        components: {
            UserTable,
        },
        data() {
            return {
                query: {},
                updateID: null,
                form: {
                    name: null,
                    email: null,
                },
                type: "create",
                title: "Add User"
            }
        },
        mounted() {
            this.$root.$on("update-user", this.updateUserModal)
            this.$root.$on("delete-user", this.deleteUserModal)
            this.$root.$on("user-query", (e) => {
                this.query = e
            })
        },
        computed: {
            ...mapGetters([
                "getCreatingUserState",
                "getUpdatingUserState",
                "getDeletingUserState",
                "getUserErrorMessage"
            ])
        },
        watch: {
            getCreatingUserState({ initial, success, fail}) {
                if(success) {
                    this.fetchUsersDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Created a User!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getUserErrorMessage,
                        'error'
                    )
                }
            },
            getUpdatingUserState({ initial, success, fail}) {
                if(success) {
                    this.updateID = null
                    this.fetchUsersDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Updated a User!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getUserErrorMessage,
                        'error'
                    )
                }
            },
            getDeletingUserState({ initial, success, fail}) {
                if(success) {
                    this.fetchUsersDatatable(this.query)
                    this.$swal(
                        'Good job!',
                        'Successfully Deleted a User!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        'Server Error!',
                        'error'
                    )
                }
            }
        },
        methods: {
            ...mapActions([
                "fetchUsersDatatable",
                "createUsers",
                "updateUsers",
                "deleteUsers"
            ]),
            updateUserModal(e) {
                this.type = "update"
                this.form = {
                    name: e.val.name,
                    email: e.val.email
                }
                this.title = "Update User"
                this.updateID = e.updateId
                this.$refs.userModal.show()
            },
            deleteUserModal (e) {
                const data = {
                    id: e.updateId
                }
                this.$swal({
                    title: 'Are you sure?',
                    text: "You want to delete this user?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.deleteUsers(data)
                    }
                })
            },
            hideModal() {
                this.$refs.userModal.hide()
            },
            onSubmit(){
                if(this.form.name == null || this.form.name == "") {
                    return this.$swal(
                        'Oh No!',
                        'Please fill in the User Name!',
                        'error'
                    )
                }
                if(this.form.email == null || this.form.email == "") {
                    return this.$swal(
                        'Oh No!',
                        'Please fill in the Email!',
                        'error'
                    )
                }
                if(this.type === "create") {
                    const data = {
                        name: this.form.name,
                        email: this.form.email
                    }
                    this.createUsers(data)
                }
                else {
                    const data = {
                        id: this.updateID,
                        name: this.form.name,
                        email: this.form.email
                    }
                    this.updateUsers(data)
                }
            },
            showUserModal() {
                this.type = "create"
                this.title = "Add User"
                this.form = {
                    name: null,
                    email: null
                }
                this.$refs.userModal.show()
            }
        }
    }
</script>

<style scoped>

</style>