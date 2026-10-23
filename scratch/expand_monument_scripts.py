# -*- coding: utf-8 -*-
"""
Full-length (500+ word) scholarly narratives for:
1. Statue of Unity (Gujarat)
2. Victoria Memorial (West Bengal)
Across all 15 supported languages.
"""

import os
import json
import re

workspace_dir = r"c:\Users\LENOVO\Downloads\new sih-20260903T160606Z-1-001\new sih"

# ══════════════════════════════════════════════════════════════════════════════
# STATUE OF UNITY SCRIPT (500+ words in all languages)
# ══════════════════════════════════════════════════════════════════════════════

unity_en = """Welcome to the Statue of Unity, the world's tallest monument, rising an astounding 182 meters (597 feet) above the sacred Narmada River on Sadhu Bet island in Kevadia, Gujarat. Dedicated to Sardar Vallabhbhai Patel—revered across the subcontinent as the 'Iron Man of India' and the supreme architect of modern national integration—this colossal masterpiece stands as a monumental tribute to democratic unity, visionary statesmanship, and unprecedented twenty-first-century civil engineering. Facing the immense Sardar Sarovar Dam and framed by the rugged peaks of the Vindhyachal and Satpura mountain ranges, the monument embodies the living spirit of a united India. It honors the courageous leader who, with remarkable diplomacy and unyielding resolve, peacefully integrated over 562 diverse princely states into a single sovereign democratic republic following national independence in 1947.

Architecturally and structurally, the Statue of Unity is a supreme triumph of modern megastructure engineering, designed by master sculptor Padma Bhushan Ram V. Sutar and constructed by Larsen & Toubro in partnership with international engineering consortiums. The exact height of 182 meters was purposefully calibrated to represent the 182 legislative constituencies of the Gujarat State Assembly, embedding democratic symbolism directly into the monument's physical stature. Sculpting a standing human figure of this magnitude posed extraordinary aerodynamic and structural challenges. Unlike traditional monuments with broad, pyramid-like bases, the statue depicts Sardar Patel in a natural walking posture, draped in his characteristic Indian dhoti, kurta, and shawl, with feet slightly apart. This posed unprecedented center-of-gravity and wind-shear considerations for the structural engineers. To ensure absolute permanence against severe seismic activity and ferocious cyclonic storms, the colossus was engineered with twin reinforced concrete cores at its center, surrounded by a structural steel space frame and enveloped by 1,700 tonnes of high-grade bronze plates divided into 6,500 individual cast panels. The statue is engineered to withstand ferocious gale winds exceeding 180 kilometers per hour and category six earthquakes.

A profound and emotional hallmark of the monument is its nation-wide grassroots foundation, famously known as the Loha Campaign. Over 100 million farmers across 169,000 villages throughout every state of India contributed their used iron agricultural implements, such as ploughshares, sickle blades, and hoes. More than 135 tonnes of donated farming iron were collected, smelted, and utilized in the internal foundations of the statue, symbolizing the sweat, toil, and agrarian bedrock of the Indian people in the creation of a united nation. High-speed express elevators traveling at four meters per second transport visitors in under forty seconds to a spacious high-altitude viewing gallery situated at 153 meters inside Sardar Patel's chest, capable of hosting 200 visitors simultaneously, offering breathtaking panoramic vistas of the Narmada River, Garudeshwar weir, and lush reserve forests.

Today, the Statue of Unity has transformed Kevadia into a flourishing global ecotourism hub, encompassing the Valley of Flowers, Butterfly Park, Jungle Safari, Cactus Garden, and the Sardar Patel National Memorial Museum. You are now experiencing a millimeter-accurate 3D digital twin of this modern wonder. Rotate, pan, and zoom around the bronze drapery, detailed facial features, and the colossal lotus base as you explore India's crowning symbol of national integrity, architectural brilliance, and engineering excellence."""

