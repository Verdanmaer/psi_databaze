const breeds = [  
  'Jiné',
  { divider: true },
  'Afghánský chrt',
  'Aidi',
  'Airedale terier',
  'Akbaš',
  'Akita-Inu',
  'Aljašský klee kai',
  'Aljašský malamut',
  'Alpský jezevčíkovitý brakýř',
  'Americká akita (neboli velký japonský pes)',
  'Americký bezsrstý teriér',
  'Americký buldok',
  'Americký kokršpaněl',
  'Americký stafordširský terier',
  'Anatolský pastevecký pes',
  'Anglický buldok',
  'Anglický foxhound',
  'Anglický chrt (Greyhound)',
  'Anglický kokršpaněl',
  'Anglický mastif',
  'Anglický setr',
  'Anglický špringršpaněl',
  'Anglický toy terier',
  'Appenzellský salašnický pes',
  'Argentinská doga',
  'Ariégois',
  'Ariegský ohař krátkosrstý',
  'Australská kelpie',
  'Australský honácký pes',
  'Australský ovčák',
  'Australský teriér',
  'Auvergneský ohař krátkosrstý',
  'Azavak',
  'Barbet',
  'Barzoj',
  'Basenji',
  'Baset',
  'Bavorský barvář',
  'Bearded kolie',
  'Bedlington teriér',
  'Belgický grifonek',
  'Belgický ovčák',
  'Belgický ovčák - Groenendael',
  'Belgický ovčák - Laekenois',
  'Belgický ovčák - Malinois',
  'Belgický ovčák - Tervueren',
  'Bergamský ovčák',
  'Bernský salašnický pes',
  'Beauceron',
  'Bígl',
  'Bígl-Harrier',
  'Billy',
  'Bišonek',
  'Bílý švýcarský ovčák',
  'Black and tan Coonhound',
  'Bloodhound',
  'Blue Lacy',
  'Bobtail',
  'Boloňský psík',
  'Bordeauxská doga',
  'Border kolie',
  'Border teriér',
  'Bosenský hrubosrstý honič',
  'Bostonský teriér',
  'Brabantík',
  'Brazilská fila',
  'Brazilský teriér',
  'Bretaňský ohař',
  'Briard',
  'Briquet Griffon Vendéen',
  'Bruselský grifonek',
  'Bullmastif',
  'Bulteriér',
  'Cairn teriér',
  'Cao de Castro Laboreiro',
  'Clumber španěl',
  'Coton de Tulear',
  'Curly coated retrívr',
  'Čau-čau',
  'Černý teriér',
  'Československý vlčák',
  'Český fousek',
  'Český horský pes',
  'Český strakatý pes',
  'Český teriér',
  'Čínský chocholatý pes',
  'Čivava',
  'Dalmatin',
  'Dandie dinmont teriér',
  'Dánská doga',
  'Dánsko-švédský farmářský pes',
  'Deerhound',
  'Dobrman',
  'Dunker',
  'Entlebušský salašnický pes',
  'Estrelský pastevecký pes',
  'Eurasier',
  'Evropský saňový pes',
  'Faraonský pes',
  'Finský špic',
  'Flanderský bouvier',
  'Flat coated retrívr',
  'Foxteriér drsnosrstý',
  'Foxteriér hladkosrstý',
  'Francouzský buldoček',
  'Gordonsetr',
  'Grónský pes',
  'Hamiltonův honič',
  'Hannoverský barvář',
  'Havanský psík',
  'Hokkaido-Ken',
  'Holandský ovčácký pudl',
  'Holandský ovčák',
  'Holandský pinč',
  'Hovawart',
  'Hygenův honič',
  'Chesapeake Bay retrívr',
  'Chodský pes',
  'Chortaja borzaja',
  'Chorvatský ovčák',
  'Ibizský podenco',
  'Irský červenobílý setr',
  'Irský setr',
  'Irský teriér',
  'Irský vlkodav',
  'Irský vodní španěl',
  'Istrijský krátkosrstý honič',
  'Italský corso pes',
  'Italský chrtík',
  'Italský ohař',
  'Italský segugio',
  'Italský spinone',
  'Italský volpino',
  'Jack Russell teriér',
  'Jämthund',
  'Japan-chin',
  'Japonský špic',
  'Japonský teriér',
  'Jezevčík',
  'Jihoruský ovčák',
  'Jugoslávský trikolorní honič',
  'Kanaánský pes',
  'Kanadský eskymácký pes',
  'Kanárský podenco',
  'Karelský medvědí pes',
  'Katalánský ovčák',
  'Kavalír King Charles španěl',
  'Kavkazský pastevecký pes',
  'Kerry bígl',
  'Kerry blue teriér',
  'King Charles španěl',
  'Kishu-Inu',
  'Knírač malý',
  'Knírač střední',
  'Knírač velký',
  'Kolie dlouhosrstá',
  'Kolie krátkosrstá',
  'Komondor',
  'Kontinentální buldok',
  'Kooikerhondje',
  'Korejský Jindo',
  'Krašský pastevecký pes',
  'Kromforländer',
  'Krysí teriér',
  'Kuvasz',
  'Labradorský retrívr',
  'Lagotto Romagnolo (Italský vodní pes)',
  'Lakeland teriér',
  'Landseer',
  'Lapinkoira',
  'Lapinporokoira',
  'Leonberger',
  'Lhasa Apso',
  'Louisianský leopardí pes',
  'Manchester teriér',
  'Maďarský ohař drátosrstý',
  'Maďarský ohař krátkosrstý',
  'Malorská doga',
  'Malorský krysařík',
  'Malorský ovčák (Ca de Bestiar)',
  'Maltézský psík',
  'Malý hrubosrstý vendéeský baset',
  'Malý münsterlandský ohař',
  'Manchester teriér',
  'Maremmansko-abruzzský pastevecký pes',
  'Mexický naháč',
  'Miniaturní bulteriér',
  'Modrý coonhound',
  'Mops',
  'Moskevský strážní pes',
  'Mudi',
  'Neapolský mastin',
  'Německá doga',
  'Německý boxer',
  'Německý křepelák',
  'Německý lovecký teriér',
  'Německý ohař drátosrstý',
  'Německý ohař krátkosrstý',
  'Německý ovčák',
  'Německý pinč',
  'Německý špic',
  'Norbotenský špic',
  'Norfolk teriér (norfolský teriér)',
  'Norský buhund',
  'Norský lundehund',
  'Nova Scotia duck tolling retrívr',
  'Novofundlandský pes',
  'Opičí pinč',
  'Otterhound',
  'Papillon',
  'Parson Russell teriér',
  'Patterdale teriér',
  'Pekingský palácový psík',
  'Peruánský naháč',
  'Phalène',
  'Pikardský ovčák',
  'Plavý bretaňský baset',
  'Plavý bretaňský honič',
  'Plummerův teriér',
  'Podhalaňský ovčák',
  'Pointer',
  'Poitevin',
  'Polský chrt',
  'Polský ovčák nížinný',
  'Porcelaine',
  'Portugalský ovčák',
  'Portugalský podengo',
  'Portugalský vodní pes',
  'Pražský krysařík',
  'Pudl střední',
  'Pudl toy',
  'Pudl trpasličí',
  'Pudl velký',
  'Pudlpointr',
  'Puli',
  'Pumi',
  'Pyrenejský horský pes',
  'Pyrenejský mastin',
  'Pyrenejský ovčák',
  'Redbone Coonhound',
  'Rhodéský ridgeback',
  'Rotvajler',
  'Ruskoevropská lajka',
  'Řecký honič',
  'Saarloosův vlčák',
  'Saluki',
  'Samojed',
  'Sealyham teriér',
  'Sheltie',
  'Shiba-Inu',
  'Shih-tzu',
  'Shikoku-Inu',
  'Shilohský ovčák',
  'Sibiřský husky',
  'Silky teriér',
  'Skotský teriér',
  'Skye teriér',
  'Sloughi',
  'Slovenský čuvač',
  'Slovenský kopov',
  'Slovenský ohař hrubosrstý',
  'Srbský honič (neboli balkánský honič)',
  'Stabyhoun',
  'Stafordšírský bulteriér',
  'Středoasijský pastevecký pes',
  'Sussex španěl',
  'Svatobernardský pes',
  'Šarpej',
  'Šarplaninský pastevecký pes',
  'Šiperka',
  'Španělský alano',
  'Španělský galgo',
  'Španělský mastin',
  'Španělský vodní pes',
  'Štýrský brakýř',
  'Švýcarský honič',
  'Švýcarský honič - Bernský honič',
  'Švýcarský honič - Schwyzský honič',
  'Taigan',
  'Thajský ridgeback',
  'Tibetská doga',
  'Tibetský španěl',
  'Tornjak',
  'Tosa-Inu',
  'Toy foxteriér',
  'Trpasličí pinč',
  'Vaestgoetlandský špic (Vallhund)',
  'Velký hrubosrstý vendéeský baset',
  'Velký münsterlandský ohař',
  'Velký švýcarský salašnický pes',
  'Velšský ovčák',
  'Velššpringršpaněl',
  'Velšteriér',
  'Východoevropský ovčák',
  'Východosibiřská lajka',
  'Výmarský ohař',
  'Výmarský ohař krátkosrstý',
  'Welsh Corgi Cardigan',
  'Welsh Corgi Pembroke',
  'West Highland White teriér',
  'Whippet',
  'Yorkšírský teriér',
  'Západosibiřská lajka',
  'Zlatý retrívr'
];

export default breeds;