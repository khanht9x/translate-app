<template>
  <div id="wrapper">
    <b-container fluid>
      <h3>Translate</h3>
      <b-row>
		  
	  </b-row>
	  <b-col md="5">
        <b-form-textarea
          class="mt-3"
          id="textarea"
          v-model="inputText"
          placeholder="Nhập từ cần dịch ..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <b-button
          class="mt-3 mb-3"
          @click="transalte"
          variant="primary"
        >Dịch</b-button>
      </b-col>
      <b-col md="5">
        <b-form-textarea
          id="textarea"
          v-model="resultText"
          placeholder="Kết quả ..."
          rows="3"
          max-rows="6"
          :disabled=true
          style="cursor: not-allowed"
          oncopy="return false"
        ></b-form-textarea>
        <div>
          <b-button
            class="mt-3 mb-3"
            @click="copy"
            variant="danger"
          >Copy</b-button>
        </div>
      </b-col>

      <div
        class="footer mt-3"
        style="float: right"
      >
        <small>version 1.0.1</small>
      </div>
    </b-container>

  </div>

</template>

<script>
import translateData from './config'
const { clipboard } = require('electron')
export default {
  name: 'landing-page',
  data () {
    return {
      translateData: translateData,
      inputText: '',
      resultText: ''
    }
  },
  methods: {
    transalte () {
      this.resultText = ''
      const inputTexts = this.inputText.split('\n')
      inputTexts.map(inputText => {
        const position = inputText.trim().search(/[0-9]/gm)
        let text, number
        if (position !== -1) {
          text = inputText.slice(0, position)
          number = inputText.slice(position, inputText.length)
        } else {
          text = inputText
          number = ''
        }

        const textTranslate = this.translateData[text.trim()] ? this.translateData[text.trim()] : text
        const numberTransalte = number.slice(number.search('_') + 1, number.length)
        if (textTranslate) {
          this.resultText += textTranslate + ' ' + numberTransalte + '\n'
        } else {
          this.resultText += numberTransalte + '\n'
        }
      })
    },
    copy () {
      clipboard.writeText(this.resultText)
    }
  }
}
</script>
