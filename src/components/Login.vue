<script setup lang="ts">
import Navbar from './Navbar.vue'
import TextField from './fields/TextField.vue'
import CheckboxField from './fields/CheckboxField.vue'
import ButtonField from './fields/ButtonField.vue'

import { reactive } from 'vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

const router = useRouter();

// Route the user to the main page if they are already signed
const authToken = Cookies.get('AuthToken');
if (authToken) {
  router.push('/');
}

const formData = reactive({
  user: "",
  password: "",
  maintain: false,
});

const rules = {
  user: { required },
  password: { required },
};

const v$ = useVuelidate(rules, formData);

const submitForm = async() => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      var settings = {
        "url": `http://localhost:8000/login/${formData.user}/${formData.password}`,
        "method": "POST",
        "timeout": 0,
      };

      $.ajax(settings).done(function (response) {
        Cookies.set('AuthToken', response, {
          expires: formData.maintain ? 7 : undefined,
          secure: true,
          sameSite: 'None',
        });
        router.push('/');
      }).fail(function () {
        alert('Usuário ou senha inválidos! Por favor, tente novamente!');
      });
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<template>
  <Navbar />
  <div class="login-container">
    <div class="login-subcontainer">
      <form class="login" @submit.prevent="submitForm">
        <TextField placeholder="usuário" v-model="formData.user" />
        <TextField placeholder="senha" :is-password="true" v-model="formData.password" />
        <CheckboxField label="manter conectado" v-model="formData.maintain" />
        <ButtonField label="LOGIN" :form="true" :disabled="v$.$invalid" />
      </form>
    </div>
  </div>
</template>

<style scoped lang="sass">
.login-container
  position: relative
  flex: 1
  display: flex
  justify-content: center
  align-items: center

  .login-subcontainer
    @include shadow()
    border-radius: 1px
    position: absolute
    background-color: $color-contrast
    width: 670px
    padding: 15px

    @media only screen and (max-width: $mobile-width)
      width: 95%

    .login
      display: flex
      flex-direction: column
      gap: 15px

</style>
