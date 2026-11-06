# -*- coding: utf-8 -*-
"""
Builder to construct the enhanced js/aiVisualizer.js
"""

import json

# Define the monument dossiers with deep multi-agent content
MONUMENTS = {
    "taj_mahal": {
        "title": "The Taj Mahal & Mughal Architectural Symphony",
        "keywords": ["taj", "taj mahal", "agra", "shah jahan", "mumtaz", "makrana", "pietra dura"],
        "orchestrator": (
            "The Taj Mahal in Agra, Uttar Pradesh, is humanity's quintessential monument to love and Mughal architectural perfection, commissioned in 1631 by Emperor Shah Jahan for Empress Mumtaz Mahal. Built over 22 years of translucent white Makrana marble brought from Rajasthan, the complex embodies rigorous bilateral symmetry along a central charbagh water garden. Its four minarets stand at 40 meters, tilted slightly outward by 2 degrees to protect the central dome from collapse during earthquakes. Intricate Pietra Dura stone inlays integrate forty varieties of precious gemstones into floral calligraphy along the Yamuna riverfront."
        ),
        "historian": (
            "Commissioned in 1631 during the zenith of the Mughal Empire under Shah Jahan, the Taj Mahal commemorates Empress Arjumand Banu Begum (Mumtaz Mahal), who died giving birth to her fourteenth child. Over 20,000 artisans, sculptors, and calligraphers from Shiraz, Samarkand, Bukhara, and Lahore were overseen by imperial architect Ustad Ahmad Lahori. The complex cost over 32 million rupees at the time—equivalent to hundreds of millions of dollars today—and includes Persian calligraphic inscriptions executed by Abd-ul-Haqq (Amanat Khan) that progress from the Quranic gates toward the inner cenotaphs."
        ),
        "architect": (
            "From an engineering standpoint, the Taj Mahal is a masterpiece of hydraulic and seismic design. Built atop the silty banks of the Yamuna River, its foundation rests on a deep subterranean network of masonry wells filled with rubble and sal wood beams, continuously preserved by the river's moisture table. The central double-dome features a high exterior bulbous shell rising 73 meters and an inner acoustic dome creating a 28-second reverberation time for sacred chants. The four outward-canted minarets prevent structural collision during seismic shocks, while optical illusions make the monument appear equidistant whether viewed from the royal gateway or the inner garden."
        ),
        "lore": (
            "Popular lore romanticizes the Taj Mahal as the earthly replica of Jannat-ul-Firdaus (the Garden of Paradise). Legend tells that the Makrana marble was chosen because it reflects the emperor's changing moods—blushing soft pink in the morning dawn, gleaming milky white under midday sun, and glowing luminescent gold under the full moon. Mythological rumors of a matching 'Black Taj Mahal' across the river for Shah Jahan himself persist in traveler folklore, though archaeological excavations revealed the Mehtab Bagh pool built to reflect the moonlit white mausoleum instead."
        ),
        "travel": (
            "To experience the Taj Mahal at its most ethereal, arrive at the East or West gate at sunrise (around 5:30 to 6:00 AM) before morning crowds and heavy heat arrive. The monument is closed on Fridays for prayers. Bring minimal belongings to pass security rapidly, and ensure shoe covers are worn on the marble plinth. For magical sunset photography without crowds, cross the Yamuna to Mehtab Bagh (Moonlight Garden) where the reflection in the river offers postcard-perfect panoramic views without stepping inside the main complex."
        )
    },
    "konark": {
        "title": "Konark Sun Temple: The Cosmic Stone Chariot",
        "keywords": ["konark", "sun temple", "odisha", "surya", "chariot", "wheel", "sundial", "kalinga"],
        "orchestrator": (
            "The 13th-century Konark Sun Temple in Odisha represents the zenith of ancient Kalinga stone masonry, conceived by King Narasimhadeva I of the Eastern Ganga Dynasty. Designed as a gargantuan celestial chariot for Surya the Sun God, the temple rests upon 24 monumental carved stone wheels pulled by seven galloping horses symbolizing the days of the week. Built of Khondalite stone near the Bay of Bengal, the temple's wheels serve as high-precision sundials capable of calculating time down to minutes using the sun's shadow across intricate spokes."
        ),
        "historian": (
            "Constructed between 1238 and 1264 CE, Konark celebrated King Narasimhadeva I's military victories against the Delhi Sultanate forces of Tughral Tughan Khan, establishing Eastern Ganga naval and martial hegemony along the eastern seaboard. Legend holds that 1,200 master craftsmen laboured for twelve years under chief architect Bisu Maharana. The temple was famously described by Nobel laureate Rabindranath Tagore: 'Here the language of stone surpasses the language of human beings.' European mariners later dubbed its dark Khondalite sanctuary the 'Black Pagoda' as a vital navigational landmark."
        ),
        "architect": (
            "The engineering of Konark incorporated massive iron beams and interlocking stone clamps without mortar. Its central Vimana originally soared over 68 meters before its sanctum collapse in medieval times. The 24 stone wheels are masterpieces of chronometric astronomy: each wheel features 8 major spokes representing the eight praharas (3-hour divisions of the day) and 8 minor spokes. By tracking the shadow cast by the hub over the decorative beadings on the rim, priests calculated solar hours with remarkable precision across seasonal equinoxes and solstices."
        ),
        "lore": (
            "According to the Bhavishya Purana, the temple was founded where Samba, son of Lord Krishna, was cured of a twelve-year affliction of leprosy after performing intense penance to Surya along the sacred Chandrabhaga River. Another popular folklore recounts young Dharmapada, the twelve-year-old son of master builder Bisu Maharana, who mounted the temple's final heavy magnetic crowning kalasha (dadhibikrama) when all 1,200 artisans failed, then leapt into the ocean to save the artisans from royal execution."
        ),
        "travel": (
            "Visit Konark early in the morning when the first golden rays of the sunrise strike the eastern Natya Mandapa (Hall of Dance) at a low angle, illuminating the thousands of sculpted musicians and dancers. The site is open daily from sunrise to sunset. Pair your trip with the nearby Chandrabhaga Beach (3 km away) and the Konark Dance Festival held every December in the open-air Natya Mandapa beneath the floodlit chariot walls."
        )
    },
    "ajanta_ellora": {
        "title": "Ajanta & Ellora Rock-Cut Monolithic Wonders",
        "keywords": ["ajanta", "ellora", "kailasa", "cave", "rock-cut", "basalt", "maharashtra", "aurangabad"],
        "orchestrator": (
            "Carved into the dramatic volcanic basalt cliffs of the Deccan Plateau in Maharashtra, the Ajanta and Ellora cave complexes represent the summit of rock-cut Indian architecture. Ajanta features 30 Buddhist chaityas and viharas decorated with 2nd-century BCE tempera murals of the Jataka tales. Ellora features 34 caves uniting Buddhist, Hindu, and Jain sanctuaries along a single escarpment, crowned by Cave 16: the magnificent monolithic Kailasa Temple, excavated from top to bottom by removing over 200,000 tonnes of solid basalt rock without scaffolding."
        ),
        "historian": (
            "Ajanta was excavated in two distinct phases: first under the Satavahana Dynasty (2nd c. BCE to 1st c. CE) and second under the Vakataka Emperor Harishena (5th c. CE). Hidden by dense jungle after Buddhism declined, it was rediscovered in 1819 by British officer John Smith during a tiger hunt. Ellora was crafted between the 6th and 10th centuries CE under the Rashtrakuta and Yadava dynasties, standing as enduring proof of religious harmony and state patronage where three great spiritual traditions flourished side by side."
        ),
        "architect": (
            "Cave 16 at Ellora—the Kailasa Temple—is humanity's largest monolithic rock excavation. Master Rashtrakuta architects employed reverse top-down excavation: carving down through a 100-foot vertical trench to isolate a 200-foot-long rectangular block before sculpting multistoried halls, life-sized monolithic elephants, and a soaring Dravidian shikhara from the rock itself. No stone could be added if miscalculated. At Ajanta, lighting was engineered through strategic entry transoms that reflect natural sunlight onto wall murals primed with clay, cow dung, and rice husks."
        ),
        "lore": (
            "The Kailasa Temple is conceived as the sacred Mount Kailasa, cosmic abode of Lord Shiva in the Himalayas. The famous relief beneath the temple depicts the multi-headed demon king Ravana attempting to shake Mount Kailasa with his mighty arms, while Shiva calmly presses down with his right toe, trapping the arrogant demon beneath the mountain until Ravana composes the sacred Shiva Tandava Stotram in adoration."
        ),
        "travel": (
            "Ajanta and Ellora are located approximately 100 km apart near Aurangabad (Chhatrapati Sambhaji Nagar). Note that Ajanta Caves are closed on Mondays and Ellora Caves are closed on Tuesdays. Ellora requires at least 4 hours; allocate morning hours to Cave 16 (Kailasa) for optimal lighting, then take the local shuttle bus to the Jain Caves (Caves 30-34). For Ajanta, carry a soft torch or mobile light to inspect the darkened fresco sanctums respectfully without flash photography."
        )
    },
    "rani_ki_vav": {
        "title": "Rani Ki Vav: The Subterranean Inverted Water Temple",
        "keywords": ["rani ki vav", "stepwell", "patan", "gujarat", "udayamati", "chaulukya", "solanki", "water"],
        "orchestrator": (
            "Rani Ki Vav in Patan, Gujarat, is a stunning 11th-century subterranean stepwell built as an inverted temple honoring sacred water. Commissioned by Queen Udayamati of the Chaulukya (Solanki) Dynasty in memory of her late husband King Bhima I, the stepwell descends seven tiered pillared galleries into the earth. Its limestone walls host over 500 principal sculptures and a thousand miniature reliefs celebrating Lord Vishnu's avatars, integrating sacred hydrological engineering with exquisite Maru-Gurjara stonework."
        ),
        "historian": (
            "Constructed around 1063 CE, Rani Ki Vav stands out as a monumental civic project commissioned by a widowed queen rather than an emperor. Described in the 14th-century Jain chronicler Merutunga's Prabandha-Chintamani, the stepwell was submerged for centuries under heavy silt from the shifting Saraswati River floodwaters, which miraculously preserved its intricate sculptures in pristine condition until its meticulous excavation by the Archaeological Survey of India in the 1980s."
        ),
        "architect": (
            "Architecturally, Rani Ki Vav is classified as a Nanda-type stepwell, featuring a single corridor entrance and descending westward through seven pavilion levels. The corridors are framed by stepped pillared pavilions supported by carved bracket capitals. The deepest reservoir shaft descends over 28 meters. As water levels fluctuated with seasonal monsoon tables, different sculptural tiers became submerged and revealed, symbolizing the cosmic cycle of creation and dissolution. The Maru-Gurjara carving exhibits razor-sharp stone drapery, pearl necklaces, and kinetic postures."
        ),
        "lore": (
            "The stepwell was conceived as an inverted subterranean temple where water is revered as Amrita (nectar of life). At the water level at the seventh tier rests the magnificent sculpture of Sheshashayi Vishnu, reclining in cosmic slumber upon the thousand-headed serpent Shesha amidst the primordial waters. Folklore speaks of a 30-kilometer underground escape tunnel leading from the lower tier to the nearby royal town of Sidhpur, used by kings during sieges."
        ),
        "travel": (
            "Patan is located 125 km north of Ahmedabad. The best time to visit is during Gujarat's cooler winter months from October to March. Visit in late morning (around 10:30 AM to 1:00 PM) when sunlight penetrates deepest into the lower pavilion tiers, illuminating the Vishnu Dashavatara carvings. Combine your visit with a demonstration of Patan's world-famous double-ikat Patola silk weaving at the local master weaver workshops."
        )
    },
    "hampi": {
        "title": "Hampi: The Vijayanagara Imperial Capital",
        "keywords": ["hampi", "vijayanagara", "vittala", "stone chariot", "karnataka", "krishnadevaraya", "tungabhadra"],
        "orchestrator": (
            "Spread across 4,100 hectares of otherworldly granite boulder hills along the Tungabhadra River in Karnataka, Hampi was the imperial capital of the Vijayanagara Empire from 1336 to 1565 CE. At its peak under Emperor Krishnadevaraya, Hampi was one of the largest and wealthiest cities in the world. Renowned for its iconic monolithic Stone Chariot at the Vittala Temple, 56 musical granite pillars, the soaring Virupaksha Temple, and expansive royal bazaars where rubies and diamonds were traded openly by the measure."
        ),
        "historian": (
            "Founded by brothers Harihara I and Bukka Raya I under the spiritual guidance of sage Vidyaranya, the Vijayanagara Empire stood as a fortified bulwark of southern Indian culture. Portuguese traveler Domingo Paes visited in 1520 and marveled that the city was larger than Rome, teeming with silk merchants, elephant stables, and imperial palaces. In 1565, after the catastrophic Battle of Talikota against the allied Deccan Sultanates, Hampi was pillaged and abandoned, leaving behind romantic ruins scattered across the arid hills."
        ),
        "architect": (
            "Vijayanagara architecture integrated Dravidian temple forms with Islamic arches in secular pavilions like the Lotus Mahal and Elephant Stables. The Vittala Temple's Ranga Mantapa features 56 monolithic pillars carved from single blocks of resonant granite: when struck gently, they resonate at musical frequencies corresponding to ancient tala and saptaswara notes. The iconic Stone Chariot is actually a dedicated shrine to Garuda; its stone wheels were originally free-spinning on axles before being cemented for preservation."
        ),
        "lore": (
            "Hampi is identified in the Hindu epic Ramayana as Kishkindha, the monkey kingdom of Vali and Sugriva. The Tungabhadra River was known as the sacred Pampa. Matanga Hill is revered as where sage Matanga cursed Vali, providing safe haven to Sugriva and Lord Rama. Nearby Anjanadri Hill is celebrated as the sacred birthplace of Lord Hanuman. The Virupaksha Temple has enjoyed unbroken daily worship since the 7th century CE, surviving even the fall of the empire."
        ),
        "travel": (
            "Hampi is best explored over 2 to 3 days by renting a bicycle or hiring a local auto-rickshaw. Climb Matanga Hill at sunrise for an unforgettable 360-degree vista of mist drifting across boulder-strewn hills and temple gopurams. Visit the Vittala Temple in late afternoon for golden hour light on the Stone Chariot. Wear comfortable walking shoes, carry plenty of drinking water, and take an electric golf cart ride between the parking area and Vittala Temple to save energy."
        )
    },
    "brihadisvara": {
        "title": "Brihadisvara: The Great Living Chola Temple",
        "keywords": ["brihadisvara", "thanjavur", "chola", "rajaraja", "tamil nadu", "granite", "vimana"],
        "orchestrator": (
            "Consecrated in 1010 CE by Emperor Rajaraja Chola I in Thanjavur, Tamil Nadu, the Brihadisvara Temple (Peruvudaiyar Kovil) is an all-granite monumental masterpiece celebrating Lord Shiva. Its sixteen-storey pyramidal Vimana rises 66 meters into the sky, crowned by an 80-tonne monolithic granite cupola (kumbam). The temple preserves extensive ancient Tamil inscriptions documenting royal donations, bronze casting traditions, Bharatanatyam dance repertoires, and the imperial maritime reach of the Chola Dynasty."
        ),
        "historian": (
            "Rajaraja Chola I built this temple to commemorate his imperial triumphs across southern India, Sri Lanka, and the Maldives. The temple walls serve as an open-air historical stone library: hundreds of lines of Chola Tamil inscriptions record the names of 400 temple dancers, 212 servants, treasurers, astrologers, musicians, and military generals, along with their daily grain allowances. Under Rajaraja's son Rajendra Chola I, Chola naval fleets traversed the Bay of Bengal to conquer Srivijaya (modern Indonesia and Malaysia)."
        ),
        "architect": (
            "Brihadisvara is an engineering marvel constructed entirely of 130,000 tonnes of granite, transported to Thanjavur from quarries over 60 km away without nearby hills. The interlocking dry-stone construction uses no mortar or binding cement. Raising the 80-tonne monolithic granite octagonal cupola to the 66-meter summit was achieved by building an inclined earthen ramp over 6 kilometers long, along which teams of elephants and rollers hauled the stone. Its central lingam is carved from a single 8.7-meter-tall granite monolith."
        ),
        "lore": (
            "A popular local belief holds that the shadow of the temple's soaring Vimana never falls on the ground at noon, testament to the geometric genius of its builders. The colossal monolithic Nandi at the entrance, measuring 6 meters long and 3.7 meters high, was sculpted from a single granite block. Temple lore records that the Nandi continued to grow in size over the centuries until priests placed a special nail in its spine to stabilize it."
        ),
        "travel": (
            "Thanjavur is well-connected by rail and road from Tiruchirappalli (Trichy, 55 km). Visit early in the morning around 6:30 AM to witness the morning pooja rituals, or in late evening (5:00 to 7:00 PM) when the granite facade glows amber under floodlights and the courtyard stones cool down. Modest traditional attire covering shoulders and knees is mandatory. Combine your visit with the Thanjavur Royal Palace and the Saraswathi Mahal Library."
        )
    },
    "golden_temple": {
        "title": "Sri Harmandir Sahib: The Sacred Golden Sanctuary",
        "keywords": ["golden temple", "harmandir sahib", "amritsar", "punjab", "sikh", "guru arjan dev", "langar"],
        "orchestrator": (
            "Founded in the 16th century by the fourth Sikh Guru, Guru Ram Das, and consecrated in 1604 by Guru Arjan Dev Ji, Sri Harmandir Sahib in Amritsar, Punjab, is the supreme spiritual sanctuary of Sikhism. Resting gracefully in the center of the sacred Amrit Sarovar (Pool of Nectar), its upper storeys are gilded with over 500 kilograms of pure gold leaf. The sanctuary features four entrances open to all directions, symbolizing the universal brotherhood of humanity, where the community kitchen (Langar) feeds over 100,000 people daily free of cost."
        ),
        "historian": (
            "Guru Arjan Dev Ji purposefully invited the renowned Sufi saint Hazrat Mian Mir of Lahore to lay the cornerstone in 1588, establishing its spirit of interfaith reverence. In 1604, the holy scripture Adi Granth was installed here, with Baba Buddha appointed as the first granthi. After enduring destructions by Afghan invader Ahmad Shah Durrani in the 18th century, the complex was rebuilt by the Sikh Confederacy. In 1830, Maharaja Ranjit Singh, founder of the Sikh Empire, donated funds and gold to blanket the marble walls in embossed golden copper plates."
        ),
        "architect": (
            "Harmandir Sahib represents a harmonious synthesis of Islamic Mughal arches and Hindu Rajput pavilions, creating an indigenous Sikh architectural style. Unlike traditional temples built on elevated plinths, Harmandir Sahib is intentionally built at a lower elevation than the surrounding city, requiring devotees to descend stairs as an exercise in humility. The sanctum connects to the marble causeway via the Darshani Deorhi gate. The marble walls feature exquisite Pietra Dura floral inlay work (jaratkari) and gold filigree ceiling panels (mohrakashi)."
        ),
        "lore": (
            "The sacred Amrit Sarovar has been revered for millennia; tradition holds that Lord Rama's twin sons Luv and Kush resided here, and Buddha praised the site as a sanctuary for deep meditation. The ancient Dukh Bhanjani Beri (jujube tree) on the eastern bank of the Sarovar is legendary: according to folklore, a leper husband was cured of his disease after his devoted wife Bibi Rajani brought him to bathe in these sacred waters."
        ),
        "travel": (
            "The Golden Temple is open 24 hours a day, 365 days a year. All visitors must cover their heads (headscarves are provided free at entrances), remove shoes and wash feet in running water pools at the gates. Alcohol, tobacco, and non-vegetarian food are strictly prohibited within the perimeter. Witnessing the Palki Sahib ceremony (the ceremonial procession carrying the Guru Granth Sahib between the sanctum and Akal Takht at night and dawn) is a deeply moving spiritual experience."
        )
    },
    "statue_of_unity": {
        "title": "Statue of Unity: The Modern Monumental Colossus",
        "keywords": ["statue of unity", "patel", "narmada", "gujarat", "iron man", "tallest statue", "kevadia"],
        "orchestrator": (
            "Rising 182 meters above the sacred Narmada River facing the Sardar Sarovar Dam in Gujarat, the Statue of Unity is the world's tallest statue. It commemorates Sardar Vallabhbhai Patel, the 'Iron Man of India' whose diplomatic resolve integrated 562 princely states into one sovereign democratic republic following Independence in 1947. Designed by acclaimed sculptor Padma Bhushan Ram V. Sutar, the colossus stands as a triumph of 21st-century Indian civil and structural engineering."
        ),
        "historian": (
            "Inaugurated on October 31, 2018, marking Sardar Patel's 143rd birth anniversary, the statue represents a nationwide civil movement. Over 135 tonnes of scrap iron farming tools were donated by millions of farmers across Indian villages to help form the foundation. Sardar Patel played a titanic historical role as India's first Deputy Prime Minister and Home Minister, forging the modern Indian Administrative Service and successfully integrating challenging territories like Junagadh and Hyderabad."
        ),
        "architect": (
            "Engineered by Larsen & Toubro in just 33 months, the statue features two reinforced concrete cores supporting a structural steel space frame clad in 6,500 bronze panels totaling 1,700 tonnes of bronze. The statue's slender posture—with one leg slightly forward—posed profound structural dynamics: it is built to withstand hurricane-force winds of 180 km/h and Richter scale 6.5 earthquakes. A high-speed elevator ascends 153 meters in 30 seconds to an interior viewing gallery located at the statue's chest, accommodating 200 visitors with panoramic vistas."
        ),
        "lore": (
            "The statue's height of exactly 182 meters was purposefully chosen to match the 182 legislative constituencies of the Gujarat Legislative Assembly. The massive bronze face captures Patel's characteristic contemplative gaze, strong chin, and draped khadi shawl, radiating quiet authority and dignified resolve across the Narmada valley, symbolizing the unshakeable unity of India's diverse linguistic and cultural states."
        ),
        "travel": (
            "Located at Ekta Nagar (Kevadia), Gujarat, the site is closed on Mondays for maintenance. Book tickets online in advance, especially for the high-speed elevator to the chest Viewing Gallery. In the evening, do not miss the 30-minute laser projection light and sound show mapped across the statue's bronze torso, recounting Patel's unification of the republic. Complimentary electric buses shuttle visitors between nearby attractions including the Valley of Flowers and Cactus Garden."
        )
    },
    "amber_fort": {
        "title": "Amber Fort: The Hilltop Kachhwaha Stronghold",
        "keywords": ["amber", "amer", "jaipur", "rajasthan", "sheesh mahal", "man singh", "kachhwaha", "rajput"],
        "orchestrator": (
            "Perched atop the rugged Cheel ka Teela (Hill of Eagles) overlooking Maota Lake near Jaipur, Rajasthan, Amber Fort is a magnificent example of Rajput military and aesthetic architecture. Begun in 1592 by Raja Man Singh I of the Kachhwaha dynasty, the fortress blends formidable sandstone defensive battlements with opulent royal palaces. Its world-renowned Sheesh Mahal (Mirror Palace) features thousands of convex Belgian mirrors inlaid into plaster walls, designed so that a single oil lamp illuminates the entire hall like a starry night sky."
        ),
        "historian": (
            "Raja Man Singh I, commander-in-chief of Mughal Emperor Akbar's imperial armies, initiated the fort's construction using wealth amassed from victorious military campaigns in Bengal, Bihar, and Kabul. His successors Mirza Raja Jai Singh I and Sawai Jai Singh II expanded the complex before moving their capital to the planned city of Jaipur in 1727. The fort was connected to the higher Jaigarh Fort via subterranean escape tunnels, ensuring royal survival during invasions."
        ),
        "architect": (
            "Amber is organized into four main courtyards across ascending terraces. The architecture combines red sandstone and white marble in Rajput-Mughal synthesis: featuring jharokhas, cusped arches, and chhatris. Its water engineering is legendary: a multi-stage Persian wheel (rehat) lift pumped water hundreds of feet up from Maota Lake through a series of settling tanks and aqueducts to supply the royal Turkish baths (hammams) and rooftop cascading fountains in the Aram Bagh garden."
        ),
        "lore": (
            "At the entrance of the fort stands the sacred Shila Devi Temple, dedicated to Goddess Kali. Lore recounts that Maharaja Man Singh I was guided by the goddess in a dream before a decisive battle in Jessore (modern Bangladesh); following her instructions, he recovered an ancient black stone slab from the seabed and consecrated it in Amber, after which the Kachhwaha kings were never defeated in battle."
        ),
        "travel": (
            "Amber Fort is located 11 km north of Jaipur city center. Visit in the morning to climb the grand cobbled ramparts comfortably. While elephant rides are available, walking or taking a jeep up the winding hill is recommended. Stay until the evening to witness the evocative Sound and Light Show narrated by Amitabh Bachchan against the illuminated ramparts and Maota Lake reflection. Combined entry tickets cover Nahargarh, Jaigarh, and Hawa Mahal."
        )
    },
    "victoria_memorial": {
        "title": "Victoria Memorial: The White Marble Jewel of the Maidan",
        "keywords": ["victoria", "victoria memorial", "kolkata", "calcutta", "bengal", "curzon", "makrana"],
        "orchestrator": (
            "Dominating the southern edge of Kolkata's Maidan in West Bengal, the Victoria Memorial is an architectural monument built between 1906 and 1921. Conceived by Lord Curzon and designed by Sir William Emerson, the grand building is constructed entirely of white Makrana marble from Rajasthan. It represents an Indo-Saracenic and Italian Renaissance fusion, topped by a 16-foot bronze Angel of Victory rotating on ball bearings atop its central dome, surrounded by 64 acres of manicured gardens."
        ),
        "historian": (
            "Following the death of Queen Victoria in 1901, Viceroy Lord Curzon proposed a monumental memorial that would serve not only as a royal monument but as a museum of Indian history under the British Raj. Funds were raised from Indian princes and the public, with construction overseen by chief engineer Vincent Esch and Martin & Co. Opened to the public in 1921 by the Prince of Wales, it today houses 25 galleries containing 28,000 artifacts, including historic oil paintings by Thomas and William Daniell."
        ),
        "architect": (
            "Sir William Emerson blended classical British neoclassical proportions with Mughal and Islamic motifs, including corner chhatris, miniature domes, and pierced marble screens. The central dome rises 56 meters. The rotating bronze Angel of Victory on top weighs three tonnes and functions as a functional weather vane. The monument's foundation required pioneering steel truss work and concrete rafts to support 80,000 tonnes of heavy marble on the alluvial delta soils of the Hooghly basin."
        ),
        "lore": (
            "A popular local observation is that the Victoria Memorial was built using marble from the exact same quarries in Makrana, Rajasthan, that supplied Shah Jahan's Taj Mahal three centuries prior. Calcuttans fondly refer to it as the 'Taj of the Raj.' Inside the Royal Gallery, the marble statue of Queen Victoria as a young monarch is surrounded by ceiling frescoes by Frank Salisbury depicting milestones of her reign."
        ),
        "travel": (
            "The Memorial gardens open daily at 6:00 AM, while museum galleries open from 10:00 AM to 5:00 PM (closed on Mondays and national holidays). The morning garden walk is a cherished Kolkata tradition. The western gate near Rabindra Sadan metro station is the most convenient entry. In the evening, the light and sound show ('Pride & Glory') recounts the rich cultural and intellectual history of the Bengal Renaissance."
        )
    },
    "bom_jesus": {
        "title": "Basilica of Bom Jesus: Baroque Sanctuary of Old Goa",
        "keywords": ["bom jesus", "basilica", "goa", "francis xavier", "jesuit", "baroque", "laterite"],
        "orchestrator": (
            "Located in Old Goa (Velha Goa), the Basilica of Bom Jesus is a UNESCO World Heritage site and one of the finest examples of Baroque architecture in India. Consecrated in 1605 by the Jesuit order, its exposed dark laterite facade gives it an imposing presence. The basilica is revered worldwide for holding the mortal remains of Saint Francis Xavier, co-founder of the Society of Jesus, preserved in an exquisite silver and marble mausoleum gifted by the Grand Duke of Tuscany."
        ),
        "historian": (
            "Construction began in 1594 under Archbishop Dom Frei Aleixo de Menezes and was completed in 1605. Bom Jesus (meaning 'Good Jesus' or the infant Jesus) became the primary Jesuit seat in the East Indies. St. Francis Xavier passed away in 1552 on Shangchuan Island off China; his incorrupt body was transported via Malacca to Goa in 1554. Every ten years, the sacred body is brought down for public exposition, drawing millions of pilgrims from across continents."
        ),
        "architect": (
            "The Basilica's three-storey facade displays Doric, Ionic, and Corinthian classical orders built of local reddish-black porous laterite stone, uniquely stripped of its original white lime plaster in the 20th century. Inside, the floor is paved with imported Italian marble and basalt. The high altar is a masterpiece of gilded woodcraft, featuring an enormous statue of Saint Ignatius of Loyola gazing up at the monogram IHS. The Florentine sculptor Giovanni Battista Foggini crafted the multi-tiered marble mausoleum holding the saint's chased silver casket."
        ),
        "lore": (
            "Centuries of maritime pilgrims believe the body of Saint Francis Xavier possesses miraculous preservation powers. Historical records document that when the saint's tomb was examined months after his death, his body showed no signs of decomposition. A famous legend tells of a Portuguese noblewoman, Dona Isabel de Caron, who bit off the saint's little toe in 1554 out of religious fervor, causing fresh blood to reportedly flow, which is now kept in a separate reliquary."
        ),
        "travel": (
            "The Basilica is located 10 km east of Panaji. It is open Monday to Saturday from 9:00 AM to 6:30 PM, and Sundays from 10:30 AM to 6:30 PM. Modest clothing covering shoulders and knees is strictly enforced. Photography is permitted inside the main nave but prohibited around the altar during mass. Visit across the road to the Se Cathedral, the largest church in Asia, and the Church of St. Francis of Assisi."
        )
    },
    "khajuraho": {
        "title": "Khajuraho: The Sandstone Poetry of Chandela Temples",
        "keywords": ["khajuraho", "lakshmana", "kandariya", "madhya pradesh", "chandela", "nagara", "erotic", "sculpture"],
        "orchestrator": (
            "Built between 950 and 1050 CE by the Chandela Dynasty in Madhya Pradesh, the Khajuraho Group of Monuments represents the aesthetic pinnacle of Nagara temple architecture. Originally comprising 85 temples, 25 survive across Western, Eastern, and Southern complexes. Famed for their soaring shikharas that mimic the sacred Himalayan peaks of Mount Meru, the temple walls are covered in thousands of sculptures celebrating the four Purusharthas of human life: Dharma, Artha, Kama, and Moksha."
        ),
        "historian": (
            "The Chandela kings, who traced their ancestry to the Moon God Chandra, patronized this extraordinary artistic explosion. The Lakshmana Temple was completed around 954 CE by King Yashovarman, while the gargantuan Kandariya Mahadeva Temple was built by King Vidyadhara to commemorate his successful defense against Mahmud of Ghazni in 1019 CE. Hidden by dense forests after the decline of the Chandelas in the 13th century, the temples were brought to global notice in 1838 by British surveyor T.S. Burt."
        ),
        "architect": (
            "Khajuraho temples are distinguished by their high masonry jagati (plinth) platforms upon which the temples rest without enclosing boundary walls. Built of fine-grained buff sandstone joined with precision mortise and tenon joints, the temple plan consists of ardhamandapa, mandapa, mahamandapa, antarala, and garbhagriha. The shikhara features miniature spires (urushringas) clustered around the central spire, creating a mountain-range rhythm that guides the eye upward toward transcendence."
        ),
        "lore": (
            "While famous for sensual Mithuna sculptures, erotic carvings comprise less than ten percent of the exterior friezes, placed purposefully on the architectural junctures (kapili) between the assembly hall and the sanctum. According to Tantric and Vastu traditions, these celebrate divine fertility, protective power against lightning and evil omens, and the ultimate non-dual union of Prakriti (matter) and Purusha (consciousness)."
        ),
        "travel": (
            "Khajuraho has its own railway station and airport. Allocate a full morning to the Western Group (containing Lakshmana, Kandariya Mahadeva, and Devi Jagadambi), which is UNESCO-listed and impeccably landscaped. Audio guides are available at the ASI ticket counter. In February, the annual Khajuraho Dance Festival presents India's greatest classical dancers performing against the illuminated thousand-year-old sandstone backdrop."
        )
    },
    "meenakshi": {
        "title": "Meenakshi Amman: The Living Dravidian Temple Metropolis",
        "keywords": ["meenakshi", "madurai", "tamil nadu", "nayaka", "pandya", "gopuram", "thousand pillar"],
        "orchestrator": (
            "Situated at the heart of the ancient temple city of Madurai, Tamil Nadu, along the Vaigai River, Meenakshi Sundareswarar Temple is a living architectural masterpiece of Dravidian civilization. Spread over 14 acres, the temple features 14 soaring gopurams (gateway towers), the tallest rising 52 meters, adorned with tens of thousands of painted stucco mythological sculptures. The temple complex houses the celebrated Ayiram Kaal Mandapam (Hall of a Thousand Pillars), built of meticulously carved granite."
        ),
        "historian": (
            "Madurai is one of the world's oldest continuously inhabited cities, praised in ancient Sangam literature from the 3rd century BCE. While founded under the early Pandya dynasty, the current monumental complex was rebuilt and vastly expanded between the 16th and 17th centuries by the Nayaka rulers, particularly King Thirumalai Nayak. The temple forms the cosmic mandala around which the historical streets of Madurai are laid out in concentric squares like lotus petals."
        ),
        "architect": (
            "The temple features concentric enclosures (prakarams) guarded by monumental gopurams exhibiting delicate hyperbolic curves. The Thousand Pillar Hall, built in 1569 by Ariyanatha Mudaliar, contains 985 carved pillars arranged in flawless geometric grids: when viewed from any point along the aisles, the pillars align in straight perspectives. Near the northern tower, a set of musical granite pillars carved from single blocks produce distinct musical notes when tapped."
        ),
        "lore": (
            "The temple is unique because the goddess Meenakshi (an avatar of Parvati born with three breasts and fish-shaped eyes) is the primary sovereign deity of Madurai, with Lord Sundareswarar (Shiva) as her consort. Lore recounts that her third breast vanished the moment she laid eyes on Lord Shiva at Mount Kailasa. Every evening, a ceremonial procession carries the bronze murti of Sundareswarar to Meenakshi's silver bedchamber in a joyful divine ritual celebrated daily for centuries."
        ),
        "travel": (
            "The temple is open daily from 5:00 AM to 12:30 PM and 4:00 PM to 10:00 PM. Mobile phones, cameras, leather bags, and shoes are strictly barred from entering the inner complex; lockers are available at the East Tower. Traditional dress code (dhotis/kurta for men, sarees/salwars for women) is mandatory. Do not miss witnessing the 9:00 PM night procession of Lord Sundareswarar, and visit the temple museum inside the Thousand Pillar Hall."
        )
    },
    "lepakshi": {
        "title": "Lepakshi Veerabhadra: The Vijayanagara Hanging Pillar Mystery",
        "keywords": ["lepakshi", "veerabhadra", "hanging pillar", "andhra pradesh", "nandi", "jatayu"],
        "orchestrator": (
            "Nestled in the Anantapur district of Andhra Pradesh, the 16th-century Veerabhadra Temple at Lepakshi is an extraordinary showcase of late Vijayanagara stone architecture and fresco painting. Built upon a low rocky hillock known as Kurmasailam (Tortoise Hill), the temple is internationally famous for its gravity-defying Hanging Pillar that does not touch the stone floor, the colossal monolithic granite Nandi carved from a single ridge 500 meters away, and Asia's largest ceiling fresco."
        ),
        "historian": (
            "The temple was built in 1530 CE by royal brothers Virupanna Nayaka and Veeranna, who served as provincial governors under Vijayanagara Emperor Achyuta Deva Raya. Royal accounts recount that Virupanna used treasury funds to construct the temple while the king was away; upon returning, the king accused him of embezzlement and ordered him blinded. In grief, Virupanna is said to have gouged his own eyes out and dashed them against the western temple wall, where two red stains remain visible to this day."
        ),
        "architect": (
            "The temple's engineering highlight is the celebrated 'Hanging Pillar' among its 70 carved mandapa pillars: its base sits several millimeters above the stone pavement, allowing visitors to pass a thin piece of cloth or paper completely underneath. In the British colonial era, engineer Hamilton tried to dislodge it with iron levers to uncover its architectural secret, only to watch adjacent roof lintels begin to collapse, proving the pillar is an integral counterweight anchor for the vaulted roof."
        ),
        "lore": (
            "According to the Ramayana, Lepakshi is where the noble bird Jatayu fell mortally wounded after battling demon king Ravana to rescue Goddess Sita. When Lord Rama found the dying bird, he compassionately uttered 'Le Pakshi' (Telugu for 'Rise, noble bird'). A massive footprint carved in the bedrock, perpetually moistened by an underground spring, is revered as Sita's footprint left behind during her abduction."
        ),
        "travel": (
            "Lepakshi is situated 120 km north of Bengaluru (an easy 2.5-hour drive via NH 44), making it an ideal day trip. Visit early in the morning to admire the monolithic Basavanna (Nandi bull) on the village edge before visiting the main Veerabhadra complex. Spend time looking upward at the ceiling of the Natya Mandapa to observe the 16th-century mineral frescoes depicting the 14 incarnations of Shiva."
        )
    },
    "sanchi_stupa": {
        "title": "Great Stupa of Sanchi: The Cradle of Buddhist Art",
        "keywords": ["sanchi", "stupa", "ashoka", "buddhist", "madhya pradesh", "torana", "jataka"],
        "orchestrator": (
            "Perched atop a quiet sandstone hill 46 km from Bhopal, Madhya Pradesh, the Great Stupa at Sanchi (Stupa 1) is India's oldest surviving stone structure, originally commissioned in the 3rd century BCE by Mauryan Emperor Ashoka. Built over the sacred bodily relics of Gautama Buddha, its massive hemispherical dome is encircled by four exquisitely sculpted stone gateways (Toranas) that stand as the foundational masterpieces of ancient Indian narrative sculpture."
        ),
        "historian": (
            "Following the bloodshed of the Kalinga War, Emperor Ashoka embraced Buddhist Dhamma and ordered the construction of 84,000 stupas across his empire to distribute Buddha's relics. Ashoka married Devi, daughter of a merchant from nearby Vidisha, making Sanchi a favored imperial site. The stupa was enlarged under the Sunga Dynasty in the 2nd century BCE and crowned with its ornate gateways under the Satavahanas in the 1st century BCE, remaining an active monastic center until the 12th century."
        ),
        "architect": (
            "The Great Stupa consists of a solid hemispherical brick-and-stone dome (anda) 36 meters in diameter and 16 meters high, resting on a circular base (medhi). Devotees practice pradakshina (circumambulation) along an elevated terrace enclosed by a stone vedika (railing). Crowning the dome is the harmika (square railing) supporting three umbrella tiers (chhatravali) symbolizing the Three Jewels of Buddhism: Buddha, Dhamma, and Sangha. The four Torana gateways facing the cardinal directions use mortise-and-tenon carpentry joints adapted to stone."
        ),
        "lore": (
            "In early Buddhist aniconic art at Sanchi, the Buddha is never depicted in human form. Instead, master sculptors symbolized his presence through sacred emblems: an empty throne beneath the Bodhi tree (Enlightenment), the eight-spoked Wheel of the Law (First Sermon), sacred footprints (Presence), and the Stupa itself (Parinirvana). Intricate reliefs on the Toranas depict the Jataka tales, Ashoka's pilgrimage, and vibrant Yakshis holding mango boughs."
        ),
        "travel": (
            "Sanchi is open from sunrise to sunset. Hire an ASI-certified guide at the ticket counter to decode the dense visual iconography carved across the four Toranas. Visit the adjacent ASI Archaeological Museum at the base of the hill to see the original polished sandstone Ashoka Lion Capital that once stood beside the southern gateway, featuring the identical four lions adopted as modern India's National Emblem."
        )
    },
    "mahabodhi": {
        "title": "Mahabodhi Temple: The Cosmic Axis of Enlightenment",
        "keywords": ["mahabodhi", "bodh gaya", "bihar", "bodhi tree", "buddha", "enlightenment", "vajrasana"],
        "orchestrator": (
            "Located in Bodh Gaya, Bihar, along the sacred Niranjana River, the Mahabodhi Temple marks the holiest geographic site of the Buddhist world: the exact location where Prince Siddhartha Gautama sat in deep meditation beneath the sacred Bodhi Tree and attained Supreme Enlightenment (Bodhi) in 528 BCE. The 55-meter soaring pyramidal brick temple is one of the oldest brick structures in eastern India, preserving the sacred Diamond Throne (Vajrasana) and continuous international pilgrimage."
        ),
        "historian": (
            "Emperor Ashoka visited Bodh Gaya around 260 BCE and constructed the first shrine and the polished sandstone Vajrasana slab marking the navel of the earth. The current grand pyramidal temple was constructed during the classical Gupta period (5th to 6th century CE). Despite enduring invasions and restorations by Burmese kings and British archaeologists Sir Alexander Cunningham, the sanctuary has drawn monks from Sri Lanka, Tibet, Thailand, Japan, and China for over 2,500 years."
        ),
        "architect": (
            "The Mahabodhi Temple represents a landmark transition in Indian architecture from wood and rock-cut shrines to freestanding monumental brick masonry. Its grand pyramidal shikhara rises 55 meters through nine storeys of niches decorated with sculpted Buddha figures, crowned by a stupa and a golden kalasha. The temple is flanked by four smaller corner spires mimicking the central tower. Surrounding the sanctum are sandstone and granite railings (vedikas) bearing 1st-century BCE Sunga inscriptions."
        ),
        "lore": (
            "The sacred Bodhi Tree (Ficus religiosa) standing behind the temple is a direct descendant of the original tree under which Buddha sat. In the 3rd century BCE, Emperor Ashoka's daughter Sanghamitta carried a sapling of this tree to Sri Lanka; centuries later, when the original tree in Bodh Gaya died, a sapling from the Sri Lankan tree was replanted here, ensuring an unbroken living botanical lineage spanning over two millennia."
        ),
        "travel": (
            "The Mahabodhi complex opens daily from 5:00 AM to 9:00 PM. Mobile phones are strictly prohibited inside the complex and must be deposited at the free security lockers at the main entrance; professional cameras require an nominal fee ticket. The most serene time to visit is at dawn or dusk when hundreds of maroon-robed monks from across the globe chant beneath the Bodhi tree illuminated by thousands of butter lamps."
        )
    },
    "golconda": {
        "title": "Golconda Fort: The Acoustic Citadel of Diamonds",
        "keywords": ["golconda", "hyderabad", "telangana", "qutb shahi", "diamond", "acoustics", "kohinoor"],
        "orchestrator": (
            "Dominating a 120-meter granite hill west of Hyderabad, Telangana, Golconda Fort was the medieval citadel of the Qutb Shahi Dynasty from 1518 to 1687 CE. Renowned globally as the marketplace of the world's finest diamonds—including the Koh-i-Noor, Hope Diamond, and Daria-i-Noor—the fortress is an acoustic and defensive engineering wonder, where a single handclap beneath the entrance arch resonates clearly at the hilltop royal pavilion one kilometer away."
        ),
        "historian": (
            "Originally founded in mud brick by the Kakatiya rulers of Warangal in the 11th century, the fort was reconstructed in massive granite masonry by Sultan Quli Qutb-ul-Mulk, founder of the Qutb Shahi Dynasty. For two centuries, Golconda commanded the world's only known diamond mines along the Krishna and Godavari valleys. In 1687, Mughal Emperor Aurangzeb laid siege to the fortress for eight grueling months, failing to breach its walls until a traitor opened the Fateh Darwaza gate at midnight."
        ),
        "architect": (
            "Golconda's acoustic defense system is an engineering triumph: clapping hands beneath the dome of the entrance Fateh Darwaza generates an acoustic compression wave channeled along curved masonry vaults up the hillside to the Bala Hissar royal palace 1 km away, alerting guards of incoming threats. Its defensive walls stretch over 10 kilometers with 87 semicircular bastions. The fort integrated ingenious Persian clay pipe water lifts that pumped reservoir water up hundreds of feet to rooftop gardens."
        ),
        "lore": (
            "Golconda is steeped in romantic lore, notably the love story between Sultan Muhammad Quli Qutb Shah and the Hindu village dancer Bhagmati, in whose honor he founded the adjacent city of Hyderabad. Deep inside the citadel lies the legendary Ramadas Bandikhana: a subterranean cell where the saint-composer Bhakta Ramadas was imprisoned for twelve years, spending his confinement carving icons of Lord Rama and composing timeless Telugu devotional kirtans."
        ),
        "travel": (
            "Golconda Fort is open daily from 9:00 AM to 5:30 PM. Wear sturdy walking shoes with good grip, as ascending to the summit Bala Hissar pavilion requires climbing over 360 steep stone steps. Bring a hat and water. In the evening, attend the Sound and Light Show narrated in English and Hindi that vividly brings the cannons, diamond bazaars, and royal Qutb Shahi intrigues to life beneath the illuminated ramparts."
        )
    },
    "jantar_mantar": {
        "title": "Jantar Mantar: The Stone Observatories of Jaipur",
        "keywords": ["jantar mantar", "jaipur", "rajasthan", "jai singh", "astronomy", "sundial", "samrat yantra"],
        "orchestrator": (
            "Located in the royal heart of Jaipur, Rajasthan, Jantar Mantar is the largest and best-preserved of five astronomical stone observatories built in the early 18th century by the royal scholar-king Maharaja Sawai Jai Singh II. Comprising 19 monumental stone architectural instruments, the UNESCO World Heritage site includes the Vrihat Samrat Yantra: the world's largest stone sundial, which stands 27 meters tall and measures local solar time with an accuracy of two seconds."
        ),
        "historian": (
            "Sawai Jai Singh II was a brilliant polymath steeped in Hindu Vedic astronomy, Islamic Zij tables of Ulugh Beg, and European Newtonian discoveries. Dissatisfied with the small brass astrolabes of his day, which suffered from warped metal and wear, Jai Singh conceived monumental masonry instruments fixed to the bedrock. Constructed between 1728 and 1734 CE, Jantar Mantar ('Instruments of Calculation') allowed royal astronomers to compile the landmark astronomical treatise Zij-i Muhammad Shahi."
        ),
        "architect": (
            "Each instrument is an architectural sculpture engineered from local marble and sandstone. The Vrihat Samrat Yantra features a central gnomon wall oriented precisely north-south along Jaipur's celestial meridian at an angle of 27 degrees (matching Jaipur's latitude). The shadow cast onto curved marble quadrants divided into hours, minutes, and two-second intervals provides solar time. The Jai Prakash Yantra features two inverted hemispherical marble bowls set into the earth, mapping celestial coordinates directly onto the night sky."
        ),
        "lore": (
            "Beyond timekeeping, Jantar Mantar was essential for preparing the Panchanga (Hindu astrological calendar) and predicting auspicious wedding hours, monsoon arrival dates, and solar and lunar eclipses. The Ram Yantra and Chakra Yantra allowed astronomers to calculate the altitude and azimuth of planets and the exact transit of the sun across the 12 zodiac signs, bridging astronomical physics and sacred astrology."
        ),
        "travel": (
            "Jantar Mantar is located right next to the City Palace in Jaipur. Visit around solar noon (between 11:30 AM and 1:30 PM) on a clear sunny day to witness the shadow of the giant Samrat Yantra moving across the graduated marble scale at a visible pace of 1 millimeter per second. Hiring an authorized guide is highly recommended, as the geometric functions of the stone instruments are difficult to understand without expert explanation."
        )
    },
    "qutub_minar": {
        "title": "Qutub Minar: The Fluted Victory Tower of Delhi",
        "keywords": ["qutub minar", "delhi", "qutb", "minaret", "iron pillar", "iltutmish", "tughlaq"],
        "orchestrator": (
            "Towering 72.5 meters above Mehrauli in Southwest Delhi, the Qutub Minar is the world's tallest brick minaret and an iconic symbol of early Indo-Islamic architecture. Begun in 1199 CE by Qutb-ud-din Aibak to mark the establishment of the Delhi Sultanate, the five-storey fluted tower of red sandstone and marble features balconies supported by intricate stalactite corbels and bands of Quranic calligraphy. Standing in the courtyard is the 1,600-year-old rust-resistant Gupta Iron Pillar."
        ),
        "historian": (
            "Qutb-ud-din Aibak, founder of the Mamluk (Slave) Dynasty, completed the ground storey in 1199. His successor and son-in-law Shams-ud-din Iltutmish added three storeys. After lightning struck the top in 1368, Sultan Firoz Shah Tughlaq repaired the damage and added the fifth storey using white Makrana marble and red sandstone. In 1505, Sikandar Lodi carried out further restorations. Surrounding the tower are the ruins of the Quwwat-ul-Islam mosque and the tomb of Iltutmish."
        ),
        "architect": (
            "The minaret tapers dramatically from a base diameter of 14.3 meters to just 2.7 meters at the peak. Its design alternates between rounded and angular flutings in the lower storeys, generating dynamic contrasts of light and shadow across the red sandstone surface. Each balcony is supported by miniature arches and cluster brackets exhibiting indigenous Indian stone craftsmanship adapted to Islamic geometric aesthetics. Spiral internal stairs comprise 379 steps ascending to the summit."
        ),
        "lore": (
            "In the mosque courtyard stands the legendary 7-meter-tall Iron Pillar of Chandragupta II (4th c. CE), celebrated worldwide for its metallurgical purity and complete resistance to rust over 1,600 years. Popular folklore claimed that anyone who stood with their back to the pillar and successfully encircled it with their arms backwards would have their deepest wish granted, though a protective brass fence now surrounds it to prevent wear from human touch."
        ),
        "travel": (
            "The Qutub complex is easily accessible via the Qutub Minar metro station on the Yellow Line. The site is open daily from sunrise to 10:00 PM, featuring night illumination after sunset. Visit in the late afternoon to admire the intricate sandstone calligraphic bands in golden light, then stroll through the neighboring Mehrauli Archaeological Park to explore the stepwells (Rajon ki Baoli) and medieval tombs."
        )
    },
    "hawa_mahal": {
        "title": "Hawa Mahal: The Honeycomb Palace of the Winds",
        "keywords": ["hawa mahal", "jaipur", "rajasthan", "winds", "jharokha", "pratap singh", "pink city"],
        "orchestrator": (
            "Rising five storeys above the vibrant streets of the Pink City of Jaipur, Rajasthan, the Hawa Mahal (Palace of Winds) is an extraordinary architectural screen constructed in 1799 by Maharaja Sawai Pratap Singh. Designed by architect Lal Chand Ustad in the form of Lord Krishna's crown, its pink-red sandstone facade features 953 exquisitely carved jharokha latticed windows, engineered to channel the Venturi cooling breeze throughout the royal chambers during hot desert summers."
        ),
        "historian": (
            "A devout worshipper of Lord Krishna, Maharaja Sawai Pratap Singh envisioned the building as a tribute to the deity's mukut (feathered crown). Constructed as an extension of the royal Zenana (women's quarters), the primary purpose of the 953 screened casements was to allow royal purdah women to observe daily street life, royal processions, and bustling bazaars in the city below without being observed by the public, maintaining royal decorum."
        ),
        "architect": (
            "Hawa Mahal is an engineering marvel of natural passive climate control. Built without a formal foundation, its five-storey facade stands barely 20 centimeters thick at the top, supported by delicate buttresses. The 953 jharokhas are engineered using the Venturi effect: as hot desert air enters through the narrow latticed perforations, it accelerates and cools, maintaining a refreshing internal breeze even in 45-degree summer temperatures. Uniquely, the palace has no staircases; floors are connected by gently sloping ramps designed for royal palanquins."
        ),
        "lore": (
            "The palace earned its name 'Hawa Mahal' from the top storey, the Hawa Mandir, where the wind blows with such constant vigor that one can hear the whistling breeze throughout the building. Royal tradition notes that early morning sunlight shining through the stained-glass windows of the top chambers paints the interior marble floors with dancing rainbows of sapphire, amber, and emerald light."
        ),
        "travel": (
            "The best view of Hawa Mahal's iconic facade is from the street outside at sunrise, when the pink sandstone glows vivid amber in the morning light. Cross the main road to the rooftop cafes (like Wind View Cafe or Tattoo Cafe) for a panoramic photograph over morning chai. Enter through the rear gate to walk up the interior ramps, explore the colored glass chambers, and peek through the miniature jharokhas down onto the bustling bazaar."
        )
    },
    "nalanda": {
        "title": "Nalanda Mahavihara: The Ancient Beacon of Knowledge",
        "keywords": ["nalanda", "university", "bihar", "mahavihara", "buddhist", "library", "monastery", "dharmaganja"],
        "orchestrator": (
            "Founded in the 5th century CE in modern Bihar, Nalanda Mahavihara was the ancient world's premier residential international university, flourishing for over 700 years under the Gupta Empire and Emperor Harshavardhana. Housing over 10,000 scholars and 2,000 renowned teachers from across China, Tibet, Korea, Japan, and Persia, its sprawling red-brick campus encompassed ten temples, eight monasteries, and the legendary nine-storey library complex known as Dharmaganja."
        ),
        "historian": (
            "Patronized by Kumaragupta I in 427 CE, Nalanda offered rigorous free education in Buddhist philosophy, Vedic grammar, medicine (Ayurveda), logic (Hetuvidya), mathematics, astronomy, and metallurgy. Chinese pilgrim-monks Xuanzang and Yijing lived and studied here in the 7th century, leaving behind detailed travel diaries praising the university's formidable entrance exams, where only two out of ten scholars gained admission. In 1193 CE, the complex was looted and destroyed by Bakhtiyar Khilji, whose fires reportedly burned for months."
        ),
        "architect": (
            "Excavations reveal a planned red-brick campus spanning 12 hectares. The layout follows a north-south axis: monasteries (viharas) on the east facing temples (chaityas) on the west, separated by a wide central avenue. Each vihara is built around a central sunken courtyard with stone wells, surrounded by individual student cells featuring stone sleeping platforms and study niches. Temple 3 is a monumental multi-tiered stupa surrounded by votive brick shrines decorated with stucco panels of Buddha and Bodhisattvas."
        ),
        "lore": (
            "Nalanda's legendary library complex, the Dharmaganja ('Treasury of Truth'), comprised three multi-storey towers named Ratnasagar (Sea of Jewels), Ratnodadhi (Ocean of Jewels), and Ratnaranjaka (Jeweled Adornment). It contained hundreds of thousands of illuminated palm-leaf manuscripts covering ancient sciences. Tradition holds that the great 2nd-century philosopher Nagarjuna taught here, and sage Aryabhata directed its astronomical observatory."
        ),
        "travel": (
            "Nalanda is located 90 km southeast of Patna and 15 km from Rajgir. The excavated ruins are open daily from 9:00 AM to 5:00 PM. The site is serene and extensive; allocate at least two hours to stroll along the ancient brick viharas and Temple 3. Visit the Nalanda Archaeological Museum directly opposite the ruins to view exquisite 9th-century Pala bronzes and terracotta seals. Modern Nalanda University, revived in 2014, is nearby."
        )
    },
    "red_fort": {
        "title": "Red Fort: The Grand Imperial Seat of Shahjahanabad",
        "keywords": ["red fort", "lal qila", "delhi", "shah jahan", "diwan-i-khas", "independence", "lahori gate"],
        "orchestrator": (
            "Enclosed within colossal octagonal red sandstone ramparts along the historic banks of the Yamuna River in Old Delhi, the Red Fort (Lal Qila) was the imperial citadel of the Mughal Empire for two centuries. Commissioned in 1638 by Emperor Shah Jahan when he transferred his capital from Agra to the newly planned city of Shahjahanabad, the fort represents the zenith of Mughal architectural refinement, housing the legendary Peacock Throne in the Diwan-i-Khas, and stands today as the national symbol of India's Independence."
        ),
        "historian": (
            "Construction began in 1638 under architect Ustad Ahmad Lahori and took a decade to complete. The fort was the backdrop of pivotal historical events: the trial of the last Mughal Emperor Bahadur Shah Zafar following the 1857 Uprising, the Indian National Army (INA) trials in 1945, and on August 15, 1947, where Prime Minister Jawaharlal Nehru hoisted the Indian tricolor flag from the ramparts of Lahori Gate, establishing an unbroken national tradition observed on every Independence Day."
        ),
        "architect": (
            "The fort's layout embodies the Mughal charbagh garden-palace archetype. Its 2.5-kilometer ramparts rise up to 33 meters. Water was the lifeblood of the interior design: the Nahr-i-Bihisht ('Stream of Paradise') channeled water from the Yamuna through marble aqueducts running through the center of the royal pavilions, including the Diwan-i-Aam (Hall of Public Audience) and Diwan-i-Khas (Hall of Private Audience). In the Diwan-i-Khas, the famous Persian inscription declares: 'Agar Firdaus bar ruye zamin ast, hamin ast o hamin ast o hamin ast' (If there be a paradise on earth, it is this, it is this, it is this)."
        ),
        "lore": (
            "The fort was once home to the world's most opulent jewel: the Peacock Throne (Takht-i-Taus), inlaid with gold, rubies, and the Koh-i-Noor diamond, until it was looted in 1739 by Persian invader Nadir Shah. Beneath the pavilions, hidden subterranean passages connect to the river and Salimgarh Fort. The covered Chhatta Chowk bazaar inside Lahori Gate was modeled after the covered markets of Isfahan to cater exclusively to royal court women."
        ),
        "travel": (
            "The Red Fort is located opposite Chandni Chowk and accessible via the Lal Quila metro station on the Violet Line. It is open Tuesday to Sunday from 9:30 AM to 4:30 PM (closed on Mondays). Enter through the iconic Lahori Gate. Plan to spend 2 to 3 hours exploring the gardens, royal pavilions, and the newly established Kranti Mandir museums dedicated to India's freedom fighters. The evening Sound and Light Show illuminates the citadel's turbulent history."
        )
    }
}

print("Loaded monuments in builder:", len(MONUMENTS))

