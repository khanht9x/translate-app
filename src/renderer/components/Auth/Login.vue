<template>
  <div id="wrapper">
    <b-container>
      <b-row class="justify-content-center login">
        <b-col md="5">
          <b-card-group deck>
            <b-card
              header="Đăng Nhập"
              class="text-center"
            >
              <b-card-text>
                <b-form>
                  <b-input-group class="mb-3">
                    <b-form-input
                      type="email"
                      v-model="request.email"
                      require
                      autofocus
                      placeholder="Email"
                    ></b-form-input>
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-form-input
                      type="password"
                      require
                      v-model="request.password"
                      placeholder="Mật khẩu"
                    ></b-form-input>
                  </b-input-group>
                  <div
                    style="color: red"
                    class="errors mb-3"
                    v-if="error"
                  >
                    {{ error }}
                  </div>
                  <div class="text-center">

                    <b-button
                      block
                      :disabled="waiting"
                      variant="success"
                      class="text-center"
                      @click="login()"
                      @keyup.enter="login()"
                    >Đăng nhập
                      <b-spinner
                        v-show="waiting"
                        small
                      />
                      <span class="sr-only">Loading...</span></b-button>
                  </div>
                </b-form>
              </b-card-text>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
const config = require('electron-json-config');
const crypto = require('crypto');
import { router } from "../../router";
import { AuthService } from "../../services/Auth";
export default {
  name: "Login",
  data () {
    return {
      request: {
        email: "",
        password: ""
      },
      waiting: false,
      error: ""
    };
  },
  methods: {
    async login () {
      if (!this.request.email) {
        this.error = "Bạn chưa nhập email";
        return;
      }

      if (!this.request.password) {
        this.error = "Bạn chưa nhập mật khẩu";
        return;
      }

      this.error = "";
      this.waiting = true;
      const response = await AuthService.login(this.request);
      if (response.status == "success") {
        this.waiting = false;
        const authConfig = {
          user: {
            id: response.data.id,
            hash: crypto.createHash('md5').update(JSON.stringify(response.data)).digest("hex")
          }
        };

        config.set("auth-config", authConfig);

        router.push({
          name: "Token"
        });
      } else {
        this.waiting = false;
        this.error = response.message;
      }
    }
  },
  mounted () {
  }
}
</script>