unity_hi = """विश्व की सबसे ऊंची प्रतिमा, स्टैच्यू ऑफ यूनिटी (Statue of Unity) में आपका हार्दिक स्वागत है। गुजरात के नर्मदा जिले में केवडिया स्थित साधु बेट द्वीप पर पवित्र नर्मदा नदी के तट पर स्थित यह विशाल स्मारक 182 मीटर (597 फीट) की ऐतिहासिक ऊंचाई पर गर्व से खड़ा है। भारत के 'लौह पुरुष' और आधुनिक राष्ट्र के एकीकरण के सूत्रधार सरदार वल्लभभाई पटेल को समर्पित यह स्मारक एकता, दृढ़ राजनीतिक संकल्प और इक्कीसवीं सदी की उत्कृष्ट सिविल इंजीनियरिंग का एक अद्वितीय प्रतीक है। विशाल सरदार सरोवर बांध के सम्मुख और विंध्याचल तथा सतपुड़ा की सुरम्य पर्वत श्रृंखलाओं की गोद में स्थित यह प्रतिमा उस महानायक को नमन करती है जिन्होंने 1947 में स्वतंत्रता के बाद 562 से अधिक देशी रियासतों का भारतीय संघ में शांतिपूर्ण विलय कर एक अखंड भारत का निर्माण किया।

वास्तुशिल्प और संरचनात्मक दृष्टिकोण से स्टैच्यू ऑफ यूनिटी आधुनिक महाकाय इंजीनियरिंग की एक बेमिसाल मिसाल है। इसका डिज़ाइन सुप्रसिद्ध मूर्तिकार पद्मभूषण राम वी. सुतार द्वारा तैयार किया गया था और इसका निर्माण लार्सन एंड टुब्रो (L&T) द्वारा वैश्विक विशेषज्ञों के सहयोग से किया गया। 182 मीटर की ऊंचाई गुजरात विधानसभा के 182 निर्वाचन क्षेत्रों का प्रतिनिधित्व करती है। इतनी विशाल प्रतिमा को एक स्वाभाविक चलने की मुद्रा में खड़ा करना अत्यंत जटिल और चुनौतीपूर्ण कार्य था। पारंपरिक चौड़े आधार वाले स्मारकों के विपरीत, इसमें सरदार पटेल को अपनी पारंपरिक धोती, कुर्ता और कंधे पर शॉल ओढ़े आगे बढ़ते हुए दर्शाया गया है, जिससे इसका गुरुत्वाकर्षण केंद्र अत्यंत संवेदनशील हो जाता है। भूकंप और तेज आंधियों से सुरक्षा के लिए इसके केंद्र में दो प्रबलित कंक्रीट कोर बनाए गए हैं, जिन्हें स्टील स्पेस फ्रेम और 1,700 टन कांसे से ढालकर 6,500 व्यक्तिगत पैनलों में तैयार किया गया है। यह संरचना 180 किलोमीटर प्रति घंटे की आंधी और तीव्र भूकंप के झटकों को आसानी से सहन कर सकती है।

इस स्मारक की सबसे भावनात्मक और ऐतिहासिक विशेषता इसका देशव्यापी 'लोहा अभियान' रहा। भारत के प्रत्येक राज्य के 169,000 गांवों के 10 करोड़ से अधिक किसानों ने अपने खेतों में इस्तेमाल किए गए पुराने लोहे के औजार, जैसे हल और कुदाल, इस प्रतिमा के लिए दान किए। 135 टन से अधिक एकत्रित कृषि लोहे को पिघलाकर प्रतिमा की नींव और आंतरिक संरचना में समाहित किया गया, जो भारतीय किसानों के पसीने, परिश्रम और राष्ट्रीय एकता के प्रति उनके अटूट समर्पण का साक्षात प्रमाण है। इसके अतिरिक्त, चार मीटर प्रति सेकंड की गति से चलने वाली लिफ्ट आगंतुकों को 153 मीटर की ऊंचाई पर सरदार पटेल के सीने में स्थित विशाल व्यूइंग गैलरी तक ले जाती है, जहां से 200 लोग एक साथ नर्मदा नदी, सरदार सरोवर बांध और हरे-भरे वनों का विहंगम दृश्य देख सकते हैं।

आज स्टैच्यू ऑफ यूनिटी ने केवडिया को वैश्विक पर्यटन के मानचित्र पर स्थापित कर दिया है, जहां फूलों की घाटी, जंगल सफारी, कैक्टस गार्डन और सरदार पटेल संग्रहालय स्थित हैं। आप इस समय इस आधुनिक अजूबे की मिलीमीटर-सटीक त्रि-आयामी 3D डिजिटल प्रतिकृति का अनुभव कर रहे हैं। इसके कांसे के वस्त्रों, चेहरे के भावों और आधार का अन्वेषण करें तथा लाइव ऑडियो गाइड के साथ भारत के गौरव को महसूस करें। यह स्मारक हमें यह निरंतर याद दिलाता है कि भारत की वास्तविक शक्ति उसकी विविधता और अटूट एकता में निहित है।"""

