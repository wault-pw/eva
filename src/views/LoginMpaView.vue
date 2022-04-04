<template>
  <HelloLayout>
    <div class="hello-window">
      <div class="card">
        <div class="card-body">
          <p
              v-text="$tc('hello.h2')"
              class="text-center text-lowercase mb-3"
          />

          <form
              name="login"
              @submit.prevent="trySubmit"
          >
            <p class="mb-2">
              <input
                  v-model="username"
                  :placeholder="$tc('user.username').toLowerCase()"
                  autocapitalize="none"
                  autofocus
                  class="form-control form-control-lg"
                  type="text"
              >
            </p>

            <p>
              <input
                  v-model="password"
                  :placeholder="$tc('user.password').toLowerCase()"
                  class="form-control form-control-lg"
                  type="password"
              >
            </p>

            <p>
              <button
                  type="submit"
                  v-text="$t('ui.login')"
                  class="btn w-100 btn-lg btn-primary"
              />
            </p>

            <div class="mt-4 pt-1"/>

            <fieldset class="mb-3 x-fieldset">
              <legend
                  class="small"
                  v-text="$tc('ui.or').toLowerCase()"
              />
            </fieldset>

            <p class="mb-0 text-center text-lowercase">
              <router-link
                  :to="$urn.join()"
                  v-text="$tc('menu.join')"
                  data-cy="join"
              />
            </p>
          </form>
        </div>
      </div>

      <p class="mt-4 text-center mb-0">
        <a
            href="javascript:"
            v-text="$tc('menu.demo')"
            class="text-white"
            @click.prevent="demo"
        />
      </p>
    </div>
  </HelloLayout>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {Login0Request, Login0Response, Login1Request, Login1Response} from "@/desc/alice_v1_pb"
import {MapLoginOtp} from "@/mapper_v1/otp.mapper"
import HelloLayout from "@/layouts/HelloLayout.vue"
import {USER_STORE} from "@/store/USER"

export default defineComponent({
  components: {HelloLayout},

  beforeMount() {
    if (!this.$setup.mpa) this.$router.push(this.$urn.spa())
  },

  data() {
    return {
      username: "",
      password: ""
    }
  },

  methods: {
    async trySubmit() {
      try {
        const [username, password] = await this.$ver.credentials(this.username, this.password)
        await this.submit(username, password)
        await this.otp()
        await this.whoami(password)
        await this.$router.push(this.$urn.workspaces())
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.$throbber.hide()
      }
    },

    async submit(username: string, password: string) {
      this.$throbber.show(this.$tc("login.auth0"))
      const res0 = await this.auth0(username)
      const srp = this.$ver.NewSrpBridge()
      await srp.init({username, password, salt: res0.getSalt_asU8()})

      this.$throbber.show(this.$tc("login.auth1"))
      const challenge = await srp.setServerPublicKey(res0.getMutual_asU8())
      const res1 = await this.auth1(challenge.publicKey, challenge.proof)
      const valid = await srp.isProofValid(res1.getProof_asU8())
      await srp.destroy()
      if (!valid) throw(`invalid credentials`)
    },

    async auth0(username: string): Promise<Login0Response> {
      const req = new Login0Request()
      req.setIdentity(username)
      return await this.$adapter.auth0(req)
    },

    async auth1(mutual: Uint8Array, proof: Uint8Array): Promise<Login1Response> {
      const req = new Login1Request()
      req.setMutual(mutual)
      req.setProof(proof)
      return await this.$adapter.auth1(req)
    },

    async otp() {
      let res = await this.$adapter.otp(MapLoginOtp(null))
      if (!res.getRequired()) return

      const passcode = <string>await this.$dialog.prompt({
        text: this.$tc("user.otpPasscode"),
        placeholder: this.$tc("user.otpDigits")
      })

      res = await this.$adapter.otp(MapLoginOtp(passcode))
      if (res.getRequired()) await this.otp()
    },

    async whoami(password: string) {
      await USER_STORE().WHO_AM_I(password)
    },

    demo() {
      this.username = this.$setup.demoUsername
      this.password = this.$setup.demoPassword
      this.trySubmit()
    }
  }
})
</script>
