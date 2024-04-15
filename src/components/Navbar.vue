<script setup lang="ts">
import { useRouter } from 'vue-router';
import ButtonField from './fields/ButtonField.vue';

import Cookies from 'js-cookie'

const router = useRouter();

function getValues() {
  const authTokenRaw = Cookies.get('AuthToken');
  if (authTokenRaw) {
    const authToken = JSON.parse(authTokenRaw as string);

    return {
      token: authToken.body.AuthToken,
      name: authToken.name,
    }
  }
}

const auth = getValues();
const isAuthenticated = auth !== undefined;

function onClick() {
  console.log('CLICKed')
  Cookies.remove('AuthToken');
  router.push('/login');
}

</script>

<template>
  <div class="navbar">
    <span>MECÂNICA PIRAHY</span>
    <template v-if="isAuthenticated">
      <div class="buttons-container">
        <ButtonField label="SAIR" :on-click="onClick" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="sass">
.navbar
  @include shadow()
  background-color: $color-contrast
  height: 60px
  width: 100%
  color: $color-text-bright
  display: grid
  grid-template-columns: auto 1fr auto
  align-items: center

  span
    @include navbar-title()
    justify-self: start
    margin-left: 40px

    @media only screen and (max-width: $mobile-width)
      margin: auto

  .buttons-container
    display: flex
    justify-content: flex-end

</style>
