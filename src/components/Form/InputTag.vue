<template>
  <Draggable v-model="orderedTags" item-key="key => key" tag="ul" handle=".cursor-move" class="input-tag-ul">
    <template #item="{element}">
      <li class="input-tag-li">
        <span class="badge cursor-move">
          <span v-text="element" />

         <i
             class="icon-cancel-circled cursor-pointer"
             @click.prevent="remove(element)"
         />
        </span>
      </li>
    </template>

    <template #footer>
      <li class="input-tag-li">
        <input
            :size="size || 1"
            :placeholder="placeholder"
            ref="input"
            type="text"
            data-cy="tag"
            class="input-tag-input form-control"
            @blur="append"
            @select="append"
            @input="resize"
            @keypress.enter.prevent="append"
            @keyup.delete.prevent="pop"
        >
      </li>
    </template>
  </Draggable>
</template>


<script lang="ts">
import Draggable from "vuedraggable"
import {defineComponent} from "vue"
import _trim from "lodash/trim"
import _uniq from "lodash/uniq"
import _reject from "lodash/reject"

export default defineComponent({
  components: {Draggable},

  props: {
    tags: {
      type: Array as () => Array<string>,
      required: true,
    },

    placeholder: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      size: 0,
    }
  },

  computed: {
    orderedTags: {
      get(): Array<string> {
        return this.tags
      },

      set(tags: Array<string>) {
        this.$emit("update:tags", tags)
      }
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
      input.focus()
    },

    pop() {
      const input: any = this.$refs.input
      if (_trim(input.value) !== "") return
      this.$emit("update:tags", this.tags.slice(0, -1))
      this.resize()
      input.focus()
    },

    remove(tag: string) {
      this.$emit("update:tags", _reject(this.tags, (i) => i === tag))
    },

    resize() {
      const input: any = this.$refs.input
      this.size = input.value.length || this.placeholder.length
    }
  }
})
</script>