unity_gu = """વિશ્વના સૌથી ઊંચા સ્મારક સ્ટેચ્યુ ઓફ યુનિટી (Statue of Unity) માં આપનું હાર્દિક સ્વાગત છે. ગુજરાતના નર્મદા જિલ્લામાં કેવડિયા ખાતે સાધુ બેટ ટાપુ પર પવિત્ર નર્મદા નદીના કાંઠે સ્થિત આ ભવ્ય પ્રતિમા 182 મીટર (597 ફૂટ) ની ઐતિહાસિક ઊંચાઈ સાથે ગૌરવભેર ઊભી છે. ભારતના 'લોખંડી પુરુષ' અને અખંડ ભારતના શિલ્પી સરદાર વલ્લભભાઈ પટેલને સમર્પિત આ પ્રતિમા એકતા, અડગ નેતૃત્વ અને એકવીસમી સદીની અપ્રતિમ ઇજનેરી કૌશલ્યનું જીવંત પ્રતીક છે. વિશાળ સરદાર સરોવર ડેમની સામે અને વિંધ્યાચલ તથા સાતપુડા પર્વતમાળાઓની વચ્ચે સ્થિત આ સ્મારક એ મહામાનવને વંદન કરે છે જેમણે 1947માં આઝાદી પછી 562થી વધુ દેશી રજવાડાંઓનું ભારતીય સંઘમાં વિલીનીકરણ કરીને અખંડ ભારતનું સર્જન કર્યું હતું.

સ્થાપત્ય અને રચનાત્મક દ્રષ્ટિએ સ્ટેચ્યુ ઓફ યુનિટી આધુનિક મેગાસ્ટ્રક્ચર એન્જિનિયરિંગની સર્વોચ્ચ સિદ્ધિ છે. આ પ્રતિમાની ડિઝાઇન દેશના ખ્યાતનામ મૂર્તિકાર પદ્મભૂષણ રામ વી. સુતાર દ્વારા તૈયાર કરવામાં આવી હતી અને તેનું નિર્માણ લાર્સન એન્ડ ટુબ્રો (L&T) દ્વારા આંતરરાષ્ટ્રીય સલાહકારો સાથે મળીને કરવામાં આવ્યું હતું. 182 મીટરની ઊંચાઈ ગુજરાત વિધાનસભાની 182 બેઠકોનું પ્રતીકાત્મક સન્માન દર્શાવે છે. આટલી વિરાટ પ્રતિમાને ચાલવાની કુદરતી મુદ્રામાં ઊભી રાખવી એ વિશ્વ એન્જિનિયરિંગ માટે એક અસાધારણ પડકાર હતો. પરંપરાગત પહોળા પાયાવાળા સ્મારકોથી વિપરીત, આ પ્રતિમામાં સરદાર સાહેબને ધોતી, કુરતો અને ખેસ પહેરીને ગંભીરતાપૂર્વક આગળ વધતા દર્શાવવામાં આવ્યા છે. ભારે પવન અને ભૂકંપ સામે અડીખમ રાખવા માટે અંદર બે આરસીસી કોંક્રિટ કોર બનાવવામાં આવ્યા છે, જેને સ્ટીલ ફ્રેમ અને 1,700 ટન કાંસાના 6,500 થી વધુ પેનલ્સથી આચ્છાદિત કરવામાં આવ્યા છે. તે 180 કિમી પ્રતિ કલાકની ઝડપે ફૂંકાતા વાવાઝોડા અને ઝોન 6 ના ભૂકંપ સામે અડીખમ ઊભી રહેવા સક્ષમ છે.

આ સ્મારકનું સૌથી પવિત્ર પાસું રાષ્ટ્રવ્યાપી 'લોહા અભિયાન' હતું. ભારતના 1,69,000 ગામડાંઓના 10 કરોડથી વધુ ખેડૂતોએ પોતાના ખેતરોમાં વપરાયેલા જૂના લોખંડના ઓજારો, જેમ કે હળ અને કોદાળીનું દાન આપ્યું હતું. 135 ટનથી વધુ ખેતીનું લોખંડ એકત્ર કરીને ઓગાળીને પ્રતિમાના પાયામાં વાપરવામાં આવ્યું, જે ભારતીય ધરતીપુત્રોના પરસેવા અને રાષ્ટ્રીય એકતાની ભાવનાનું અમર પ્રતીક છે. પ્રતિમાની અંદર 4 મીટર પ્રતિ સેકન્ડની ઝડપે દોડતી હાઇ-સ્પીડ લિફ્ટ્સ મુલાકાતીઓને 153 મીટરની ઊંચાઈએ આવેલી વ્યુઇંગ ગેલેરી સુધી લઈ જાય છે, જ્યાંથી એકસાથે 200 લોકો નર્મદા નદી, સરદાર સરોવર ડેમ અને કુદરતી જંગલોનો અદભુત નજારો માણી શકે છે.

આજે સ્ટેચ્યુ ઓફ યુનિટીએ કેવડિયાને વૈશ્વિક પ્રવાસનનું ગૌરવવંતું કેન્દ્ર બનાવ્યું છે, જેમાં વેલી ઓફ ફ્લાવર્સ, જંગલ સફારી, કેક્ટસ ગાર્ડન અને સરદાર પટેલ નેશનલ મ્યુઝિયમ આવેલા છે. અત્યારે આપ આ ઐતિહાસિક સ્મારકની મિલિમીટર-ચોક્કસ 3D ડિજિટલ પ્રતિકૃતિનો અનુભવ કરી રહ્યા છો. પ્રતિમાની તમામ મુદ્રાઓ, કાંસાના વસ્ત્રો અને આધારનું અવલોકન કરો અને લાઈવ ઓડિયો ગાઈડ સાથે ગુજરાત અને ભારતના ગૌરવને માણો. ભારત માતાના આ સપૂતનું યોગદાન સદાય અમર રહેશે."""

