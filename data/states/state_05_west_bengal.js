/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 05: West Bengal — Baul
 */

const state_05_data = {
  id: "state_05",
  state: "West Bengal",
  tradition: "Baul",
  category: "Living Cultural Tradition",
  region: "Eastern India",
  origin: "A profound mystical, non-conformist minstrel tradition that coalesced in rural Bengal during the 15th to 17th centuries CE. Bauls synthesize Vaishnava Sahajiya devotionalism, Sufi Islamic mysticism, and Tantric Buddhism, rejecting orthodox caste distinctions and organized religion. Inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity in 2005.",
  period: "15th Century CE to Present (elevated globally by Lalon Fakir in the 18th–19th centuries)",
  description: "Baul is a mystic musical and philosophical tradition of wandering bards who search for the 'Moner Manush' (the inner divine person dwelling within the human heart) through ecstatic singing, acoustic instruments, and spontaneous, trance-like dance. Dressed in saffron robes patchwork quilts (Alkhalla), and carrying the single-stringed Ektara, Bauls wander from village to village across rural Bengal. Their poetry, composed in simple yet profoundly metaphorical Bengali, disdains temple rituals, mosques, holy scriptures, and caste barriers, asserting that the human body is the true temple of the cosmos. As they sing, they strum the Ektara with one hand, strike the Dubki frame drum with the other, sound ankle bells with their feet, and twirl in slow, meditative circles that capture the sweet agony of human yearning for spiritual liberation.",
  culturalRole: "The Bauls have functioned for centuries as the conscience of rural Bengal, fearlessly preaching humanism, religious tolerance, and anti-caste solidarity through music. Their songs heavily influenced Nobel laureate Rabindranath Tagore, who embedded Baul spiritual philosophy and lyrical structures into Rabindrasangeet and modern Bengali literature.",
  festivalConnection: "Poush Mela in Shantiniketan, the historic Joydev Kenduli Mela held on Makar Sankranti along the Ajay River in Birbhum, and Dol Jatra (Holi).",
  heritageConnection: "Victoria Memorial and the historic Bengal Renaissance quarters of Kolkata, the terracotta temples of Bishnupur, and the serene cultural landscape of Rabindranath Tagore's Shantiniketan (UNESCO World Heritage Site).",
  costume: "A flowing unstitched saffron or ochre robe known as the Alkhalla, often stitched from recycled fabric patches symbolizing detachment from worldly wealth. Long uncut hair tied in a loose topknot (Chura), Rudraksha or Tulsi bead necklaces, a cloth sling bag (Jhola), and brass ankle bells (Nupur).",
  music: "Raw, soulful, acoustic folk melodies rooted in the Bhatiyali and Bhawaiya scales of Bengal, characterized by prolonged vocal glides, dramatic shifts between conversational introspection and passionate high-pitched yearning.",
  instruments: [
    "Ektara (single-stringed plucked drone instrument made from gourd and bamboo)",
    "Dotara (four or five-stringed plucked wooden lute)",
    "Dubki / Khanjani (small goatskin tambourine)",
    "Khamak (tension drum with acoustic pluck string)",
    "Ghungroo / Nupur (brass ankle bells)"
  ],
  facts: [
    "In 2005, the Baul songs of Bengal were proclaimed among the Masterpieces of the Oral and Intangible Heritage of Humanity by UNESCO.",
    "The legendary 18th-century mystic philosopher Lalon Fakir composed thousands of Baul songs promoting secular humanism.",
    "Rabindranath Tagore was so deeply inspired by Baul philosophy that he referred to himself as a 'Rabindra-Baul'.",
    "The primary instrument, the Ektara, has only one string, symbolizing the singular unity of the cosmic divine.",
    "Baul philosophy considers the human body (Deho) as the universe in microcosm, stating that what is not in the body is nowhere in the universe.",
    "The annual Kenduli Mela in Birbhum attracts thousands of wandering Baul singers who camp and sing under the stars for days."
  ],
  objects: [
    "Handcrafted Gourd-and-Bamboo Ektara with goatskin parchment and steel string",
    "Carved Neem-wood Dotara with bone bridge and plectrum",
    "Earthenware and parchment Khamak tension drum",
    "Saffron Alkhalla robe with hand-stitched Kantha patchwork embroidery",
    "Set of hand-forged brass Nupur ankle bells"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/baul.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/QqJU_YpGeNs",
  youtubeId: "QqJU_YpGeNs",
  videoTitle: "West Bengal — Baul Folk Tradition Showcase",
  arVrPotential: "Spatial audio simulations can position the listener by a campfire on the banks of the Ajay River at Kenduli Mela, with authentic binaural positioning for the resonant plucking of the Ektara and rustling saffron Alkhalla.",
  threeDExperience: "In this 3D studio, inspect the organic acoustic engineering of the Baul tradition: studying the dried bottle-gourd resonator of the Ektara, the weathered Kantha stitches of the wandering minstrel's Alkhalla robe, and the carved wood finish of the Dotara."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_05"] = state_05_data;
  window.YUGMA_STATES_DATA["west_bengal"] = state_05_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_05_data;
}
