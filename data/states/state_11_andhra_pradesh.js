/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 11: Andhra Pradesh — Kuchipudi
 */

const state_11_data = {
  id: "state_11",
  state: "Andhra Pradesh",
  tradition: "Kuchipudi",
  category: "Living Cultural Tradition",
  region: "Southern India",
  origin: "Originated in the village of Kuchelapuram (Kuchipudi) in Krishna district, Andhra Pradesh. Systematized in the 14th–15th centuries CE by the saint-poet Siddhendra Yogi, who composed the dance-drama Bhama Kalapam. Traditionally practiced by traveling male Brahmin troupes known as Kuchipudi Bhagavathulu, it received royal land grants and state patronage from Vijayanagara Emperor Krishnadevaraya and the Nawabs of Golconda.",
  period: "14th–16th Century CE to Present",
  description: "Kuchipudi is a dazzling classical dance-drama tradition of Andhra Pradesh that uniquely fuses crisp, athletic classical footwork with dramatic spoken dialogue, rich theatrical impersonation, and fluid lyrical grace. Unlike purely solo dance styles, Kuchipudi retains deep theatrical roots as an opera-like dance drama (Natyam). Performers seamlessly transition from singing and speaking classical Telugu verse to executing complex rhythmic foot-patterns and abhinaya. A signature virtuoso highlight of the solo Kuchipudi repertoire is the 'Tarangam', where the dancer balances gracefully with their bare feet positioned upon the sharp raised rim of a heavy polished brass plate (Thali), rhythmically striking the brass while maintaining an earthen or brass pot filled with water perched upon their head.",
  culturalRole: "Kuchipudi stands as Andhra Pradesh's premier classical cultural ambassador, linking devotional temple Vaishnavism with village theatrical traditions. It preserves ancient Sanskrit and Telugu dramatic literature, philosophical discourses on spiritual surrender, and an unbroken lineage of hereditary guru families (Natyacharyas) who have handed down this sacred discipline through centuries.",
  festivalConnection: "Ugadi (Telugu New Year), Brahmotsavam at Tirumala, the annual Kuchipudi Dance Festival in Kuchelapuram, and Maha Shivaratri at Srisailam.",
  heritageConnection: "Lepakshi Veerabhadra Temple (renowned for its 16th-century Vijayanagara hanging pillar and stone relief carvings of celestial dancers and drummers), Amaravati Buddhist Stupa, and the rock-cut Undavalli Caves.",
  costume: "Vibrant handwoven silk saree tailored with a distinctive pleated front fan, embroidered borders, and a waist sash (Katcham). Dancers wear rich Temple Jewelry (Surya-Chandra headpieces, Rakodi, Jhumkas, Kasu Mala coin necklace, and Vanki armlets), fresh jasmine garlands, and heavy brass Ghungroo ankle bells.",
  music: "Carnatic classical music performed with resonant Telugu poetic lyrics, driven by complex Jathis (rhythmic mnemonics) recited live by the Nattuvanar wielding bronze cymbals.",
  instruments: [
    "Mridangam (double-sided Carnatic classical drum)",
    "Nattuvangam / Talam (pair of thick bronze cymbals)",
    "Flute (Carnatic bamboo flute)",
    "Violin",
    "Tambura (harmonic drone)"
  ],
  facts: [
    "Kuchipudi is the only classical dance style named directly after the village of its birth: Kuchelapuram in Krishna district, Andhra Pradesh.",
    "The 16th-century Vijayanagara Emperor Krishnadevaraya was a passionate patron of Kuchipudi Bhagavathas and gifted them royal village lands.",
    "In the virtuoso Tarangam item, dancers execute complex rhythmic patterns while balancing on the razor-sharp edge of a circular brass plate.",
    "Traditionally, all roles—both male heroes and seductive female heroines like Satyabhama—were enacted exclusively by young Brahmin men.",
    "Legendary guru Vedantam Satyanarayana Sarma was globally celebrated for his peerless, divine portrayal of the female character Satyabhama.",
    "In 2012, a record-setting Kuchipudi performance in Hyderabad brought together 5,794 dancers from across 16 countries onto a single stage."
  ],
  objects: [
    "Polished brass Tarangam plate with raised rim used for balance dancing",
    "Carved Jackwood Mridangam drum with concentric leather tuning membranes",
    "Traditional Andhra Silk Costume with pleated cascading fan and gold Zari",
    "Hand-cast bronze Nattuvangam cymbals with wooden striker",
    "Pair of gold-plated Vanki (V-shaped armlets) and Kasu Mala gold coin necklace"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/kuchipudi.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/ko5sKNuSLbs",
  youtubeId: "ko5sKNuSLbs",
  videoTitle: "Andhra Pradesh — Kuchipudi Classical Showcase",
  arVrPotential: "VR balance-simulation engine enabling users to explore the center-of-gravity physics of balancing on a brass Tarangam rim, tracking head stabilization and foot-strike forces during fast rhythmic tempo changes.",
  threeDExperience: "In this 3D studio, observe the dynamic equilibrium of Kuchipudi: examining the polished, light-reflecting contour of the brass Tarangam plate, the flowing golden borders of the pleated silk costume, and the acoustic depth of the temple-tuned Mridangam drum."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_11"] = state_11_data;
  window.YUGMA_STATES_DATA["andhra_pradesh"] = state_11_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_11_data;
}
