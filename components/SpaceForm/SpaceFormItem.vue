<template>
  <div class="space-form-item">
    <div class="space-form-item-row">
      <i
        class="icon-cancel-circled space-form-item-ico"
        @click.prevent="$emit('remove', donor.cid)"
      />

      <input
        v-model="title"
        :placeholder="$tc('spaceForm.label').toLowerCase()"
        data-cy="label"
        class="space-form-item-title"
        @keypress.enter.prevent=""
      />

      <i
        v-if="hidden"
        class="space-form-item-ico icon-key"
        @click.prevent.stop="generator=!generator"
      />
      <i v-else/>
    </div>

    <div class="space-form-item-row">
      <i
        class="icon-ellipsis-vert x-move space-form-item-ico-lg"
      />

      <div class="position-relative">
        <PasswordGenerator
          v-if="generator"
          @close="generator=false"
          @down="generated"
        />

        <textarea
          v-model="hidden ? mask : body"
          :placeholder="$tc('spaceForm.value').toLowerCase()"
          :class="[{'space-form-item-body-hidden': hidden}, `x-scale-${scale}`]"
          :readonly="hidden"
          data-cy="body"
          ref="textarea"
          class="space-form-item-body"
          rows="1"
          @input="resize"
        />
      </div>

      <i
        :class="{'icon-lock-filled': hidden, 'icon-lock-open-filled': !hidden}"
        class="space-form-item-ico-lg"
        @click.prevent="hidden = !hidden"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {ICardItem} from "~/store/CARD_ITEM";
import {Mask} from "~/lib/mask";
import PasswordGenerator from "~/components/PasswordGenerator/PasswordGenerator.vue";
import {TextScale} from "~/lib/scale";

export default Vue.extend({
  components: {PasswordGenerator},
  props: {
    donor: {
      type: Object as () => ICardItem,
      required: true
    }
  },

  data() {
    return {
      id: this.donor.id,
      title: this.donor.title,
      body: this.donor.body,
      hidden: this.donor.hidden,
      generator: false,
    }
  },

  computed: {
    mask(): string {
      return Mask(this.body)
    },

    scale(): number {
      return TextScale(this.body)
    }
  },

  watch: {
    scale() {
      this.$nextTick(() => {
        // resize input if scale has changed
        this.resize()
      })
    }
  },

  mounted() {
    this.resize()
  },

  methods: {
    resize() {
      const textarea: any = this.$refs.textarea
      textarea.style.height = "auto"
      textarea.style.height = textarea.scrollHeight + "px"
    },

    generated(password: string) {
      this.generator = false
      this.body = password
    }
  }
})
</script>
