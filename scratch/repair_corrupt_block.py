import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

corrupt_target = '''        {
          "name": "Vikramashila University Ruins",
          "nameReg": "विक्रमशिला विश्वविद्यालय",
          "tag": "Historic Monastic Center",
          "tagReg": "ऐतिहासिक बौद्ध केंद्र",
          "desc": "Premier Pala dynasty Buddhist center of esoteric learning and tantric studies, founded by Emperor Dharmapala.",
          "descReg": "पाल वंश के सम्राट धर्मपाल द्वारा स्थापित तंत्रयान और दर्शन का महाव        tradIframe.src = '';
      }
    }

    // ── AR/VR Experience Modal ─────────────────────────────── at the ceremonial Rajpath axis, commemorating fallen Indian soldiers.",
          "descReg": "४२ मीटर ऊंचा भव्य विजय मेहराब एवं अमर जवान ज्योति का पावन स्थल."
        }
      ]
    };'''

clean_replacement = '''        {
          "name": "Vikramashila University Ruins",
          "nameReg": "विक्रमशिला विश्वविद्यालय",
          "tag": "Historic Monastic Center",
          "tagReg": "ऐतिहासिक बौद्ध केंद्र",
          "desc": "Premier Pala dynasty Buddhist center of esoteric learning and tantric studies, founded by Emperor Dharmapala.",
          "descReg": "पाल वंश के सम्राट धर्मपाल द्वारा स्थापित तंत्रयान और दर्शन का महान बौद्ध केंद्र."
        }
      ],
      "delhi": [
        {
          "name": "Lotus Temple (Bahá'í House of Worship)",
          "nameReg": "कमल मंदिर (लोटस टेम्पल)",
          "tag": "Iconic Modern Wonder",
          "tagReg": "आधुनिक वास्तुकला",
          "desc": "Magnificent lotus flower sanctuary open to all humanity for meditation and inner peace.",
          "descReg": "२७ संगमरमरी पंखुड़ियों से निर्मित शांति और सर्वधर्म प्रार्थना का अद्वितीय केंद्र.",
          "isVR": true
        },
        {
          "name": "Qutub Minar & Iron Pillar",
          "nameReg": "क़ुतुब मीनार एवं लौह स्तम्भ",
          "tag": "UNESCO World Heritage",
          "tagReg": "यूनेस्को विश्व धरोहर",
          "desc": "World's tallest brick minaret standing 72.5 meters tall alongside the rust-resistant 1600-year Gupta iron pillar.",
          "descReg": "७२.५ मीटर ऊंची भव्य मीनार एवं गुप्तकालीन जंग-रहित लौह स्तम्भ."
        },
        {
          "name": "India Gate & National War Memorial",
          "nameReg": "इण्डिया गेट एवं राष्ट्रीय समर स्मारक",
          "tag": "National Memorial",
          "tagReg": "राष्ट्रीय स्मारक",
          "desc": "Triumphal arch standing at the ceremonial Rajpath axis, commemorating fallen Indian soldiers.",
          "descReg": "४२ मीटर ऊंचा भव्य विजय मेहराब एवं अमर जवान ज्योति का पावन स्थल."
        }
      ]
    };'''

if corrupt_target in content:
    content = content.replace(corrupt_target, clean_replacement, 1)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS: Repaired corrupted block in index.html!")
else:
    print("WARNING: corrupt_target not found!")
