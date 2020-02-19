<template>
  <div class="c-app">
    <TheSidebar/>
    <div class="c-wrapper">
      <TheHeader/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
      <TheFooter/>
    </div>
    <b-modal okTitle="Save" v-model="showPassModal" title="Update Password" size="md" ref="userModal">
      <b-form @submit.stop.prevent="onSubmit">
        <b-row>
          <b-col lg="12">
            <b-form-group
                    id="password"
                    label="Password"
                    label-for="password"
            >
              <b-form-input
                      id="lng"
                      v-model="form.password"
                      type="password"
                      required
                      placeholder="Password"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group
                    id="newpassword"
                    label="New Password"
                    label-for="newpassword"
            >
              <b-form-input
                      id="lng"
                      v-model="form.newPassword"
                      type="password"
                      required
                      placeholder="New Password"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <template slot="modal-footer">
        <b-button type="submit" :disabled="getUpdatingUserPasswordState.initial" variant="primary"  @click="onSubmit">Save</b-button>
        <b-button variant="secondary"  @click="() => showPassModal = false">Close</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  },
  data() {
    return {
      showPassModal: false,
      form: {
        password: "",
        newPassword: "",
      }
    }
  },
  computed: {
    ...mapGetters([
      "getUpdatingUserPasswordState",
      "getTokenInfo",
      "getUserErrorMessage"
    ])
  },
  watch: {
    getUpdatingUserPasswordState({ initial, success, fail}) {
      if(success) {
        this.$swal(
                'Good job!',
                'Successfully Updated a User!',
                'success'
        )
        this.showPassModal = false
        this.form.password = ""
        this.form.newPassword = ""
      }
      else if(fail){
        this.$swal(
                'Oh No!',
                this.getUserErrorMessage,
                'error'
        )
      }
    },
  },
  mounted() {
    this.$root.$on('change_pass', (e) => {
      this.showPassModal = true
    })
  },
  methods: {
    ...mapActions([
        "updateUserPassword"
    ]),
    onSubmit() {
      const data = {
        id: this.getTokenInfo.id,
        password: this.form.password,
        new_password: this.form.newPassword,
      }
      this.updateUserPassword(data)
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
