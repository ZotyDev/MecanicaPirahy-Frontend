<script setup lang="ts">
import TextField from './fields/TextField.vue';
import ButtonField from './fields/ButtonField.vue';
import { reactive } from 'vue';
import { numeric, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import Cookies from 'js-cookie';

const addData = reactive({
  code: undefined,
  name: undefined,
  price: undefined,
});

const rules = {
  code: { required },
  name: { required },
  price: { required },
}

const v$ = useVuelidate(rules, addData);

function converterParaCentavos(numero: any) {
  // Verifica se o número é uma string
  if (typeof numero === 'string') {
    // Verifica se a string contém um ponto ou vírgula
    if (numero.includes('.') || numero.includes(',')) {
      // Divide a string em partes antes e depois do ponto ou vírgula
      const partes = numero.split(/[.,]/);
      // Verifica se há uma parte decimal após o ponto ou vírgula
      if (partes.length > 1) {
        // Se a parte decimal tiver menos de 2 dígitos, adiciona zeros para completar
        if (partes[1].length < 2) {
            partes[1] = partes[1].padEnd(2, '0');
        } else if (partes[1].length > 2) {
            // Se a parte decimal tiver mais de 2 dígitos, arredonda para duas casas decimais
            partes[1] = Math.round(parseFloat(`0.${partes[1]}`) * 100).toString().padStart(2, '0');
        }
        // Une as partes e retorna o número convertido
        return `${partes[0]}${partes[1]}`;
      }
    } else {
      // Se não houver ponto ou vírgula, adiciona dois zeros ao final
      return `${numero}00`;
    }
  } else if (typeof numero === 'number') {
    // Se o número for um número, multiplica por 100 e retorna como string
    return (numero * 100).toFixed(0);
  }
  // Retorna null se o número não for válido
  return null;
}

let authToken = Cookies.get('AuthToken');
if (authToken) {
  authToken = JSON.parse(authToken).body.AuthToken;
}

async function addPart() {
  const result = await v$.value.$validate();
  if (result) {
    // Convert numeric
    try {
      var settings = {
        // @ts-ignore
        "url": `http://localhost:8000/register/${addData.code}/${addData.name}/${converterParaCentavos(addData.price)}/image`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": `Bearer ${authToken}`,
        }
      };

      $.ajax(settings).done(function (response) {
        alert("Peça adicionada com sucesso!");
      }).fail(function (jqXHR) {
        console.error("Falha na requisição:", jqXHR.status, jqXHR.statusText);
        alert("Falha ao dicionar a peça");
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    alert("Valores inseridos são invalidos, tente novamente");
  }
}
</script>

<template>
  <div class="modal">
    <form class="modal-content">
      <TextField placeholder="código" v-model="addData.code" />
      <TextField placeholder="nome" v-model="addData.name" />
      <TextField placeholder="preço" v-model="addData.price" />
      <div class="buttons">
        <ButtonField label="CANCELAR" color="#bd4848" :on-click="closeModal"/>
        <ButtonField label="SALVAR" :on-click="async () => {
          await addPart();
          }"/>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    isModalOpen: {
      type: Boolean,
    },
    part: {},
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  }
}
</script>

<style scoped lang="sass">
.modal
  //display: none
  position: fixed
  z-index: 1
  left: 0
  right: 0
  top: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)

  .modal-content
    background-color: $color-contrast
    margin: 15% auto
    padding: 20px
    border: 1px solid $color-border-bright
    width: 80%
    max-width: 600px
    display: flex
    flex-direction: column
    gap: 15px

    .buttons
      display: grid
      grid-template-columns: auto auto
      gap: 15px

</style>
