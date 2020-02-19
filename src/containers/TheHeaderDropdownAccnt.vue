<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem :disabled="getLogOutState.initial" @click="$root.$emit('change_pass')">
      <CIcon  name="cilPencil" /> Change Password
    </CDropdownItem>
    <CDropdownItem :disabled="getLogOutState.initial" @click="logOut">
      <CIcon  name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42
    }
  },
  computed: {
    ...mapGetters([
      "getLogOutState"
    ])
  },
  methods: {
    ...mapActions([
      "logout"
    ]),
    logOut() {
      this.logout()
    }
  },
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>