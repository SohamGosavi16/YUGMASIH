# -*- coding: utf-8 -*-
"""
Generates the complete js/aiVisualizer.js with:
- 5 Specialized Heritage Agents
- Google Gemini 3.8 Flash live integration + BYOK settings modal
- Deep 22-monument knowledge dataset across all 5 agent perspectives
- Smooth audio visualizer and speech synthesis
"""

import sys
import os
import json

# Import MONUMENTS and AGENTS from build_multiagent_engine
from build_multiagent_engine import MONUMENTS

# Define Agent Prompts and Metadata
HERITAGE_AGENTS = {
    "orchestrator": {
        "id": "orchestrator",
        "name": "All-Rounder",
        "title": "Universal Heritage Synthesis // महामार्गदर्शक",
        "icon": "fa-solid fa-sparkles",
        "badge": "✦ YUGMA MULTI-AGENT HARMONIZER ✦",
        "color": "#dfa753",
        "desc": "Holistic synthesis balancing history, architecture, mythology, and visitor insights.",
        "systemPrompt": (
            "You are YUGMA All-Rounder, the master AI guide for YUGMA, India's premier digital heritage platform. "
            "You provide rich, captivating, multi-perspective explanations of Indian monuments, synthesizing historical precision, "
            "structural architectural wonders, sacred folklore, and practical visitor advice. "
            "Speak with poetic reverence, civilizational depth, and clarity. Format response in 2-3 structured, engaging paragraphs suitable for speech. "
            "Keep responses factual, immersive, and directly relevant to the user's question."
        )
    },
    "historian": {
        "id": "historian",
        "name": "Chief Historian",
        "title": "Itihasa Archivist // इतिहासज्ञ",
        "icon": "fa-solid fa-landmark-dome",
        "badge": "✦ ITIHASA: HISTORICAL & DYNASTIC ARCHIVE ✦",
        "color": "#e6b76c",
        "desc": "Dynastic lineages, chronological timelines, epigraphy, royal edicts, and political treaties.",
        "systemPrompt": (
            "You are Itihasa, the Chief Historian AI for YUGMA. "
            "You specialize in royal dynasties (Cholas, Mughals, Vijayanagara, Guptas, Marathas, Chalukyas, Rashtrakutas, Rajputs, Palas, Mauryas), "
            "chronological timelines, stone inscriptions, copper plates, political alliances, and socioeconomic transformations behind Indian monuments. "
            "Provide scholarly, authoritative, and historically grounded narratives with exact rulers, dates, and imperial ambitions. Format in 2-3 engaging spoken paragraphs."
        )
    },
    "architect": {
        "id": "architect",
        "name": "Master Architect",
        "title": "Sthapatya Engineer // स्थापत्यकार",
        "icon": "fa-solid fa-compass-drafting",
        "badge": "✦ STHAPATYA: ARCHITECTURAL & ACOUSTIC ENGINEERING ✦",
        "color": "#64b5f6",
        "desc": "Vastu Shastra, acoustic chambers, interlocking dry stone, shadow sundials, and seismic design.",
        "systemPrompt": (
            "You are Sthapatya, the Master Architect and Structural Engineer AI for YUGMA. "
            "You specialize in ancient and medieval Indian architectural science, Vastu Shastra geometry, temple typologies (Nagara, Dravida, Vesara, Kalinga), "
            "acoustic engineering (musical granite pillars, whispering galleries), interlocking masonry without mortar, subterranean water engineering (stepwells), "
            "and astronomical stone alignments. Explain the structural physics, stone materials, and engineering mastery that allowed these monuments to endure for millennia. Format in 2-3 engaging spoken paragraphs."
        )
    },
    "lore": {
        "id": "lore",
        "name": "Myth & Lore",
        "title": "Katha Storyteller // पौराणिक कथाकार",
        "icon": "fa-solid fa-om",
        "badge": "✦ KATHA: SACRED LORE & LIVING TRADITIONS ✦",
        "color": "#ba68c8",
        "desc": "Puranic legends, deity iconography, sacred sanctums, folk traditions, and mystical secrets.",
        "systemPrompt": (
            "You are Katha, the Sacred Lore and Living Traditions AI for YUGMA. "
            "You specialize in mythological lore, temple sthalam puranas, deity iconography, celestial alignments, cosmic symbolism, oral folklore, "
            "and spiritual rituals associated with India's monuments. Speak with evocative, captivating storytelling that transports the listener into "
            "the spiritual and metaphysical heart of Indian civilizational lore. Format in 2-3 engaging spoken paragraphs."
        )
    },
    "travel": {
        "id": "travel",
        "name": "Travel Curator",
        "title": "Yatra Expedition Guide // यात्रा मार्गदर्शक",
        "icon": "fa-solid fa-route",
        "badge": "✦ YATRA: EXPEDITION & VISITOR INTELLIGENCE ✦",
        "color": "#81c784",
        "desc": "Optimal visiting hours, golden hour photography, cultural etiquette, tickets, and circuits.",
        "systemPrompt": (
            "You are Yatra, the Expedition Curator AI for YUGMA. "
            "You specialize in practical, high-value travel guidance for exploring India's heritage. Provide optimal visiting hours to avoid crowds and heat, "
            "golden-hour photography vantage points, temple sanctum dress codes, respectful etiquette, seasonal climate advice, and recommended nearby heritage circuits. "
            "Be welcoming, structured, practical, and inspiring. Format in 2-3 engaging spoken paragraphs."
        )
    }
}

