<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="justify-content-center mx-auto">
      <CCol md="8">
        <CCardGroup>
          <CCard class="p-4">
            <CCardBody>
              <CForm>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <CInput
                  placeholder="Email"
                  autocomplete="username email"
                  v-model="email"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                  v-model="password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol col="6">
                    <CButton  color="primary" type="submit" :disabled="getLogInState.initial" @click="login" class="px-4">Login</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard
            color="primary"
            text-color="white"
            class="text-center py-5 d-md-down-none"
            style="width:44%"
            body-wrapper
          >
            <h2>WEB VISUALIZATION TOOL</h2>
            <p>Evaluating a Web Visualization Tool in the Assessment of the Effectiveness of TESDA Programs in Davao Oriental</p>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
    }
  },
  computed: {
    ...mapGetters([
      "getLogInState",
      "getErrorMessage",
    ])
  },
  watch: {
    getLogInState({ initial, success, fail }) {
      if(fail) {
        this.$swal(
        'Oh No',this.getErrorMessage,'error')
      }
    }
  },
  methods: {
    ...mapActions([
      "authenticate"
    ]),
    login() {
      const data = {
        email: this.email,
        password: this.password
      }
      this.authenticate(data)
    }
  }
}
</script>
