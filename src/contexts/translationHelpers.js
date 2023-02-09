export const getModifierTerms = (modifierTerms) => {
  const newModifiers = {};
  // eslint-disable-next-line
  Object.keys(modifierTerms.data).map((key) => {
    const modifier =
      modifierTerms.data[key].tr_text;
    const modifierKey = modifier.toLowerCase().replaceAll(" ", "_");
    newModifiers[modifierKey] = modifier;
  });
  return newModifiers;
};

export const defaultModifiers = {
  language_code: "en",
  data: {
    1: {
      modifier_id: 1,
      icd_code: "XK7V",
      foundation_id: "1190123007",
      language_en: "Anterior",
    },
    2: {
      modifier_id: 2,
      icd_code: "XK8L",
      foundation_id: "648538052",
      language_en: "Posterior",
    },
    3: {
      modifier_id: 3,
      icd_code: "XK49",
      foundation_id: "820615985",
      language_en: "Internal",
    },
    4: {
      modifier_id: 4,
      icd_code: "XK2H",
      foundation_id: "2036167265",
      language_en: "External",
    },
    5: {
      modifier_id: 5,
      icd_code: "XK7F",
      foundation_id: "1013312453",
      language_en: "Superficial",
    },
    6: {
      modifier_id: 6,
      icd_code: "XK16",
      foundation_id: "423444880",
      language_en: "Deep",
    },
    7: {
      modifier_id: 7,
      icd_code: "XK6J",
      foundation_id: "687243922",
      language_en: "Proximal",
    },
    8: {
      modifier_id: 8,
      icd_code: "XK6C",
      foundation_id: "1294462156",
      language_en: "Distal",
    },
    9: {
      modifier_id: 9,
      icd_code: "XK4M",
      foundation_id: "1172656077",
      language_en: "Ventral",
    },
    10: {
      modifier_id: 10,
      icd_code: "XK87",
      foundation_id: "487792839",
      language_en: "Dorsal",
    },
    11: {
      modifier_id: 11,
      icd_code: "XK3Y",
      foundation_id: "1470045894",
      language_en: "Contralateral",
    },
    12: {
      modifier_id: 12,
      icd_code: "XK3Z",
      foundation_id: "239911955",
      language_en: "Ipsilateral",
    },
    13: {
      modifier_id: 13,
      icd_code: "XK9H",
      foundation_id: "1145558243",
      language_en: "Medial",
    },
    14: {
      modifier_id: 14,
      icd_code: "XK09",
      foundation_id: "1928353529",
      language_en: "Lateral",
    },
    15: {
      modifier_id: 15,
      icd_code: "XK5N",
      foundation_id: "1516145872",
      language_en: "Superior",
    },
    16: {
      modifier_id: 16,
      icd_code: "XK4H",
      foundation_id: "548698273",
      language_en: "Inferior",
    },
    17: {
      modifier_id: 17,
      icd_code: "CustomAMPal",
      foundation_id: "",
      language_en: "Palmar",
    },
    18: {
      modifier_id: 18,
      icd_code: "CustomAMPla",
      foundation_id: "",
      language_en: "Plantar",
    },
    19: {
      modifier_id: 19,
      icd_code: "CustomAMSkin",
      foundation_id: "",
      language_en: "Skin over",
    },
    20: {
      modifier_id: 20,
      icd_code: "CustomAMSkin2",
      foundation_id: "",
      language_en: "Skin overlying",
    },
    21: {
      modifier_id: 21,
      icd_code: "CustomAMSurface",
      foundation_id: "",
      language_en: "Surface of",
    },
    22: {
      modifier_id: 22,
      icd_code: "XK2J",
      foundation_id: "1957947885",
      language_en: "Complete",
    },
    23: {
      modifier_id: 23,
      icd_code: "XK6P",
      foundation_id: "1373176927",
      language_en: "Consolidated",
    },
    24: {
      modifier_id: 24,
      icd_code: "XK31",
      foundation_id: "1265853763",
      language_en: "Diffuse",
    },
    25: {
      modifier_id: 25,
      icd_code: "XK5A",
      foundation_id: "1486017780",
      language_en: "Disseminated",
    },
    26: {
      modifier_id: 26,
      icd_code: "XK37",
      foundation_id: "639340529",
      language_en: "Focal",
    },
    27: {
      modifier_id: 27,
      icd_code: "XK63",
      foundation_id: "1479602347",
      language_en: "Generalised",
    },
    28: {
      modifier_id: 28,
      icd_code: "XK06",
      foundation_id: "167867186",
      language_en: "Incomplete",
    },
    29: {
      modifier_id: 29,
      icd_code: "XK0V",
      foundation_id: "1637247929",
      language_en: "Intertriginous",
    },
    30: {
      modifier_id: 30,
      icd_code: "XK5F",
      foundation_id: "1867832345",
      language_en: "Linear",
    },
    31: {
      modifier_id: 31,
      icd_code: "XK9A",
      foundation_id: "108658876",
      language_en: "Localised",
    },
    32: {
      modifier_id: 32,
      icd_code: "XK36",
      foundation_id: "704366208",
      language_en: "Segmental",
    },
    33: {
      modifier_id: 33,
      icd_code: "XK7Z",
      foundation_id: "266097191",
      language_en: "Systematised",
    },
    34: {
      modifier_id: 34,
      icd_code: "CustomAMRegion",
      foundation_id: "",
      language_en: "Region",
    },
    35: {
      modifier_id: 35,
      icd_code: "CustomAM2",
      foundation_id: "",
      language_en: "Placeholder",
    },
    36: {
      modifier_id: 36,
      icd_code: "CustomAM3",
      foundation_id: "",
      language_en: "Placeholder",
    },
    37: {
      modifier_id: 37,
      icd_code: "XA5ML5",
      foundation_id: "1270971545",
      language_en: "Distal surface of tooth",
    },
    38: {
      modifier_id: 38,
      icd_code: "XA4UP2",
      foundation_id: "835612792",
      language_en: "Labial surface of tooth",
    },
    39: {
      modifier_id: 39,
      icd_code: "XA6DE2",
      foundation_id: "245492722",
      language_en: "Buccal surface of tooth",
    },
    40: {
      modifier_id: 40,
      icd_code: "XA3W20",
      foundation_id: "719654900",
      language_en: "Incisal surface of tooth",
    },
    41: {
      modifier_id: 41,
      icd_code: "XA8M68",
      foundation_id: "510358088",
      language_en: "Lingual surface of tooth",
    },
    42: {
      modifier_id: 42,
      icd_code: "XA5Z48",
      foundation_id: "1043705868",
      language_en: "Mesial surface of tooth",
    },
    43: {
      modifier_id: 43,
      icd_code: "XA5DM8",
      foundation_id: "270566438",
      language_en: "Occlusal surface of tooth",
    },
    44: {
      modifier_id: 44,
      icd_code: "XA3HD5",
      foundation_id: "1596476595",
      language_en: "Proximal surface of tooth",
    },
    45: {
      modifier_id: 45,
      icd_code: "XK9J",
      foundation_id: "627678743",
      language_en: "Bilateral",
    },
    46: {
      modifier_id: 46,
      icd_code: "XK8G",
      foundation_id: "271422288",
      language_en: "Left",
    },
    47: {
      modifier_id: 47,
      icd_code: "XK9K",
      foundation_id: "876572005",
      language_en: "Right",
    },
    48: {
      modifier_id: 48,
      icd_code: "CustomAMMedian",
      foundation_id: "",
      language_en: "Median",
    },
  },
};
