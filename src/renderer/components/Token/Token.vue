<template>
  <div id="wrapper">
    <b-container>
      <b-row class="justify-content-center token">
        <b-col md="5">
          <b-card-group deck>
            <b-card
              header="Code"
              class="text-center"
            >
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

                    <b-button
                      block
                      :disabled="waiting"
                      variant="success"
                      class="text-center"
                      @click="verify()"
                      @keyup.enter="verify()"
                    >Xác thực
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
import helper from "../../helper/helper"
export default {
  name: "Token",
  data () {
    return {
      request: {
        token: ""
      },
      waiting: false
    }
  },
  methods: {
    async verify () {
      this.waiting = true;
      const response = await AuthService.verifyToken(this.request);
      if (response.status == "success") {
        storage.get("auth-config", (error, data) => {
          data.token = response.data.value;
          data.hashToken = helper.hash(helper.getSerinumDisk(), response.data.value);
          storage.set("auth-config", data, error => {
            router.push({
              name: "Translate"
            });
          })
        })
      }
    }
  }
}
</script>
