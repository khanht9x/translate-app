<template>
  <div id="wrapper">
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="5">
          <p
            class="text-center"
            style="font-size: 25px"
          >Đăng nhập</p>
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
            <div class="text-center">
              <b-button
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
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
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
    login () {

    }
  }
}
</script>
