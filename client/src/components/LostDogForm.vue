<template>
  <div class="text-center ma-3">
    <v-dialog v-model="isDialogVisible" width="700">
      <template v-slot:activator="{on, attrs}">
        <v-btn color="grey lighten-5" v-bind="attrs" v-on="on">
          Ztráta psa
        </v-btn>
      </template>

      <v-stepper v-model="e1">
        <v-stepper-header class="px-16">
          <v-stepper-step :complete="e1 > 1" step="1" class="px-16" color="grey"></v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" class="px-16" color="grey"></v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form 
              action='/upload' 
              method="POST"
              enctype="multipart/form-data" 
              class="grey lighten-2"
              ref="form"
              v-model="isValid"
            >
              <v-container>
                <v-row class="mx-3 my-0 pa-6">
                  <v-col cols="12" class="py-0 px-5">
                    <v-text-field 
                      v-model="lostDog.name"
                      :rules="nameRules"
                      label="Jméno">
                    </v-text-field>
                  </v-col>
                  <v-col cols="6" class="py-0 px-5">
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
                          label="Datum zmizení" 
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
                  <v-col cols="6" class="py-0 px-5">
                    <v-text-field
                      v-model="lostDog.place"
                      :rules="placeRules"
                      label="Místo zmizení"
                      prepend-inner-icon="mdi-map-marker">
                    </v-text-field>
                  </v-col>
                  <v-col cols="6" class="py-0 px-5">
                    <v-radio-group
                      v-model="lostDog.sex"
                      row
                    >
                      <v-radio
                        label="Pes"
                        value="Pes">
                      </v-radio>
                      <v-radio
                        label="Fena"
                        value="Fena">
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="6" class="py-0 px-5">
                    <v-text-field 
                      v-model="lostDog.age"
                      :rules="ageRules"
                      label="Věk"
                      type="number">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0 px-5">
                    <v-autocomplete 
                      v-model="lostDog.breed"
                      :rules="breedRules"
                      :items="breeds"
                      label="Plemeno">
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input 
                      v-model="file"
                      label="Nahrát fotku"
                      accept=".jpg, .jpeg, .png"
                      :rules="fileRules"
                      @change="previewFile"
                      @click:clear="image=''"
                      prepend-icon="mdi-camera">
                    </v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-img v-if="file" :src="image" alt="File preview" contain></v-img>
                    <div v-if="message"><div class="error">{{ message }}</div></div>
                  </v-col>
                </v-row>
              </v-container>
              <v-btn 
                color="grey-lighten-4" 
                @click="isValid = !isValid; 
                e1 = 2" 
                :disabled="!isValid || !isImageSafe">Dále
              </v-btn>
            </v-form>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-form class="grey lighten-2" ref="form" v-model="isValid">
              <v-container>
                <v-row class="mx-3 pa-6">
                  <v-col cols="6" class="py-0 px-5">
                    <v-text-field 
                      v-model="lostDog.email"
                      :rules="emailRules"
                      label="Kontaktní e-mail"
                      prepend-icon="mdi-email">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0 px-5">
                    <v-textarea 
                      v-model="lostDog.info"
                      label="Dodatečné info">
                    </v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <vue-recaptcha
                      :sitekey="captchaSitekey"
                      @verify="isCaptchaVerified = true"
                    ></vue-recaptcha>
                  </v-col>
                </v-row>
              </v-container>
              <v-btn color="grey-lighten-4" @click="e1 = 1">Zpět</v-btn>
              <v-btn color="grey-lighten-4" 
                @click="newPost(); 
                isDialogVisible = false" 
                :disabled="!isValid || !isCaptchaVerified">Přidat</v-btn>
            </v-form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </div>
</template>

<script>
import PostService from '../PostService';
import breeds from '../assets/breeds';
import EventBus from '../eventbus';
import VueRecaptcha from 'vue-recaptcha';
import * as nsfwjs from 'nsfwjs';
require('dotenv').config();

export default {
  components: {
    VueRecaptcha
  },
  data() {
    return {
      lostDog: {
        name: '',
        place: '',
        sex: '',
        age: '',
        breed: '',
        email: '',
        info: ''
      },
      isDialogVisible: false,
      e1: 1,
      isDatepickerVisible: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0,10),
      file: [],
      image: '',
      breeds: breeds,
      isValid: true,
      isImageSafe: true,
      isCaptchaVerified: false,
      captchaSitekey: process.env.VUE_APP_CAPTCHA_SITEKEY,
      message: '',
      emailRules: [
        v => !!v || 'E-mail je požadován',
        v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Neplatný E-mail'
      ],
      nameRules: [
        v => !!v || 'Jméno je požadované',
        v => (v && v.length <= 15) || 'Jméno musí obsahovat max. 15 znaků'
      ],
      placeRules: [
        v => !!v || 'Místo je požadované',
        v => (v && v.length <= 50) || 'Místo musí obsahovat max. 50 znaků'
      ],
      ageRules: [
        v => !!v || 'Věk je požadován',
        v => (v && v >= 0 && v < 30) || 'Zadejte platný věk'
      ],
      breedRules: [
        v => !!v || 'Pokud neznáte plemeno, zvolte možnost "Jiné"'
      ],
      fileRules: [
        v => !!v || 'Prosím nahrajte foto',
        v => !v || v.size < 5000000 || 'Foto musí mít maximálně 5MB',
        v => !v || 
          (v.type === "image/jpg" || v.type === "image/jpeg" || v.type === "image/png") ||
          'Pouze soubory ve formátu jpg/jpeg/png'  
      ]
    }
  },

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
      if (this.$refs.form.validate() && this.isImageSafe === true) {
        const formData = new FormData();
        formData.append('status', 'lost');
        formData.append('name', this.lostDog.name);
        formData.append('date', this.date);
        formData.append('place', this.lostDog.place);
        formData.append('sex', this.lostDog.sex);
        formData.append('age', this.lostDog.age);
        formData.append('breed', this.lostDog.breed);
        formData.append('email', this.lostDog.email);
        formData.append('info', this.lostDog.info);
        formData.append('file', this.file);

        try {
          await PostService.insertPost(
            formData
          );
          this.posts = await PostService.getPosts();

          // Send success message to PostComponent.vue and display it
          this.message = "Úspěšně nahráno";
          EventBus.$emit('sendMessage', {
            message: this.message,
            error: false
          });
        } catch(err) {
          // Send error message to PostComponent.vue and display it
          this.message = err.response.data.error;
          EventBus.$emit('sendMessage', {
            message: this.message,
            error: true
          });
        }
      } else {
        // Send error message to PostComponent.vue (Validation failed)
        this.message = "Vložení se nezdařilo, nebyla vyplněna všechna povinná pole";
        EventBus.$emit('sendMessage', {
          message: this.message,
          error: true
        });
      }
    },

    previewFile() {
      if (this.file) {
        this.image = URL.createObjectURL(this.file);
        this.filterAdultContent();
      }
    },

    // Use nsfwjs library to filter adult content https://www.npmjs.com/package/nsfwjs
    async filterAdultContent() {
      const model = await nsfwjs.load('/model/min_nsfwjs/', { size: 299 });
      const img = new Image();
      img.src = this.image;
      img.width = 512;
      img.height = 512;
      const predictions = await model.classify(img);
      // Disable next button and show message when the picture is not safe
      if (predictions[0].className === 'Neutral') {
        this.isImageSafe = true;
      } else {
        this.isImageSafe = false;
      }
      console.log(predictions);
    },

    formatDate(date) {
      if(!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}. ${month}. ${year}`;
    }
  }
}
</script>