# Thematic entries
THEMATIC_ENTRIES = {
    "acoustics": {
        "title": "Acoustic Engineering of Ancient Indian Monuments",
        "keywords": ["acoustic", "sound", "musical pillar", "whispering gallery", "resonance", "echo"],
        "orchestrator": (
            "Indian monumental architecture integrated advanced acoustic engineering centuries before modern physics. From the 56 resonant granite pillars at Hampi's Vittala Temple—each tuned to resonate with musical notes (saptaswara) when struck—to the whispering galleries of Golconda Fort and the Gol Gumbaz dome that amplifies echoes over ten times, ancient architects shaped granite and vaulted brick to control harmonic resonance, sacred chanting, and perimeter defense."
        ),
        "historian": (
            "Medieval epigraphs and Sanskrit treatises such as the Sangita Ratnakara by Sarangadeva and the Samarangana Sutradhara by King Bhoja document that acoustic design was an integral component of temple mandapa construction. Kings and master sculptors incorporated musical pillars into Natya Mandapas (dance halls) to accompany classical Bharatanatyam and Kuchipudi recitals, and engineered military forts with parabolic sound channels to detect enemy approaches."
        ),
        "architect": (
            "From a physical engineering perspective, acoustic chambers utilized specific acoustic geometries. Solid granite musical pillars are hollowed internally or carved with varying shaft densities and diameters to alter their fundamental vibrational frequency. In vaulted domes like Gol Gumbaz or Golconda's entry arch, elliptical masonry reflects acoustic waves across focal points without sound dissipation, creating high acoustic clarity across vast distances."
        ),
        "lore": (
            "According to temple lore, the universe originated from the primordial cosmic sound vibration known as Nada Brahma (Om). Ancient sthapatis (architects) designed sanctums as acoustic resonance resonators to amplify sacred Vedic mantras, believed to cleanse the mental aura of pilgrims and align human consciousness with celestial harmonies."
        ),
        "travel": (
            "To experience ancient acoustics firsthand, visit the Vittala Temple in Hampi early in the morning before crowds arrive, or test the whispering gallery at Gol Gumbaz in Bijapur (Vijayapura) or the acoustic entrance archway of Golconda Fort in Hyderabad. Please observe ASI guidelines and never strike ancient musical stone pillars forcefully, as micro-fractures can damage their resonance."
        )
    },
    "stepwells": {
        "title": "Subterranean Stepwells & Sacred Water Architecture",
        "keywords": ["stepwell", "baoli", "vav", "water", "hydrology", "aquifer", "inverted temple"],
        "orchestrator": (
            "Stepwells (vavs or baolis) are unique to the arid regions of western India, particularly Gujarat and Rajasthan. Beyond serving as vital drought-resistant rainwater collection reservoirs tapping deep subterranean aquifers, they were engineered as monumental subterranean inverted temples. Downward-descending tiered pillared pavilions created cooler underground microclimates, providing resting caravans, pilgrims, and local women with sacred shelter and community space."
        ),
        "historian": (
            "From the 7th century CE under the Solankis, Chaulukyas, and later the Delhi Sultanate and Mughals, constructing a stepwell was considered an act of supreme civic and spiritual merit (purta-dharma). Notable historical examples include the 11th-century UNESCO-listed Rani Ki Vav in Patan, the 15th-century Adalaj Stepwell built by Queen Rudadevi, and the deep geometric labyrinth of Chand Baori in Abhaneri."
        ),
        "architect": (
            "Engineered to withstand immense lateral subterranean soil pressure, stepwells utilized stepped stone retaining pavilions, post-and-lintel columnar trabeations, and carved bracket capitals. By stepping downward across multiple levels, water could be accessed irrespective of seasonal monsoon fluctuations. The evaporative cooling effect lowered temperatures inside the lower pavilions by 5 to 6 degrees Celsius compared to the arid surface above."
        ),
        "lore": (
            "Water in Indian philosophy is worshipped as Jal Devata—the primordial womb of creation. Stepwells were consecrated with shrines to Lord Vishnu reclining on the serpent Shesha, Lord Varuna (god of waters), and the river goddesses Ganga and Yamuna, transforming routine water collection into a sanctified spiritual pilgrimage descending into Mother Earth."
        ),
        "travel": (
            "The finest stepwells to visit in India include Rani Ki Vav in Patan (Gujarat), Chand Baori in Abhaneri near Jaipur, and Adalaj Stepwell near Ahmedabad. For photography, visit between 10:00 AM and 1:00 PM when overhead sunlight pierces the deep subterranean shafts, illuminating the intricate sculptural friezes on the lower tiers."
        )
    },
    "general": {
        "title": "YUGMA Digital Heritage Archive",
        "keywords": ["hello", "hi", "help", "yugma", "india", "heritage", "monument", "overview"],
        "orchestrator": (
            "Welcome to YUGMA. I am your AI Heritage Companion, powered by five specialized civilizational agents: our Chief Historian, Master Architect, Sacred Lore Storyteller, and Expedition Travel Curator. You can explore all 22 sacred sanctuaries, imperial fortifications, and living cultural traditions across India. Choose an agent above or ask any question to begin your journey."
        ),
        "historian": (
            "Greetings. As Itihasa, your Chief Historian, I archive the dynastic chronicles, stone inscriptions, chronological treaties, and imperial epigraphy of India's classical civilizations—from the Mauryas and Guptas to the Cholas, Vijayanagara, and Mughals. Select any monument or era to examine its historical foundations."
        ),
        "architect": (
            "Welcome. I am Sthapatya, your Master Architect and Structural Engineer. I decode the geometric proportions, Vastu Shastra sciences, acoustic resonance halls, interlocking dry-stone masonry, and celestial alignments that allow India's thousand-year-old stone wonders to stand undefeated by time. Ask me how any monument was built."
        ),
        "lore": (
            "Namaste. I am Katha, your storyteller of Sacred Lore and Living Traditions. Behind every carved temple pillar, sanctum deity, and ancient fortress lies an immortal legend from the Puranas, epics, and oral folklore. Ask me about the spiritual mysteries and timeless myths of our sacred land."
        ),
        "travel": (
            "Welcome, explorer! I am Yatra, your Expedition Curator. Whether you seek the most breathtaking sunrise viewpoint, photography angles, visiting hours without crowds, or temple sanctum etiquette, I am here to guide your real-world journey across India's magnificent heritage circuits."
        )
    }
}

