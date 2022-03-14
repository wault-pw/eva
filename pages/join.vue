<template>
  <div class="hello-window">
    <header class="text-center px-4">
      <h1
        v-text="$tc('join.h1')"
        class="h2 mb-1 text-uppercase"
      />

      <p
        v-text="$tc('hello.h2')"
        class="text-white text-lowercase"
      />
    </header>

    <div ref="card" class="card shadow">
      <div class="card-body">
        <JoinForm
          :disabled="loading"
          :username.sync="username"
          :password.sync="password"
          @submit="trySubmit"
        />
      </div>
    </div>

    <p class="mt-4 text-center">
      <nuxt-link :to="$urn.login()" class="text-white">
        {{ $tc("menu.login") }}
      </nuxt-link>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {RegistrationRequest} from "~/desc/alice_v1_pb";
import {MapRegistrationUser} from "~/lib/domain_v1/user";
import {MapRegistrationWorkspace} from '~/lib/domain_v1/workspace';
import JoinForm from "~/components/Join/JoinForm.vue";
import {MapCardWithItems} from "~/lib/domain_v1/card";
import {TextEncode} from '~/lib/cryptos/util';

export default Vue.extend({
  components: {JoinForm},
  layout: "hello",

  data() {
    return {
      username: "",
      password: "",
      loading: false,
    }
  },

  mounted() {
    const card = this.$refs.card
    card.style["min-height"] = `${card.offsetHeight}px`
  },

  methods: {
    async trySubmit() {
      try {
        this.loading = true
        await this.submit()
        await this.$router.push(this.$urn.login())
      } catch (e) {
        this.$throbber.error(this.$tc("ui.failed"), e)
      } finally {
        this.loading = false
        this.$throbber.hide()
      }
    },

    async submit() {
      this.$throbber.show(this.$tc("join.step1"))

      const username = this.username
      const password = this.password

      const srp = this.$ver.NewSrpBridge()
      const srpSalt = await srp.randomSalt()
      await srp.init({username, password, salt: srpSalt})
      const verifier = await srp.verifier()

      this.$throbber.show(this.$tc("join.step2"))
      const passwdSalt = this.$ver.random(this.$ver.deriveSaltSize)
      const derived = await this.$ver.derive.generate(
        TextEncode(password),
        passwdSalt,
        this.$ver.deriveIter,
        this.$ver.aedKeySize
      )

      this.$throbber.show(this.$tc("join.step3"))
      const pair = await this.$ver.pubCipher.generatePair()
      const pub8 = await this.$ver.exportPubKey(pair)
      const priv8 = await this.$ver.exportPrivKey(pair)
      const uKey = await this.$ver.aedCipher.importKey(derived)

      const wKey = await this.$ver.aedCipher.generateKey()
      const wKey8 = await this.$ver.aedCipher.exportKey(wKey)
      const wKey8Enc = await this.$ver.pubCipher.encrypt(pair.publicKey, wKey8)

      this.$throbber.show(this.$tc("join.step4"))
      const req = new RegistrationRequest()
      req.setUser(MapRegistrationUser({
        verifier,
        srpSalt,
        passwdSalt,
        identity: username,
        privKeyEnc: await this.$ver.aedEncrypt(uKey, priv8, pub8),
        pubKey: pub8,
      }))

      req.setWorkspace(MapRegistrationWorkspace({
        aedKeyEnc: wKey8Enc,
        titleEnc: await this.$ver.aedEncryptText(wKey, "personal", null),
      }))

      req.setCardWithItemsList([
        MapCardWithItems({
          titleEnc: await this.$ver.aedEncryptText(wKey, "Credit card (sample)", null),
          tagsEnc: [await this.$ver.aedEncryptText(wKey, "finance", null)],
          items: [
            {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Card n.", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "8464 2366 1074 7732", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Cardholder name", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "Joe Oka", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Card circuit", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "American Express", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "CVV2", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "853", null),
              hidden: true,
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "PIN", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "2744", null),
              hidden: true,
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Expire on", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "06/25", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Website", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "https://www.americanexpress.com", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Password", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "]Gj2ss{+Grg$fBbg}#E})5Re8G", null),
              hidden: true
            },
          ]
        }),
        MapCardWithItems({
          titleEnc: await this.$ver.aedEncryptText(wKey, "Bank account (sample)", null),
          tagsEnc: [await this.$ver.aedEncryptText(wKey, "finance", null)],
          items: [
            {
              titleEnc: await this.$ver.aedEncryptText(wKey, "IBAN", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "DE89370400440532015007", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Password", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "?)E%[9=GcgzaAftgP[LSEK7JJv", null),
              hidden: true
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "User ID", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "76238784", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Web", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "https://www.db.com", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Bank", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "Deutsche Bank", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Branch n.", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "774942", null),
            },
          ]
        }),
        MapCardWithItems({
          titleEnc: await this.$ver.aedEncryptText(wKey, "bitcoin (sample)", null),
          tagsEnc: [await this.$ver.aedEncryptText(wKey, "finance", null)],
          items: [
            {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Type", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "paper wallet", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Private key [HEX]", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "2ce5820302fd6d8cf756e436484b76fcba11d5664e7bbc643b1bc29994b6bfe5", null),
              hidden: true
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Wallet address", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "1Q7u3cnwo4tAQoBixPSrS5C39E6VaMHWKb", null),
            },
          ]
        }),
        MapCardWithItems({
          titleEnc: await this.$ver.aedEncryptText(wKey, "Gmail (sample)", null),
          tagsEnc: [await this.$ver.aedEncryptText(wKey, "social", null)],
          items: [
            {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Email address", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "joe.oka@gmail.com", null),
              hidden: true,
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Password", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "]Gj2ss{+Grg$fBbg}#E})5Re8G", null),
              hidden: true,
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "SMTP", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "smtp.gmail.com:465", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "IMAP", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "imap.gmail.com:993", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Provider", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "Google Gmail", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Web", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "https://mail.google.com", null),
            },
          ]
        }),
        MapCardWithItems({
          titleEnc: await this.$ver.aedEncryptText(wKey, "Passport (sample)", null),
          tagsEnc: [await this.$ver.aedEncryptText(wKey, "documents", null)],
          items: [
            {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Issued by", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "British Embassy in Berlin", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Passport n.", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "83A4568HL25-66", null),
              hidden: true,
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Expiry date", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "10/09/2033", null),
            }, {
              titleEnc: await this.$ver.aedEncryptText(wKey, "Issue date", null),
              bodyEnc: await this.$ver.aedEncryptText(wKey, "11/09/2020", null),
            },
          ]
        }),
      ])

      await this.$adapter.register(req)
    }
  },

  head() {
    return {
      title: this.$tc("join.title")
    }
  }
})
</script>
