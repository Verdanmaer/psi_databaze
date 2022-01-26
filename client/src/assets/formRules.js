const rules = {
  nameRules: [
    v => !!v || 'Zadejte prosím jméno psa',
    v => (v && v.length <= 15) || 'Jméno musí obsahovat max. 15 znaků'
  ],
  emailRules: [
    v => !!v || 'Zadejte prosím váš kontaktní E-mail',
    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Neplatný E-mail'
  ],
  placeRules: [
    v => !!v || 'Zadejte prosím místo nálezu/ztráty psa',
    v => (v && v.length <= 50) || 'Místo musí obsahovat max. 50 znaků'
  ],
  ageRules: [
    v => !!v || 'Zadejte prosím věk psa',
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
};

export default rules;