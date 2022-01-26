<template>
  <div class="text-center">
    <v-dialog v-model="isDialogVisible" width="700">
      <template v-slot:activator="{on, attrs}">
        <v-btn class="pa-10 blue lighten-4" v-bind="attrs" v-on="on" block>
          Nález psa
        </v-btn>
      </template>

      <v-stepper v-model="step">
        <v-stepper-header class="px-8 ">
          <v-stepper-step :complete="step > 1" step="1" class="px-16" color="grey"></v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" class="px-16" color="grey"></v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" class="px-16" color="grey"></v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <!-- STEP 1 -->
          <v-stepper-content step="1">
            <v-form 
              action='/upload' 
              method="POST" 
              enctype="multipart/form-data" 
              class="grey lighten-2"
              ref="form1"
              v-model="isStepOneValid"
              lazy-validation
            >
              <v-container>
                <v-row class="mx-1 mx-sm-2 pt-5 pt-sm-7 pb-3">
                  <v-col cols="12" sm="6" class="py-0 px-5">
                    <v-menu
                      v-model="isDatepickerVisible"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field 
                          v-model="dateFormatted" 
                          label="Datum nálezu" 
                          prepend-inner-icon="mdi-calendar" 
                          readonly
                          v-bind="attrs"
                          v-on="on">
                        </v-text-field>
                      </template>
                      <v-date-picker 
                        v-model="date" 
                        @input="isDatepickerVisible = false"
                        locale="cs-CZ"
                        :first-day-of-week="1"
                        :allowed-dates="(date) => date <= new Date().toISOString().substr(0, 10)">
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" class="py-0 px-5">
                    <v-text-field 
                      v-model="foundDog.place"
                      :rules="placeRules"
                      label="Místo nálezu"
                      prepend-inner-icon="mdi-map-marker">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" class="py-0 px-5">
                    <v-radio-group v-model="foundDog.sex" row>
                      <v-radio label="Pes" value="Pes"></v-radio>
                      <v-radio label="Fena" value="Fena"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="6" class="py-0 px-5">
                    <v-autocomplete
                      v-model="foundDog.breed"
                      :rules="breedRules"
                      :items="breeds"
                      label="Plemeno">
                    </v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-file-input 
                      v-model="file"
                      label="Nahrát fotku"
                      accept=".jpg, .jpeg, .png"
                      :rules="fileRules"
                      @change="previewFile"
                      @click:clear="image=''; message=''"
                      prepend-icon="mdi-camera"
                      show-size>
                    </v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-img v-if="file" :src="image" alt="File preview" contain></v-img>
                    <v-alert v-if="message" type="error" dense>{{ message }}</v-alert>
                  </v-col>
                  <v-col>
                    <v-btn
                      class="float-right"
                      color="grey-lighten-4"
                      @click="validateStepOne"
                      :disabled="!isStepOneValid">Dále
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>

          <!-- STEP 2 -->
          <v-stepper-content step="2">
            <v-form 
              class="grey lighten-2" 
              v-model="isStepTwoValid" 
              ref="form2"
              lazy-validation
            >
              <v-container>
                <v-row class="mx-1 mx-sm-2 py-2 py-sm-3">
                  <v-col cols="12">
                    <v-text-field 
                      v-model="foundDog.email"
                      :rules="emailRules"
                      label="Kontaktní e-mail"
                      prepend-icon="mdi-email">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea 
                      v-model="foundDog.info"
                      label="Dodatečné info">
                    </v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <vue-recaptcha
                      :sitekey="captchaSitekey"
                      @verify="isCaptchaVerified = true"
                      @expired="isCaptchaVerified = false"
                    ></vue-recaptcha>
                    <v-alert v-if="message" type="error" dense>{{ message }}</v-alert>
                  </v-col>
                  <v-col cols="12">
                    
                  </v-col>
                  <v-col>
                    <v-btn color="grey-lighten-4" @click="step = 1">Zpět</v-btn>
                    <v-btn 
                      class="float-right"
                      color="grey-lighten-4" 
                      @click="validateStepTwo"
                      :disabled="!isStepTwoValid">Kontrola
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>

          <!-- STEP 3 -->
          <v-stepper-content step="3">
            <v-container>
              <v-card class="mb-6">
                <v-img v-if="file" :src="image" contain>
                </v-img>
                <v-card-title> Nalezenec </v-card-title>
                <v-card-subtitle>{{ foundDog.breed }}</v-card-subtitle>
                <v-card-text>
                  <div><b>Místo nálezu: </b> {{ foundDog.place }}</div>
                  <div><b>Pohlaví: </b>{{ foundDog.sex }}</div>
                  <div><b>Kontaktní e-mail: </b> {{ foundDog.email }}</div>
                  <div v-if="foundDog.info"><b>Dodatečné info: </b> {{ foundDog.info }}</div>
                </v-card-text>
              </v-card>
              <v-btn 
                color="grey-lighten-4"
                @click="step = 2">
                Zpět
              </v-btn>
              <v-btn 
                class="float-right"
                color="grey-lighten-4"
                @click="newPost(); isDialogVisible = false">
                Přidat
              </v-btn>
            </v-container>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </div>
</template>

<script>
import EventBus from '../eventbus';
import VueRecaptcha from 'vue-recaptcha';
import nsfwjs from '../nsfw';
import data from '../mixins/formComponentData';
import methods from '../mixins/formComponentMethods';
require('dotenv').config();

export default {
  components: {
    VueRecaptcha
  },
  // from files: formComponentData.js, formComponentMethods.js, nsfw.js
  mixins: [data, methods, nsfwjs],

  computed: {
    dateFormatted() {
      return this.formatDate(this.date);
    },
    onlyPastDates() {
      return this.date;
    }
  },

  methods: {
    async newPost() {
      if (this.isStepOneValid && this.isStepTwoValid && this.isImageSafe) {
        this.sendFormData('found');
      } else {
        // Send error message to PostComponent.vue (Validation failed)
        this.message = "Vložení se nezdařilo, nebyla vyplněna všechna povinná pole";
        EventBus.$emit('sendMessage', {
          message: this.message,
          error: true
        });
      }
    }
  }
}
</script>