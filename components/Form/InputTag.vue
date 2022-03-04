<template>
  <ul class="input-tag-ul">
    <li
      v-for="tag in tags"
      :key="tag"
      class="input-tag-li"
    >
      <span class="badge rounded-pill bg-primary">
        <span v-text="tag" />
        <i
          class="icon-cancel-circled"
          @click.prevent="remove(tag)"
        />
      </span>
    </li>

    <li class="input-tag-li">
      <input
        :size="size"
        ref="input"
        type="text"
        :placeholder="placeholder"
        class="input-tag-input form-control"
        @blur="append"
        @select="append"
        @input="resize"
        @keypress.enter.prevent="append"
      >

      <datalist>
        <option
          v-for="option in filteredOptions"
          :value="option"
          :key="option"
        />
      </datalist>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue"
import _trim from "lodash/trim"
import _uniq from "lodash/uniq"
import _reject from "lodash/reject"
import _difference from "lodash/difference"

export default Vue.extend({
  props: {
    tags: {
      type: Array as () => Array<string>,
      required: true
    },

    options: {
      type: Array as () => Array<string>,
      required: false,
      default() {
        return []
      },
    },

    placeholder: {
      type: String,
      required: false,
    }
  },

  data() {
    return {
      size: 0,
    }
  },

  computed: {
    filteredOptions(): Array<string> {
      return _difference(this.options, this.tags)
    }
  },

  mounted() {
    this.resize()
  },

  methods: {
    append() {
      const input: any = this.$refs.input
      if (_trim(input.value) == "") return

      this.$emit("update:tags", _uniq([...this.tags, input.value]))
      input.value = ""
      this.resize()
      input.blur()
    },

    remove(tag: string) {
      this.$emit("update:tags", _reject(this.tags, (i) => i === tag))
    },

    resize() {
      const input: any = this.$refs.input
      this.size = input.value.length || this.placeholder.length
    },
  }
})
</script>
