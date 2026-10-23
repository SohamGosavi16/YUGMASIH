/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 08: Kerala — Theyyam
 */

const state_08_data = {
  id: "state_08",
  state: "Kerala",
  tradition: "Theyyam",
  category: "Living Cultural Tradition",
  region: "Southern India",
  origin: "An ancient, ritualistic shamanic performance tradition of North Malabar (Kolathunadu) in Kerala, rooted in indigenous Dravidian ancestor worship, animism, and serpent cults dating back over 1,500 years. The word 'Theyyam' is a regional corruption of 'Daivam', meaning God, reflecting the belief that the human mortal transforms into the living, manifesting deity.",
  period: "Ancient Dravidian Tribal Antiquity (pre-Vedic roots) to Present",
  description: "Theyyam is an awe-inspiring, primordial ritual dance and sacred possession ceremony of North Kerala where mortals transcend human consciousness to become living embodiments of forest deities, hero-spirits, and fierce manifestations of the Goddess (Bhagavathi). Performed exclusively within sacred forest groves (Kavus) and ancestral temple shrines under the open night sky, Theyyam incorporates monumental bamboo and areca-nut headdresses (Mudi) towering up to 50 feet into the air, surreal face painting crafted from ground turmeric, vermilion, and rice paste, and flaming skirts of burning palm leaves. The performer, having undergone rigorous fasting and spiritual purification, dances into ecstatic trances to the deafening, bone-shattering beats of the Chenda and Ilathalam, leaping fearlessly across glowing embers and fire pits while uttering divine prophecies and blessings to waiting village devotees.",
  culturalRole: "Theyyam serves as a profoundly egalitarian social safety valve and spiritual pillar in Malabar. In a historic inversion of feudal caste hierarchy, performers belonging to traditionally marginalized communities (Malayan, Vannan, Velan) are transformed into supreme deities whom all members of society, including high-caste landlords, must bow before and seek blessings, moral counsel, and justice from.",
  festivalConnection: "The Theyyam Season runs annually from October/November (Thulam) to May (Edavam) across hundreds of village Kavus and shrines in Kannur, Kasaragod, and Wayanad; also celebrated during Vishu and Onam.",
  heritageConnection: "Padmanabhapuram Palace (reflecting classical Travancore wooden architecture) and the ancient sacred Kavus (virgin sacred rainforest groves) of Kannur and Bekal Fort.",
  costume: "Hyper-ornate sacred attire consisting of natural red and yellow body pigments, coconut-leaf fringes (Kavacham), massive carved wooden breastplates, silver eye coverings, and colossal, sky-piercing Mudi headdresses fashioned from bamboo splints, painted cotton, peacock feathers, and palm fronds. Often accompanied by skirts of burning dry coconut fronds.",
  music: "Thunderous, primal ritual rhythm driven by intense Chenda patterns (Asura Vadyam) accelerating to dizzying trance speeds, accompanied by ritual vocal invocations (Thottam pattu).",
  instruments: [
    "Chenda (cylindrical wooden drum played with curved sticks)",
    "Ilathalam (heavy bell-metal hand cymbals)",
    "Kuzhal (high-pitched double-reed shawm)",
    "Thudi (small hourglass ritual drum)",
    "Kurumkuzhal (short ritual pipe)"
  ],
  facts: [
    "The word 'Theyyam' is linguistically derived from 'Daivam', the Malayalam word for God or Divinity.",
    "There are approximately 400 distinct forms of Theyyam, each with its unique facial painting pattern, mythic lineage, costume, and rhythmic structure.",
    "The Mudi (headdress) of certain Theyyams like Muchilot Bhagavathi can rise over 40 feet high, supported by long wooden balance poles held by assistants.",
    "In the fiery 'Thee Chamundi' Theyyam, the performer leaps repeatedly into a colossal heap of burning embers (Melamkuzhi) hundreds of times unharmed.",
    "The intricate face makeup (Mukhathezhuthu) takes between 4 to 8 hours to complete using only organic forest minerals and ground herbal pastes.",
    "During the performance, the dancer holds a polished bronze mirror (Nokku Kannadi) to gaze into their divine reflection, marking the precise moment of sacred transformation."
  ],
  objects: [
    "Monumental carved and painted bamboo Mudi (headdress) crowned with peacock plumage",
    "Traditional ritual Chenda drum with ox-hide drumheads and tamarind wood sticks",
    "Hand-carved wooden breastplate (Mar-kavacham) embellished with red beads and brass mirrors",
    "Heavy bronze Nokku Kannadi ritual divination mirror",
    "Pair of thick bell-metal Ilathalam cymbals"
  ],
  objects: [
    "Monumental carved and painted bamboo Mudi (headdress) crowned with peacock plumage",
    "Traditional ritual Chenda drum with ox-hide drumheads and tamarind wood sticks",
    "Hand-carved wooden breastplate (Mar-kavacham) embellished with red beads and brass mirrors",
    "Heavy bronze Nokku Kannadi ritual divination mirror",
    "Pair of thick bell-metal Ilathalam cymbals"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/theyyam.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/lnNieCUG4G4",
  youtubeId: "lnNieCUG4G4",
  videoTitle: "Kerala — Theyyam Cultural Showcase",
  arVrPotential: "Full volumetric 3D capture of the nighttime fire ritual allows global users to walk through an ancient Malabar sacred grove in VR, experiencing the heat distortion of glowing embers and the massive spatial scale of the 40-foot Mudi headdress.",
  threeDExperience: "In this 3D studio, marvel at the sacred architectural majesty of the Theyyam manifestation: examining the skyward verticality of the painted Mudi headdress, the hypnotic sacred geometry of the organic facial pigmentation, and the high-tension woodgrain of the ceremonial Chenda drum."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_08"] = state_08_data;
  window.YUGMA_STATES_DATA["kerala"] = state_08_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_08_data;
}
