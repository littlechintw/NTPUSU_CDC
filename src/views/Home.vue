<template>
  <div class="home">
    <br />
    <v-card elevation="0">
      <v-container fluid>
        <v-row>
          <v-col cols="12" style="background-color: #e9e8e7">
            <v-row align="center" justify="center" length>
              <h1>報 到</h1>
            </v-row>
            <v-row align="center" justify="center" length>
              <br />
            </v-row>
            <v-row align="center" justify="center" length>
              <div v-show="tokenShow">
                <v-row align="center" justify="center" length>
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    :disabled="formClose"
                  >
                    <v-card
                      elevation="0"
                      width="344px"
                      style="background-color: #e9e8e7"
                    >
                      <v-progress-linear
                        buffer-value="0"
                        color="blue"
                        reverse
                        stream
                        value="0"
                      ></v-progress-linear>
                      <v-text-field
                        v-model="token"
                        :rules="tokenRules"
                        type="password"
                        label="Token"
                        required
                      ></v-text-field>
                      <v-btn
                        :disabled="!valid"
                        color="#87C1A2"
                        dark
                        class="mr-4"
                        @click="validate"
                        >完 成</v-btn
                      >
                      <br /><br />
                      <v-progress-linear
                        buffer-value="0"
                        color="blue"
                        stream
                        value="0"
                      ></v-progress-linear>
                    </v-card>
                  </v-form>
                </v-row>
              </div>
            </v-row>
            <div v-show="!tokenShow">
              <v-row align="center" justify="center" length>
                <StreamBarcodeReader
                  @decode="(a, b, c) => onDecode(a, b, c)"
                  @loaded="() => onLoaded()"
                ></StreamBarcodeReader>
              </v-row>
              <v-row align="center" justify="center" length>
                <br />
              </v-row>
              <v-row align="center" justify="center" length>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  :disabled="formClose"
                  v-show="!formLoadingShow"
                >
                  <v-card
                    elevation="0"
                    width="344px"
                    style="background-color: #e9e8e7"
                  >
                    <v-progress-linear
                      buffer-value="0"
                      color="blue"
                      reverse
                      stream
                      value="0"
                    ></v-progress-linear>
                    <v-text-field
                      v-model="id"
                      :rules="idRules"
                      label="學號 / 身分證字號"
                      required
                    ></v-text-field>
                    <v-btn
                      :disabled="!valid"
                      color="#87C1A2"
                      dark
                      class="mr-4"
                      @click="sendId"
                      >送 出</v-btn
                    >
                    <br /><br />
                    <v-progress-linear
                      buffer-value="0"
                      color="blue"
                      stream
                      value="0"
                    ></v-progress-linear>
                  </v-card>
                </v-form>
                <div v-show="formLoadingShow">
                  <v-row align="center" justify="center" length>
                    <v-progress-circular
                      indeterminate
                      color="amber"
                    ></v-progress-circular>
                  </v-row>
                </div>
              </v-row>
              <v-row align="center" justify="center" length>
                <br /><br />
              </v-row>
              <v-row align="center" justify="center" length>
                <v-btn color="#FFDDEC" class="mr-4" @click="reset"
                  >RESET ALL SETTING</v-btn
                >
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <br /><br />
  </div>
</template>

<script>
// @ is an alias to /src
import md5 from "js-md5";
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
  name: "Home",
  components: {
    StreamBarcodeReader,
  },
  data() {
    return {
      tokenShow: false,
      valid: true,
      token: "",
      tokenRules: [(v) => !!v || "You must have Token?"],
      id: "",
      idRules: [(v) => !!v || "You must have id"],
      formLoadingShow: false,
    };
  },
  methods: {
    validate() {
      localStorage.setItem("token", md5(this.token));
      alert("Maybe you can use this?");
      this.tokenShow = false;
    },
    reset() {
      localStorage.removeItem("token");
      alert("重新整理以重設");
      this.$router.push("/");
    },
    onDecode(a, b, c) {
      console.log(a, b, c);
      this.id = a;
      alert("掃到了，記得確認內容並按下送出鍵才能完成");
    },
    onLoaded() {
      console.log("load");
    },
    sendId() {
      this.formLoadingShow = true;
      let url =
        "https://script.google.com/macros/s/AKfycby5u9iMxcdyE9TSQ2iV5O75QsyLXgqH_H7pVNtF5uWDQjWFaM3xfTUtWBbFrnv6yt4t/exec?m=c&i=" +
        this.id +
        "&v=" +
        localStorage.getItem("token");
      this.$http
        .get(url)
        .then((response) => {
          this.formLoadingShow = false;
          console.log(response);
          if (!response.data.err) {
            if (response.data.message === "V") {
              alert("完成簽到，且獲得早鳥");
            } else {
              alert("完成簽到");
            }
          } else {
            if (response.data.errCode === 1) {
              alert("你已經報到過了，本次操作無更新資料");
            } else if (response.data.errCode === 88) {
              alert("你知道嗎，你不能用這個系統喔，ㄅㄅ");
            } else {
              alert("怪怪的");
            }
          }
        })
        .catch((error) => {
          this.formLoadingShow = false;
          alert(error);
          alert("無法存取後端服務");
        });
      this.id = "";
    },
  },
  mounted: function () {
    if (!localStorage.getItem("token")) {
      this.tokenShow = true;
    }
  },
};
</script>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>