# Helper to create localized versions
unity_scripts = {
    "en": unity_en,
    "hi": unity_hi,
    "gu": unity_gu,
    "ta": unity_hi, # Will populate rich scripts
    "te": unity_hi,
    "bn": unity_hi,
    "mr": unity_hi,
    "kn": unity_hi,
    "ml": unity_hi,
    "pa": unity_hi,
    "fr": unity_en,
    "es": unity_en,
    "de": unity_en,
    "ja": unity_en,
    "zh": unity_en
}

# Now load generated full texts from scratch/generate_all_monuments.py
with open(os.path.join(workspace_dir, "scratch", "generate_all_monuments.py"), "r", encoding="utf-8") as f:
    gen_code = f.read()

# Extract dictionaries
local_scope = {}
exec(gen_code, local_scope)

unity_scripts = local_scope["unity_scripts"]
victoria_scripts = local_scope["victoria_scripts"]

# Ensure unity_scripts has 500+ words in en, hi, gu
unity_scripts["en"] = unity_en
unity_scripts["hi"] = unity_hi
unity_scripts["gu"] = unity_gu

print("Unity scripts word count:")
for l in ["en", "hi", "gu", "ta", "te", "bn", "mr"]:
    print(f"  {l}: {len(unity_scripts[l].split())} words")

# Re-assemble bodies
with open(os.path.join(workspace_dir, "scratch", "lepakshi_vg_body.html"), "r", encoding="utf-8") as f:
    base_vg_body = f.read()

def create_vg_body(site_name, scripts_dict):
    out = base_vg_body
    out = re.sub(
        r'<h3>Lepakshi Veerabhadra Temple\s*·\s*Audio Guide</h3>',
        f'<h3>{site_name} · Audio Guide</h3>',
        out
    )
    out = re.sub(
        r'<div class="vg-hud-title">Lepakshi Veerabhadra Temple\s*·\s*Synchronized Subtitles</div>',
        f'<div class="vg-hud-title">{site_name} · Synchronized Subtitles</div>',
        out
    )
    out = re.sub(
        r'var SITE_NAME = "Lepakshi Veerabhadra Temple";',
        f'var SITE_NAME = "{site_name}";',
        out
    )
    start_marker = 'var VG_SCRIPTS = '
    idx1 = out.find(start_marker)
    idx2 = out.find("\n    var currentLang = 'en';", idx1)
    script_json = json.dumps(scripts_dict, ensure_ascii=False)
    out = out[:idx1 + len(start_marker)] + script_json + ";\n" + out[idx2:]
    return out

unity_body = create_vg_body("Statue of Unity", unity_scripts)
victoria_body = create_vg_body("Victoria Memorial", victoria_scripts)

with open(os.path.join(workspace_dir, "scratch", "unity_vg_body.html"), "w", encoding="utf-8") as f:
    f.write(unity_body)
with open(os.path.join(workspace_dir, "scratch", "victoria_vg_body.html"), "w", encoding="utf-8") as f:
    f.write(victoria_body)

print("Saved updated unity_vg_body.html and victoria_vg_body.html.")
