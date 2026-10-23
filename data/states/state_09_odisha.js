/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 09: Odisha — Odissi
 */

const state_09_data = {
  id: "state_09",
  state: "Odisha",
  tradition: "Odissi",
  category: "Living Cultural Tradition",
  region: "Eastern India",
  origin: "Ancient classical dance tradition of Odisha originating in the temple sanctums of Lord Jagannath at Puri. Performed by consecrated female temple dancers (Maharis) and later preserved by young male dancers (Gotipuas). Archaeological evidence dates Odissi to the 2nd century BCE, with sculptures carved across the Rani Gumpha caves of Udayagiri and Khandagiri.",
  period: "2nd Century BCE (Kalinga Empire) to 12th Century CE (Ganga Dynasty) to Present",
  description: "Odissi is globally renowned for its lyrical sensuality, sculptural stillness, and deeply devotional surrender to Lord Jagannath. Distinguishable from all other Indian classical dances by its foundational dual postures—Chowka (a masculine, wide square stance representing Lord Jagannath's cosmic equilibrium) and Tribhanga (a feminine, tri-bent posture where the body forms an exquisite S-curve across head, torso, and hips, mirroring classic temple statuary). Dancers weave fluid torso deflections with crisp, intricate foot-rhythms set to the deep resonance of the Mardala drum. The repertoire progresses from the spiritual salutation (Mangalacharan) and pure rhythmic exploration (Battu and Pallavi) to the divine love poetry of Jayadeva's Gita Govinda (Abhinaya), culminating in the transcendent cosmic ecstasy of Moksha.",
  culturalRole: "Odissi is the aesthetic and spiritual soul of Odisha, intimately interwoven with the daily rituals of the Jagannath Temple in Puri. It serves as a living bridge between ancient Kalinga stone architecture and human movement, preserving centuries of Odia classical poetry, Sanskrit literature, and spiritual surrender across unbroken guru-shishya lineages.",
  festivalConnection: "Konark Dance Festival (staged before the backdrop of the Sun Temple), Mukteshwar Dance Festival in Bhubaneswar, Puri Ratha Yatra, and Raja Parba.",
  heritageConnection: "Konark Sun Temple (the UNESCO World Heritage Black Pagoda whose Natamandira dance hall features hundreds of sculpted celestial dancers), Jagannath Temple in Puri, and the Udayagiri-Khandagiri Caves.",
  costume: "Handwoven Odisha Sambalpuri or Bomkai pure silk saree with distinctive temple borders, pleated front fan, and draped pallu. Adorned with delicate handcrafted Cuttack Tarakasi (silver filigree) jewelry, a white sponge-wood crown (Mukoot or Tahia) resembling blooming temple lotuses, and Alta red dye adorning feet and hands.",
  music: "Odissi classical music, an ancient distinct tradition possessing its own classical ragas, talas, and melodic ornamentation, marked by soulful lyrical sweetness.",
  instruments: [
    "Mardala (two-headed barrel drum native to Odisha, sacred to temple rituals)",
    "Bansuri (bamboo flute)",
    "Manjira / Gini (small brass hand cymbals)",
    "Sitar / Violin",
    "Tanpura (harmonic drone)"
  ],
  facts: [
    "Odissi is considered the oldest surviving classical dance tradition of India based on archaeological and sculptural evidence from the 2nd century BCE.",
    "The distinctive Tribhanga posture creates three gentle bends in the body: at the neck, waist, and knee, replicating sacred Indian stone iconography.",
    "The 13th-century Sun Temple at Konark features an entire open-air dance hall (Natamandira) carved with every single hand mudra and body stance of Odissi.",
    "The silver filigree jewelry worn by dancers is handcrafted using 'Tarakasi', a world-famous 500-year-old metal art form from Cuttack, Odisha.",
    "The white floral headgear (Tahia) represents the reeds and lotus blossoms floating on sacred temple ponds.",
    "Pioneering master Guru Kelucharan Mohapatra revived and codified modern Odissi in the mid-20th century, elevating it onto the international stage."
  ],
  objects: [
    "Traditional Cuttack Silver Filigree (Tarakasi) waist belt (Bengapatia) and hair ornaments",
    "Hand-carved white Sholapith floral Tahia crown with flower crests",
    "Sambalpuri Silk Ikat Saree with traditional red and black temple spire borders",
    "Ceremonial Jackwood Mardala drum with natural leather skins and tuning paste",
    "Silver Filigree armlets (Bahubandha) and ear ornaments (Kapa)"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/odissi.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/Uqmc0891L2U",
  youtubeId: "Uqmc0891L2U",
  videoTitle: "Odisha — Odissi Cultural Showcase",
  arVrPotential: "Interactive 3D overlays comparing real-time dancer movements directly against the 13th-century stone reliefs of the Konark Sun Temple Natamandira, highlighting 800 years of sculptural continuity.",
  threeDExperience: "In this 3D studio, study the sublime sculptural equilibrium of the Odissi form: admiring the three-dimensional S-curve of the Tribhanga posture, the delicate lace-like geometry of Cuttack silver filigree, and the rhythmic proportions of the sacred Mardala drum."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_09"] = state_09_data;
  window.YUGMA_STATES_DATA["odisha"] = state_09_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_09_data;
}
