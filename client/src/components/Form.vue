<template>
  <div class="text-center ma-3">
    <FoundDogForm />
    <LostDogForm />
  </div>
</template>

<script>
import FoundDogForm from './FoundDogForm.vue';
import LostDogForm from './LostDogForm.vue';

export default {
  components: {
    FoundDogForm,
    LostDogForm
  }
}
</script>