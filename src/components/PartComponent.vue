<script setup lang="ts">
import ButtonField from './fields/ButtonField.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

let authToken = Cookies.get('AuthToken');
if (authToken) {
  authToken = JSON.parse(authToken).body.AuthToken;
}

function centavosParaReais(centavos: number): string {
  const valorEmReais: number = centavos / 100;
  const valorArredondado: string = valorEmReais.toFixed(2);
  return `${valorArredondado}`.replace('.', ',');
}

function copyToClipboard(valueToCopy: any) {
  // Criar um elemento de input oculto
  const input = document.createElement('input');
  input.style.position = 'absolute';
  input.style.left = '-9999px';
  input.value = valueToCopy;
  document.body.appendChild(input);

  // Selecionar e copiar o valor
  input.select();
  document.execCommand('copy');

  // Remover o elemento de input
  document.body.removeChild(input);

  // Exibir uma mensagem ou realizar outra ação após a cópia
  alert('Valor copiado para a área de transferência!');
};

async function deletePart(id: Number) {
  if (confirm("Você tem certeza de que deseja deletar essa peça?")) {
    try {
      var settings = {
        "url": `http://localhost:8000/delete/${id}`,
        "method": "POST",
        "timeout": 500,
        "headers": {
          "Authorization": `Bearer ${authToken}`,
        }
      };

      $.ajax(settings).done(function (response) {
        alert("Peça deletada com sucesso");
      }).fail(function (jqXHR) {
        alert("Falha ao deletar");
      });
    } catch (err) {
      console.error(err);
    }
  }
}

</script>

<template>
  <PartModalEdit v-if="isEditModalOpen" @close="closeEditModal" />
  <div class="part-container">
    <div class="dark">
      <a href="#" @click="
          // @ts-ignore
          copyToClipboard(part.code)
        ">
        <FontAwesomeIcon :icon="faCopy" />
      </a>
      <span>{{
        // @ts-ignore
        part.code
      }}</span>
    </div>
    <div class="light">
      <a href="#" @click="
          // @ts-ignore
          copyToClipboard(part.name)
        ">
        <FontAwesomeIcon :icon="faCopy" />
      </a>
      <span>{{
        // @ts-ignore
        part.name
      }}</span>
    </div>
    <div class="dark">
      <a href="#" @click="
        // @ts-ignore
        copyToClipboard(centavosParaReais(part.price))">
        <FontAwesomeIcon :icon="faCopy" />
      </a>
      <span>R$ {{
      // @ts-ignore
      centavosParaReais(part.price) }}</span>
    </div>
    <div class="light">
      <a href="#" @click="
        // @ts-ignore
        copyToClipboard(centavosParaReais(part.price * 1.30))">
        <FontAwesomeIcon :icon="faCopy" />
      </a>
      <span>R$ {{
      // @ts-ignore
      centavosParaReais(part.price * 1.30) }}</span>
    </div>
    <!-- <div class="button"> -->
      <!-- <ButtonField label="EDITAR" :on-click="openEditModal" /> -->
    <!-- </div> -->
    <div class="button">
      <ButtonField label="DELETAR" color="#bd4848" :on-click="async () => {
        // @ts-ignore
        await deletePart(part.id);
        }" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    part: {},
  },
  data() {
    return {
      isEditModalOpen: false,
    }
  },
  methods: {
    openEditModal() {
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    }
  }
}
</script>

<style scoped lang="sass">
.part-container
  @include shadow()
  width: 100%
  height: 60px
  display: grid
  grid-template-columns: auto auto auto auto 1fr auto auto
  align-items: center

  div
    padding-left: 10px
    padding-right: 10px
    height: 100%
    display: flex
    align-items: center
    width: 150px

    &.light
      background-color: #ffffff

    &.dark
      background-color: #e1e1e1

    a
      color: $color-text-dark
      margin-right: 10px

  .button
    justify-self: end
</style>
