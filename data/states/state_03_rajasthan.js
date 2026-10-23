/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 03: Rajasthan — Kalbelia
 */

const state_03_data = {
  id: "state_03",
  state: "Rajasthan",
  tradition: "Kalbelia",
  category: "Living Cultural Tradition",
  region: "North-Western India",
  origin: "Originating with the nomadic Kalbelia snake-charmer community of Rajasthan's Thar Desert. Traditionally, members caught venomous serpents and traded snake venom. When wildlife acts banned the practice, the women transformed their ancestral snake-mimicking movements into an internationally celebrated dance. Inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity in 2010.",
  period: "Ancient Nomadic Antiquity to Contemporary Global Heritage",
  description: "Kalbelia is a sensuous, serpentine folk dance and musical tradition of Rajasthan performed exclusively by the women of the nomadic Kalbelia community while men provide hypnotic acoustic accompaniment. Wearing flowing jet-black skirts embellished with silver ribbons and colorful embroidery, the dancers emulate the sinuous, fluid movements, coils, and sudden lunges of the cobra. The performance escalates to breathtaking acrobatic climaxes where dancers bend backwards to pick up rings, currency notes, or razors with their eyelids and lips while balancing pots on their heads. Propelled by the wailing melody of the Poongi (been) and the pounding of the Daflie, Khanjari, and Dholak, Kalbelia is an intoxicating desert celebration of agility, animal intuition, and human survival in the arid dunes of Rajasthan.",
  culturalRole: "Kalbelia dance was an organic byproduct of the community's intimate relationship with desert fauna and nomadic wanderings. It serves as a vital economic lifeline, community identity anchor, and oral history repository. Passing from mother to daughter without formal scripts, it preserves deep knowledge of desert ecology, herbalism, and folk poetry.",
  festivalConnection: "Pushkar Camel Fair, Jaisalmer Desert Festival, Marwar Festival in Jodhpur, Teej, and Gangaur.",
  heritageConnection: "Amber Fort (Jaipur), Jaisalmer Golden Fort, Mehrangarh Fort, and the vast sand sea of the Sam Sand Dunes in the Thar Desert.",
  costume: "Striking jet-black two-piece Ghagra-Choli (Angrakhi and Lengha) made of heavy cotton, densely stitched with silver Gota ribbons, intricate mirrorwork, colorful patchwork, and Cowrie shells designed to mimic the iridescent scales of a serpent in motion. Accompanied by black Odhani veils, beaded bone necklaces, silver armlets, and finger rings.",
  music: "Hypnotic, microtonal desert melodies marked by the continuous drone and high-pitched wail of the Poongi, accompanied by pulsating, polyrhythmic percussion on tambourine-style frame drums.",
  instruments: [
    "Poongi / Been (double-reed gourd wind instrument of snake charmers)",
    "Duf / Daflie (large shallow wooden frame drum)",
    "Khanjari (circular tambourine with brass jingles)",
    "Morchang (metal jaw harp)",
    "Dholak"
  ],
  facts: [
    "In 2010, Kalbelia folk songs and dances of Rajasthan were inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity.",
    "The Kalbelia tribe traces its legendary descent from Guru Gorakhnath and considers the cobra sacred, never harming it.",
    "The dance steps, choreographies, and lyrics are never written down; they are transmitted entirely orally across generations.",
    "Famous Kalbelia pioneer Gulabo Sapera brought the dance from the sands of Rajasthan to the world's most prestigious cultural stages.",
    "Dancers often perform hazardous feats of flexibility, such as bending completely backwards to retrieve small coins with their eyelashes.",
    "The swirling black costume is specifically tailored to create vortex patterns reminiscent of coiled serpents striking."
  ],
  objects: [
    "Traditional Dried Bitter-Gourd Poongi (Been) with bamboo finger tubes and beeswax seals",
    "Flared Black Silk and Cotton Kalbelia Ghagra with silver gota ribbons and mirrorwork",
    "Wooden Daflie frame drum with stretched parchment head",
    "Hand-forged Iron Morchang (jaw harp)",
    "Strung Cowrie Shell Armlets and Silver Borla forehead jewel"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/kalbelia.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/22p2YfSt3ZU",
  youtubeId: "22p2YfSt3ZU",
  videoTitle: "Rajasthan — Kalbelia Folk Tradition Showcase",
  arVrPotential: "AR spatial visualization can reveal the high-speed rotational mechanics and spine-bending physics of Kalbelia dancers, overlaid with real-time acoustic waveform analysis of the Poongi's microtonal desert scales.",
  threeDExperience: "In this 3D studio, inspect the undulating serpentine silhouette of the Kalbelia dancer: exploring the intricate Gota-patti embroidery that mimics reptile scales, the organic curvature of the dried gourd Poongi, and the resonant skin of the Daflie frame drum."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_03"] = state_03_data;
  window.YUGMA_STATES_DATA["rajasthan"] = state_03_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_03_data;
}
