<template>
  <div class="checkbox-wrapper">
    <input type="checkbox" :id="checkboxId" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    <label :for="checkboxId">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';

export default {
  mounted() {
    this.checkboxId = 'checkbox' + uuidv4();
  },
  props: {
    label: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      checkboxId: ''
    }
  },
  modelValue: {},
}
</script>

<style scoped lang="sass">
.checkbox-wrapper
  display: flex
  align-items: center

  input
    @include shadow()
    margin: 0
    appearance: none
    -webkit-appearance: none
    -moz-appearance: none
    height: 30px
    width: 30px
    background-color: $color-contrast-light
    border-radius: 1px
    border: 1px solid $color-border-bright
    cursor: pointer
    display: flex
    align-items: center
    justify-content: center

    &:after
      font-family: "Font Awesome 6 Free"
      font-weight: 900
      font-size: 20px
      color: $color-text-bright
      content: "\f00c"
      display: none

    &:hover
      background-color: $color-contrast-lighter

    &:checked
      background-color: $color-primary

      &:after
        display: block

      &:hover
        background-color: $color-primary-light

  label
    @include shadow()
    @include text-input()
    cursor: pointer
    text-align: center
    justify-content: center
    background-color: $color-contrast-light
    border-radius: 1px
    margin-left: 15px
    padding: 5px

</style>
