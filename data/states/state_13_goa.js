/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 13: Goa — Fugdi
 */

const state_13_data = {
  id: "state_13",
  state: "Goa",
  tradition: "Fugdi",
  category: "Living Cultural Tradition",
  region: "Western India",
  origin: "An ancient indigenous Konkani folk dance tradition performed exclusively by women of Goa's agrarian and coastal communities (including the Dhangar, Gavda, and Kunbi communities). Originating centuries before the arrival of Portuguese colonizers, it was performed during religious rites and harvest festivals as an exuberant expression of communal joy and physical release from daily agricultural toil.",
  period: "Pre-Portuguese Indigenous Antiquity (over 800 years) to Present",
  description: "Fugdi is an infectious, high-energy community folk dance of Goa performed by women forming circles or facing each other in pairs with arms interlocked. Commencing with slow, graceful invocations to Hindu deities such as Ganesha and the local earth goddesses, the dancers sing traditional Konkani folk verses while clapping their hands in syncopated counterpoint. As the tempo steadily increases, the movement transforms into an astonishing display of rapid foot-stamps, twirls, squats, and leaps. In the most famous variation, 'Kalo Fugdi' and 'Katti Fugdi' (using coconut shells), dancers spin at dizzying speeds while blowing air through their mouths with a distinctive rhythmic blowing sound ('FOO-FOO'), which gave the dance its name 'Fugdi'. The dance requires formidable stamina, agility, and communal synchronization, ending in an exhilarating crescendo of laughter and shared jubilation.",
  culturalRole: "Fugdi serves as an essential celebration of sisterhood, female solidarity, and physical release from rural labor in Goan society. It preserves indigenous Konkani folk songs, oral folklore, and ancient pre-colonial customs, acting as an indestructible cultural anchor that survived centuries of colonial suppression and continues to thrive in village courtyards and modern state festivals alike.",
  festivalConnection: "Ganesh Chaturthi (where Fugdi is danced before family and village Ganesha shrines), Dhalo festival (winter women's cultural festival), Shigmo (Goan spring carnival), and the harvesting season.",
  heritageConnection: "Basilica of Bom Jesus and Old Goa (UNESCO World Heritage Site), the ancient 12th-century Kadamba-era Mahadev Temple at Tambdi Surla, and the tranquil verdant foothills of the Western Ghats (Sahyadris).",
  costume: "Traditional bright red and check-patterned Kunbi handloom cotton saree, draped knee-length (Kashti style) with a graceful knot on the shoulder to facilitate rapid jumping and squatting movements. Dancers adorn their hair with fresh wild flowers and fragrant Abolim or mogra garlands, wearing red glass bangles, silver toe-rings, and gold nose-studs.",
  music: "Vocal singing in pure Konkani without melodic instruments; the music is generated entirely by the dancers' own voices, hand-claps, footwork, and rhythmic respiratory blowing sounds ('FOO-FOO').",
  instruments: [
    "Dhol (used in communal processions)",
    "Ghumat (indigenous Goan terracotta percussion drum with monitor-lizard skin head, now synthetic)",
    "Katti (polished coconut shells struck rhythmically)",
    "Taal (small brass hand cymbals)",
    "Shamel (supporting wooden drum)"
  ],
  facts: [
    "The name 'Fugdi' is derived from the distinctive 'FOO-FOO' sound that dancers produce by expelling breath rhythmically through their lips at peak tempo.",
    "Fugdi is unique among Indian folk dances because it is frequently performed entirely a cappella—using no musical instruments other than human hands, feet, and breath.",
    "In the 'Katti Fugdi' variation, dancers hold halves of polished coconut shells in each hand, striking them against their partner's shells in complex cross-rhythms.",
    "During the Portuguese colonial era, native Goan folk dances were banned in public spaces, but village women secretly preserved Fugdi inside their domestic courtyards.",
    "The traditional Kunbi saree worn for Fugdi was revived through the dedicated research and fashion advocacy of Goan designer Wendell Rodricks.",
    "There are over 20 sub-styles of Fugdi in Goa, including Kalashi Fugdi (danced while balancing heavy copper water pots on the head)."
  ],
  objects: [
    "Hand-woven red and white checked Goan Kunbi Cotton Saree with traditional Kashti border",
    "Pair of polished, hand-carved Katti (coconut half-shells) used for rhythmic percussion",
    "Goan Terracotta Ghumat percussion pot with braided rope bindings",
    "Traditional Abolim and Mogra fresh floral hair garland (Veni)",
    "Hand-beaten Goan Brass Kalashi (water urn) used in balance-dance variations"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/fugdi.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/EokuS_QbkEM",
  youtubeId: "EokuS_QbkEM",
  videoTitle: "Goa — Fugdi Folk Showcase",
  arVrPotential: "AR volumetric spatial audio capture recreates the intimate acoustic reverberation of an open-air village courtyard (Aangan) in Goa, tracking the synchronized respiratory 'FOO' breath-puffs and clapping patterns in 3D binaural space.",
  threeDExperience: "In this 3D studio, inspect the earthy rustic elegance of Goa's living tradition: exploring the rough-spun weave of the authentic Kunbi cotton saree, the smooth polished resonance of the coconut-shell Katti, and the earthen clay curvature of the indigenous Goan Ghumat drum."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_13"] = state_13_data;
  window.YUGMA_STATES_DATA["goa"] = state_13_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_13_data;
}
