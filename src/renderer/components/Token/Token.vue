<template>
  <div id="wrapper">
    <b-container>
      <b-row class="justify-content-center token">
        <b-col md="5">
          <b-card-group deck>
            <b-card header="Code" class="text-center">
              <b-card-text>
                <b-form>
                  <b-input-group class="mb-3">
                    <b-form-input
                      type="text"
                      v-model="request.token"
                      require
                      autofocus
                      placeholder="Nhập mã code"
                    ></b-form-input>
                  </b-input-group>
                  <div class="text-center">
                    <p style="color: red">{{ error }}</p>
                    <b-button
                      block
                      :disabled="waiting"
                      variant="success"
                      class="text-center"
                      @click="verify()"
                      @keyup.enter="verify()"
                    >
                      Xác thực
                      <b-spinner v-show="waiting" small />
                      <span class="sr-only">Loading...</span>
                    </b-button>
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
const config = require("electron-json-config");
const remote = require("electron").remote;
const app = remote.app;
import helper from "../../helper/helper";
import AuthService from "../../services/Auth";
import { router } from "../../router";

export default {
  name: "Token",
  data() {
    return {
      request: {
        token: ""
      },
      waiting: false,
      error: ""
    };
  },
  methods: {
    async verify() {
      this.error = "";
      this.waiting = true;
      const disk = await helper.getDiskLayout();
      const serialNum = disk[0].serialNum;
      const authConfig = config.get("auth-config");
      this.request.token = this.request.token.trim();
      this.request.user_id = authConfig.user.id;
      this.request.infor = serialNum;
      const response = await AuthService.verifyToken(this.request);
      this.waiting = false;

      if (response.status == "success") {
        authConfig.token = response.data.value;
        authConfig.hashToken = helper.md5(serialNum + response.data.value);
        config.set("auth-config", authConfig);
        router.push({
          name: "Translate"
        });
      } else {
        this.error = response.message;
      }
    }
  }
};
</script>
