<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm ? { 'width': '80%' } : { 'width': '30%' }">
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" ref="login_form" @submit="onSubmit">
              <q-input :disabled="loading" filled v-model="username" label="Username" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type something']" />

              <q-input :disabled="loading" type="password" filled v-model="password" label="Password" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type something']" />

              <div>
                <q-btn :disabled="loading" label="Login" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { doLogin } from "src/api/auth/login"
import Cookie from 'js-cookie'

export default defineComponent({
  name: "AuthLogin",
  setup() {
    return {

    }
  },
  data() {
    return {
      $q: useQuasar(),
      username: "",
      password: "",
      loading: false,
    }
  },
  methods: {
    onSubmit() {
      this.$refs.login_form.validate().then(async is_valid => {
        if (is_valid) {
          this.loading = true
          await doLogin({ username: this.username, password: this.password }).then(success => {
            console.log(success)
            if (success.status == "successful")
              Cookie.set(process.env.API_TOKEN_NAME, success.data)
            this.$router.push("/")
          }, err => {
            this.loading = false
            this.$q.notify({
              colot: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Invalid Login!'
            })
          })
        }
      })
    }
  }

})
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
