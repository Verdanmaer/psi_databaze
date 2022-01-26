import * as nsfwjs from 'nsfwjs';

export default {
  methods: {
    // Use NSFW.js to filter adult content https://github.com/infinitered/nsfwjs
    async filterAdultContent(image) {
      const model = await nsfwjs.load('/model/min_nsfwjs/', { size: 299 });
      const img = new Image();
      img.src = image;
      img.width = 512;
      img.height = 512;
      const predictions = await model.classify(img);
      if (predictions[0].className === 'Neutral') {
        this.isImageSafe = true;
      } else {
        this.message = "Tato fotka nevypadá bezpečně, zkuste prosím jinou";
        this.isImageSafe = false;
      }
    }
  }
}