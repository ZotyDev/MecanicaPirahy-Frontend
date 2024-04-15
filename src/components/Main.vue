<script setup lang="ts">
import { reactive } from 'vue';
import Navbar from './Navbar.vue';
import ButtonField from './fields/ButtonField.vue'
import TextField from './fields/TextField.vue'
import PartComponent from './PartComponent.vue';
import PartModal from './PartModal.vue';
import Cookies from 'js-cookie';

const searchData = reactive({
  search: "",
});

let authToken = Cookies.get('AuthToken');
if (authToken) {
  authToken = JSON.parse(authToken).body.AuthToken;
}

const resultData = reactive({
  parts: [],
});

function search(event: MouseEvent) {
  if (searchData.search.length > 0) {
    try {
      var settings = {
        "url": `http://localhost:8000/paged/500/0/${searchData.search}`,
        "method": "GET",
        "timeout": 500,
        "headers": {
          "Authorization": `Bearer ${authToken}`,
        }
      };

      $.ajax(settings).done(function (response) {
        resultData.parts = response;
      }).fail(function (jqXHR) {
        if (jqXHR.status != 200) {
          console.error("Falha na requisição:", jqXHR.status, jqXHR.statusText);
        } else {
          resultData.parts = [];
          alert("Nenhum item encontrado");
        }
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      var settings = {
        "url": `http://localhost:8000/paged/500/0`,
        "method": "GET",
        "timeout": 500,
        "headers": {
          "Authorization": `Bearer ${authToken}`,
        }
      };

      $.ajax(settings).done(function (response) {
        resultData.parts = response;
      }).fail(function (jqXHR) {
        if (jqXHR.status != 200) {
          console.error("Falha na requisição:", jqXHR.status, jqXHR.statusText);
        } else {
          alert("Nenhum item encontrado");
        }
      });
    } catch (err) {
    }
  }
};
// @ts-ignore
search();

</script>

<template>
  <PartModal v-if="isModalOpen" @close="closeModal"/>
  <Navbar />
  <div class="top-container">
    <div class="add">
      <ButtonField label="ADICIONAR" :on-click="openModal" />
    </div>
    <div class="search">
      <TextField placeholder="pesquisar" v-model="searchData.search" />
      <ButtonField label="PESQUISAR" :on-click="search"/>
    </div>
  </div>
  <div class="parts-container">
    <PartComponent v-if="resultData.parts.length > 0" v-for="(part) in resultData.parts" :part="part"/>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  }
};
</script>

<style scoped lang="sass">
.top-container
  display: grid
  grid-template-columns: auto 1fr auto
  align-items: center
  margin-top: 15px

  .add
    margin-left: 40px
    justify-self: start

  .search
    @include shadow()
    padding: 10px
    justify-self: end
    margin-right: 40px
    width: 600px
    background-color: $color-contrast
    display: flex
    gap: 20px
    align-items: center

.parts-container
  display: flex
  flex-direction: column
  margin: 40px
  gap: 15px
</style>
