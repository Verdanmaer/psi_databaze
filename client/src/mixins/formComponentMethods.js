import EventBus from "../eventbus";

export default {
  methods: {
    sendFormData(status) {
      const formData = new FormData();
      formData.append('status', status);
      formData.append('date', this.date);
      formData.append('file', this.file);
      if (status === "found") {
        formData.append('name', 'Nalezenec')
        formData.append('place', this.foundDog.place);
        formData.append('sex', this.foundDog.sex);
        formData.append('breed', this.foundDog.breed);
        formData.append('email', this.foundDog.email);
        formData.append('info', this.foundDog.info);
      } else if (status === "lost") {
        formData.append('name', this.lostDog.name);
        formData.append('place', this.lostDog.place);
        formData.append('sex', this.lostDog.sex);
        formData.append('age', this.lostDog.age);
        formData.append('breed', this.lostDog.breed);
        formData.append('email', this.lostDog.email);
        formData.append('info', this.lostDog.info);
      }
      // Emit to Form.vue
      EventBus.$emit('sendFormData', formData);
    }, 

    previewFile() {
      if (this.file) {
        this.image = URL.createObjectURL(this.file);
        this.filterAdultContent(this.image);
      }
    },

    formatDate(date) {
      if(!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}. ${month}. ${year}`;
    },

    async validateStepOne() {
      await this.$refs.form1.validate();
      if (this.isImageSafe) {
        this.message = '';
        this.step = 2;
      }
    },

    async validateStepTwo() {
      await this.$refs.form2.validate();
      if (this.isCaptchaVerified) {
        this.step = 3;
        this.message = '';
      } else {
        this.message = 'Prosím zaškrtněte pro kontrolu';
      }
    }
  }
}