# Merge all into MASTER_KNOWLEDGE
ALL_KNOWLEDGE = {}
ALL_KNOWLEDGE.update(MONUMENTS)
ALL_KNOWLEDGE.update(THEMATIC_ENTRIES)

# Prompt suggestions for each agent
AGENT_PROMPTS = {
    "orchestrator": [
        {"topic": "taj_mahal", "label": "🏛️ Taj Mahal Architecture"},
        {"topic": "konark", "label": "☀️ Konark Sun Chariot"},
        {"topic": "ajanta_ellora", "label": "🗿 Kailasa Monolithic Temple"},
        {"topic": "rani_ki_vav", "label": "💧 Rani Ki Vav Stepwell"},
        {"topic": "hampi", "label": "🛕 Hampi Stone Chariot"},
        {"topic": "brihadisvara", "label": "👑 Chola Temple Architecture"}
    ],
    "historian": [
        {"topic": "brihadisvara", "label": "📜 Chola Imperial Inscriptions"},
        {"topic": "hampi", "label": "⚔️ Vijayanagara Golden Age"},
        {"topic": "taj_mahal", "label": "👑 Shah Jahan's Court & Marble"},
        {"topic": "sanchi_stupa", "label": "🏛️ Ashokan Edicts at Sanchi"},
        {"topic": "golconda", "label": "💎 Qutb Shahi Diamond Reign"},
        {"topic": "khajuraho", "label": "🛕 Chandela Dynasty Origins"}
    ],
    "architect": [
        {"topic": "golconda", "label": "🔊 Golconda Whispering Acoustics"},
        {"topic": "konark", "label": "⏰ Konark Sundial Mathematics"},
        {"topic": "ajanta_ellora", "label": "⛰️ Kailasa Top-Down Carving"},
        {"topic": "brihadisvara", "label": "🏗️ Brihadisvara 80-Tonne Capstone"},
        {"topic": "rani_ki_vav", "label": "🌊 Rani Ki Vav Subterranean Hydraulics"},
        {"topic": "lepakshi", "label": "🏛️ Lepakshi Hanging Pillar Physics"}
    ],
    "lore": [
        {"topic": "lepakshi", "label": "🦅 Legend of Jatayu at Lepakshi"},
        {"topic": "meenakshi", "label": "👰 Divine Wedding at Meenakshi"},
        {"topic": "konark", "label": "☀️ Surya's Chariot & Samba's Penance"},
        {"topic": "mahabodhi", "label": "🪷 Buddha's Sacred Bodhi Tree"},
        {"topic": "rani_ki_vav", "label": "🌊 Sheshashayi Vishnu & Sacred Water"},
        {"topic": "ajanta_ellora", "label": "🔱 Ravana Shaking Mount Kailasa"}
    ],
    "travel": [
        {"topic": "taj_mahal", "label": "🌅 Best Sunrise at Taj Mahal"},
        {"topic": "hampi", "label": "📸 Photography at Hampi Boulders"},
        {"topic": "meenakshi", "label": "👗 Dress Code & Etiquette at Madurai"},
        {"topic": "amber_fort", "label": "🎟️ Ticket & Entry Guide for Amber"},
        {"topic": "golden_temple", "label": "🚶 Golden Temple Langar & Parikrama"},
        {"topic": "ajanta_ellora", "label": "🕒 Visiting Hours for Ellora Caves"}
    ]
}

print(f"Total knowledge items: {len(ALL_KNOWLEDGE)}")

