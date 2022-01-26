import breeds from '../assets/breeds';
import rules from '../assets/formRules';

export default {
  data() {
    return {
      foundDog: {
        place: '',
        sex: '',
        breed: '',
        email: '',
        info: ''
      },
      lostDog: {
        name: '',
        place: '',
        sex: '',
        age: '',
        breed: '',
        email: '',
        info: ''
      },
      step: 1,
      isDialogVisible: false,
      isDatepickerVisible: false,
      isStepOneValid: false,
      isStepTwoValid: false,
      isImageSafe: false,
      isCaptchaVerified: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0,10),
      file: [],
      image: '',
      imageMessage: '',
      breeds: breeds,
      captchaSitekey: process.env.VUE_APP_CAPTCHA_SITEKEY,
      message: '',
      captchaMessage: '',
      emailRules: rules.emailRules,
      placeRules: rules.placeRules,
      breedRules: rules.breedRules,
      fileRules: rules.fileRules,
      nameRules: rules.nameRules,
      ageRules: rules.ageRules
    }
  }
}