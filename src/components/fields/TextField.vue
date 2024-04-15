<template>
  <input class="text-input" :type="isPassword ? 'password' : 'text'" :placeholder="placeholder" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"/>
</template>

<script lang="ts">
export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    isPassword: {
      type: Boolean,
      default: false,
    },
    modelValue: {},
  }
}
</script>

<style scoped lang="sass">
.text-input
  @include shadow()
  @include text-input()
  width: 100%
  height: 40px
  border-radius: 1px
  background-color: $color-contrast-light
  border: 1px solid $color-border-bright
  box-sizing: border-box
  -webkit-transition: 0.1s
  transition: 0.1s
  outline: none

  &:focus
    border: 3px solid $color-primary
</style>
