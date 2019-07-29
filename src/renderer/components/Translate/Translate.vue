<template>
  <div id="wrapper">
    <b-container fluid>
      <h3>YunXi Auto</h3>
      <b-row class="mt-3">
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
        class="footer"
        style="float: right; position: relative; top: -55px;"
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
import ApiService from "../../services/Api";
import Config from "./config";
const { clipboard } = require("electron");
const storage = require('electron-json-storage');
export default {
  name: "Translate",
  data () {
    return {
      translateData: [],
      inputText: "",
      resultText: ""
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
    }
  },
  mounted () {
    ApiService.get(Config.url)
      .then(response => {
        storage.set("data-translate", response.data, function (error) {
          if (error) throw error;
        })
      })
      .catch(error => {
        console.log(error);
      });

    this.translateData = storage.get("data-translate", function (error, data) {
      if (error) throw error;
      console.log(data);
    });
  }
};
</script>
