/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 14: Chhattisgarh — Panthi
 */

const state_14_data = {
  id: "state_14",
  state: "Chhattisgarh",
  tradition: "Panthi",
  category: "Living Cultural Tradition",
  region: "Central India",
  origin: "Emanates from the revolutionary Satnami religious reform movement founded in the late 18th and early 19th centuries by the great saint-reformer Guru Ghasidas in Chhattisgarh. The movement championed absolute social equality, truth, spiritual brotherhood, and the fierce rejection of caste discrimination, idol worship, and social hierarchy.",
  period: "Late 18th Century CE (Guru Ghasidas Era) to Present",
  description: "Panthi is an electrifying, deeply devotional and acrobatic ritual folk dance of the Satnami community of Chhattisgarh. Performed around a white sacred pillar (Jaitkham) symbolizing truth, purity, and universal equality, the dancers combine ecstatic devotional singing (Panthi Geet) with daring gymnastic pyramids and high-velocity leaps. Clad in simple white dhotis with bare chests, the dancers move in circles under the leadership of a lead singer (Guru), singing verses celebrating the philosophical teachings of Guru Ghasidas and the ephemeral nature of the mortal body. Propelled by the rapid, hypnotic cadence of the Mandar drum and the ringing clang of the Jhanjh cymbals, the tempo accelerates dramatically into breathtaking human pyramids of three and four tiers, embodying the collective spiritual ascent of humanity toward supreme truth.",
  culturalRole: "Panthi is far more than entertainment; it is a sacred socio-religious manifesto and declaration of equality for Chhattisgarh's historically oppressed Dalit communities. It serves as an inspiring oral chronicle of the Satnam philosophy, promoting clean living, moral discipline, truth, non-violence, and fearless social resistance against inequality across rural Central India.",
  festivalConnection: "Maghi Purnima (the grand annual celebration of Guru Ghasidas Jayanti celebrated across Chhattisgarh, especially at the pilgrimage shrine of Girodhpuri Dham), Dussehra, and Hareli festival.",
  heritageConnection: "Sirpur Heritage Complex (7th-century brick masterpiece Lakshmana Temple and Gandheswar Temple along the Mahanadi River), the Bhoramdeo Temple, and the sacred Jaitkham monument at Girodhpuri Dham (India's tallest religious tower).",
  costume: "Pure white pristine cotton Dhoti worn with a tight waistband, symbolizing spiritual purity (Satnam). Dancers keep their chests bare or wear a simple white sleeveless jacket, adorned with wooden bead Kantha necklaces, white sacred turbans, brass bells on wrists and ankles, and sandalwood paste tilak.",
  music: "Passionate, high-octane devotional chorus singing led by the master vocalist and drummer, marked by accelerating tempos that drive the dancers into religious and athletic ecstasy.",
  instruments: [
    "Mandar (deep-toned earthenware barrel drum unique to Chhattisgarh)",
    "Jhanjh (large heavy brass cymbals with explosive resonance)",
    "Dholak (supporting folk drum)",
    "Kasaudi (small bell-metal percussion instrument)",
    "Harmonium"
  ],
  facts: [
    "Panthi dance was popularized nationally and globally by the legendary maestro Dr. Radheshyam Sharma, who was awarded the Padma Shri for his lifelong devotion to the art.",
    "The central white flag-post around which Panthi is danced is called 'Jaitkham' (Victory Pillar of Truth), symbolizing human equality without caste distinction.",
    "Performers build human pyramids up to three and four tiers high while continuously singing and maintaining complex foot rhythms.",
    "The lyrics of Panthi songs (Panthi Geet) are steeped in profound spiritual philosophy, describing the human body as a temporary cage made of dust.",
    "Guru Ghasidas coined the immortal philosophy 'Mankhe Mankhe Ek Samaan' (All human beings are equal by birth), which forms the lyrical bedrock of every Panthi song.",
    "Girodhpuri in Chhattisgarh houses the Jaitkham monument, standing 77 meters tall—taller even than the Qutub Minar in Delhi."
  ],
  objects: [
    "Sacred miniature white wooden Jaitkham pillar with triangular white flag",
    "Traditional Clay-and-Leather Mandar drum with jute suspension cord",
    "Heavy bell-metal Jhanjh cymbals with woven red tassels",
    "Hand-spun white Khadi Cotton Dhoti with crimson border",
    "Tulsi wood and Rudraksha Kantha bead necklace worn by Satnami performers"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/panthi.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/Qe6_Vy2hleg",
  youtubeId: "Qe6_Vy2hleg",
  videoTitle: "Chhattisgarh — Panthi Folk Showcase",
  arVrPotential: "VR spatial architectural reconstruction of the Girodhpuri pilgrimage grounds during Maghi Purnima, allowing users to look up from ground level at a full 4-tier live Panthi human pyramid forming in real time with 3D spatial acoustics of the Mandar drum.",
  threeDExperience: "In this 3D studio, explore the sacred verticality and dynamic balance of Panthi: admiring the symbolic architectural symmetry of the white Jaitkham pillar, the handcrafted terracotta curvature of the indigenous Mandar drum, and the polished brass surface of the resonant Jhanjh cymbals."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_14"] = state_14_data;
  window.YUGMA_STATES_DATA["chhattisgarh"] = state_14_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_14_data;
}
