<template>
  <div id="wrapper">
    <b-container fluid>
      <h3>YunXi Auto</h3>
      <b-row>
        <b-col md="2" class="offset-md-8" style="padding-right: 0px !important">
          <span>Ngôn ngữ</span>
          <b-form-select
            class="mt-2"
            v-model="language"
            :options="languageData"
          ></b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-3 token">
        <b-col
          md="5"
          class="mr-3"
        >
          <b-form-textarea
            id="textarea"
            v-model="inputText"
            placeholder="Nhập từ cần dịch ..."
            rows="15"
            max-rows="15"
            @input="transalte"
          ></b-form-textarea>
          <div style="text-align: center">
            <b-button
              class="mt-3 mb-3"
              @click="clearInput"
              variant="primary"
            >Xóa</b-button>
          </div>
        </b-col>
        <b-col md="5">
          <b-form-textarea
            id="textarea"
            v-model="resultText"
            placeholder="Kết quả ..."
            rows="15"
            max-rows="15"
            :disabled="true"
            style="cursor: not-allowed"
            oncopy="return false"
          ></b-form-textarea>
          <div>
            <b-button
              class="mt-3 mb-3 mr-2"
              @click="copy"
              variant="danger"
            >Kết quả</b-button>
            <b-button
              class="mt-3 mb-3"
              @click="clearResult"
              variant="primary"
            >Xóa</b-button>
          </div>
        </b-col>
      </b-row>
      <div
        class="footer float-right"
        style="position: relative; top: -55px;"
      >
        <small style="display: block">Version 1.01</small>
        <p>
          <small>093.595.0000</small>
        </p>
      </div>
    </b-container>
  </div>
</template>

<script>
const config = require("electron-json-config");
const { clipboard } = require("electron");
import TranslateData from "../../configs/translate-data";
export default {
  name: "Translate",
  data () {
    return {
      language: 0,
      languageData: [
        {
          value: 0,
          text: "Hà Nội"
        },
        {
          value: 1,
          text: "Sài Gòn"
        }
      ],
      translateData: [],
      inputText: "",
      resultText: "",
      request: {}
    };
  },
  methods: {
    clearInput () {
      this.inputText = "";
    },
    clearResult () {
      this.resultText = "";
    },
    transalte () {
      this.resultText = "";
      // get array text with \n
      const inputTexts = this.inputText.replace(/柜体/gm, "").split("\n");
      inputTexts.map(inputText => {
        const position = inputText.trim().search(/[0-9]/gm);
        let text, number;
        if (position !== -1) {
          text = inputText.slice(0, position);
          number = inputText.slice(position, inputText.length);
        } else {
          text = inputText;
          number = "";
        }

        let textTranslate = this.translateData[text.trim()]
          ? this.translateData[text.trim()]
          : text.trim();
        const numberTransalte = number.slice(
          number.search("_") + 1,
          number.length
        );

        if (textTranslate) {
          this.resultText += textTranslate;
          if (numberTransalte) {
            if (number.search("_") !== -1) {
              this.resultText += "\t" + numberTransalte + "\n";
            } else {
              this.resultText += numberTransalte + "\n";
            }
          } else {
            this.resultText += "\n";
          }
        } else {
          this.resultText += numberTransalte + "\n";
        }
      });
      this.resultText = this.resultText.trim();
    },
    copy () {
      clipboard.writeText(this.resultText);
    },
    // async checkToken () {
    //   const authConfig = config.get("auth-config");
    //   const diskLayout = await helper.getDiskLayout();
    //   const serialNum = diskLayout[0].serialNum;
    //   if (
    //     helper.md5(serialNum + authConfig.token + "yunxiauto") !== authConfig.hashToken
    //   ) {
    //     router.push({
    //       name: "Login"
    //     });
    //   }

    //   await this.verifyDisk(authConfig, serialNum);
    // },
    // async verifyDisk (authConfig, serialNum) {
    //   this.request.user_id = authConfig.user.id;
    //   this.request.infor = serialNum;
    //   this.request.token = authConfig.token;
    //   const response = await AuthService.checkDisk(this.request)
    //   if (response.status == 'error') {
    //     config.deleteBulk(['auth-config']);
    //     router.push({
    //       name: "Login"
    //     });
    //   }
    // }
  },
  async mounted () {
    // await this.checkToken();
    // const response = await ConfigService.get();
    // if (response.status == "success") {
    //   if (response.data) {
    //     const dataTranslate = JSON.parse(response.data.value).reduce(
    //       (result, item) => {
    //         result[item.key] = item.value;
    //         return result;
    //       },
    //       {}
    //     );
    //     config.set("data-translate", dataTranslate);
    //   }
    // }
    this.translateData = TranslateData
  }
};
</script>
