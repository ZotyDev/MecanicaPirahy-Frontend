<template>
  <div class="button-wrapper">
    <button class="button" :style="'background-color: ' + color + ';' " :disabled="disabled" @click="onClick" :type="form ? 'submit' : 'button'">{{ label }}</button>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      default: (payload: MouseEvent) => {},
    },
    form: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'Big',
    },
    color: {
      type: String,
      default: '#34b4bb'
    }
  },
}
</script>

<style scoped lang="sass">
.button-wrapper
  display: flex

.button
  @include text-button()
  width: 100%
  background-color: $color-primary
  border: none
  padding: 15px 32px
  display: inline-block
  cursor: pointer

  &:disabled
    background-color: $color-red
    cursor: not-allowed
</style>
