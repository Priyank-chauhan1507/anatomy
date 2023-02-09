import { ORDERS, PIN_SHAPES, REGION_PATTERNS } from "./itemConstants";

export const LIST_ITEM_TYPES = {
  PIN: "pin",
  REGION: "region",
};
export const default_diagnosis = {
  icd: "",
  foundation: "",
  eC: "", // evaluation and complexity
  sI: "", // separate identification
  pM: "", // prescription management
  exts: [],
};

const defaultOrderedTypeDiagnosis = {
  ...default_diagnosis,
  icd: "2F72.Y",
};

const defaultGroupedTypeDiagnosisCryoAk = {
  ...default_diagnosis,
  icd: "EK90",
};

const defaultGroupedTypeDiagnosisCryoWart = {
  ...default_diagnosis,
  icd: "1E80",
};

const defaultGroupedTypeDiagnosisCryoIsk = {
  ...default_diagnosis,
  icd: "2F21.0",
};

const defaultDistributionDiagnosisDermatitisNOS = {
  ...default_diagnosis,
  icd: "EA8Z",
};

const defaultDistributionDiagnosisPsoriasis = {
  ...default_diagnosis,
  icd: "EA90.Z",
};

const defaultDistributionDiagnosisEczema = {
  ...default_diagnosis,
  icd: "EA80",
};

const defaultDistributionDiagnosisSeborrhoeicDermatitis = {
  ...default_diagnosis,
  icd: "EA81.Z",
};

const defaultGroupedDiagnosisHandler = (name) => {
  if (!name) return;
  let icd = "";
  switch (name) {
    case "nevus":
      icd = "2F20.Z";
      break;
    case "acne":
      icd = "ED80";
      break;
    case "psoriasis":
      icd = "EA90";
      break;
    case "eczema":
      icd = "EA80";
      break;
    case "bcc":
      icd = "2C32";
      break;
    case "scc":
      icd = "2C31";
      break;
    case "melanoma":
      icd = "2C30";
      break;
    case "actinic_skin_damage":
      icd = "EJ20.0";
      break;
    case "xerosis":
      icd = "ED54";
      break;
    case "atypical_nevus":
      icd = "XH9035";
      break;
    default:
      break;
  }
  return {
    ...default_diagnosis,
    icd,
  };
};

const defaultSingleDiagnosisHandler = (name) => {
  if (!name) return { ...default_diagnosis };
  let icd = "";
  switch (name) {
    case "presence_of_artificial_joints":
      icd = "QB51.7";
      break;
    case "presence_of_cardiac_pacemaker":
      icd = "QB50.00";
      break;
    case "presence_of_cardiac_defibrillator":
      icd = "QB50.01";
      break;
    case "presence_of_prosthetic_heart_valve":
      icd = "QB50.2";
      break;
    case "long_term_use_of_anticoagulation":
      icd = "QC48.0";
      break;
    case "immunosuppression":
      icd = "4A20";
      break;
    case "history_of_radiation":
      icd = "NF00";
      break;
    default:
      icd = "QB51.7";
      break;
  }
  return {
    ...default_diagnosis,
    icd,
  };
};

export const ORDERED_TYPES = {
  shave_biopsy: {
    name: "shave_biopsy",
    default_label: "Shave Biopsy",
    translation_key: "toolTitle_ShaveBiopsy",
    default_pin_description: "ShaveBx",
    default_diagnosis: [defaultOrderedTypeDiagnosis],
  },
  shave_removal: {
    name: "shave_removal",
    default_label: "Shave Removal",
    translation_key: "toolTitle_ShaveRemoval",
    default_pin_description: "ShaveRm",
    default_diagnosis: [defaultOrderedTypeDiagnosis],
  },
  punch_biopsy: {
    name: "punch_biopsy",
    default_label: "Punch Biopsy",
    translation_key: "toolTitle_PunchBiopsy",
    default_pin_description: "PunchBx",
    default_diagnosis: [defaultOrderedTypeDiagnosis],
  },
  punch_excision: {
    name: "punch_excision",
    default_label: "Punch Excision",
    translation_key: "toolTitle_PunchExcision",
    default_pin_description: "PunchEx",
    default_diagnosis: [defaultOrderedTypeDiagnosis],
  },
  excision: {
    name: "excision",
    default_label: "Excision",
    translation_key: "toolTitle_Excision",
    default_pin_description: "Ex",
    default_diagnosis: [defaultOrderedTypeDiagnosis],
  },
};

export const GROUPED_PROCEDURE_TYPES = {
  cryo_ak: {
    name: "cryo_ak",
    default_label: "Cryo - AK",
    translation_key: "toolTitle_CryoAK",
    default_pin_description: "AK",
    default_diagnosis: [defaultGroupedTypeDiagnosisCryoAk],
  },
  cryo_isk: {
    name: "cryo_isk",
    default_label: "Cryo - ISK",
    translation_key: "toolTitle_CryoWart",
    default_pin_description: "ISK",
    default_diagnosis: [defaultGroupedTypeDiagnosisCryoIsk],
  },
  cryo_wart: {
    name: "cryo_wart",
    default_label: "Cryo - Wart",
    translation_key: "toolTitle_CryoISK",
    default_pin_description: "Wart",
    default_diagnosis: [defaultGroupedTypeDiagnosisCryoWart],
  },
  injection_medication: {
    name: "injection_medication",
    default_label: "Injection Medication",
    translation_key: "toolTitle_InjectionMed",
    default_pin_description: "Inj",
  },
};

export const GROUPED_DIAGNOSIS_TYPES = {
  nevus: {
    name: "nevus",
    default_label: "Diagnosis Nevus",
    translation_key: "toolTitle_Nevus",
    default_pin_description: "Nevus",
    default_diagnosis: [defaultGroupedDiagnosisHandler("nevus")],
  },
  acne: {
    name: "acne",
    default_label: "Diagnosis Acne",
    translation_key: "toolTitle_Acne",
    default_pin_description: "Acne",
    default_diagnosis: [defaultGroupedDiagnosisHandler("acne")],
  },
  psoriasis: {
    name: "psoriasis",
    default_label: "Diagnosis Psoriasis",
    translation_key: "toolTitle_Psoriasis",
    default_pin_description: "Psoriasis",
    default_diagnosis: [defaultGroupedDiagnosisHandler("psoriasis")],
  },
  eczema: {
    name: "eczema",
    default_label: "Diagnosis Eczema",
    translation_key: "toolTitle_Eczema",
    default_pin_description: "Eczema",
    default_diagnosis: [defaultGroupedDiagnosisHandler("eczema")],
  },
  bcc: {
    name: "bcc",
    default_label: "Basal cell carcinoma",
    translation_key: "toolTitle_BCC",
    default_pin_description: "Bcc",
    default_diagnosis: [defaultGroupedDiagnosisHandler("bcc")],
  },
  scc: {
    name: "scc",
    default_label: "Squamous cell carcinoma",
    translation_key: "toolTitle_SCC",
    default_pin_description: "Scc",
    default_diagnosis: [defaultGroupedDiagnosisHandler("scc")],
  },
  melanoma: {
    name: "melanoma",
    default_label: "Melanoma",
    translation_key: "toolTitle_Melanoma",
    default_pin_description: "Melanoma",
    default_diagnosis: [defaultGroupedDiagnosisHandler("melanoma")],
  },
  actinic_skin_damage: {
    name: "actinic_skin_damage",
    default_label: "Actinic skin damage",
    translation_key: "toolTitle_ActinicSkinDamage",
    default_pin_description: "Actinic skin damage",
    default_diagnosis: [defaultGroupedDiagnosisHandler("actinic_skin_damage")],
  },
  xerosis: {
    name: "xerosis",
    default_label: "Xerosis",
    translation_key: "toolTitle_Xerosis",
    default_pin_description: "Xerosis",
    default_diagnosis: [defaultGroupedDiagnosisHandler("xerosis")],
  },
  atypical_nevus: {
    name: "atypical_nevus",
    default_label: "Atypical_nevus",
    translation_key: "toolTitle_AtypicalNevus",
    default_pin_description: "Atypical_nevus",
    default_diagnosis: [defaultGroupedDiagnosisHandler("atypical_nevus")],
  },
  custom_look_up_diag: {
    name: "custom_look_up_diag",
    default_label: "Custom Look Up",
    translation_key: "toolTitle_CustomLookUp",
    default_pin_description: "LookUp",
  },
};

export const SINGLE_DIAGNOSIS_TYPES = {
  nevus: {
    name: "nevus",
    default_label: "Diagnosis Nevus",
    translation_key: "toolTitle_Nevus",
    default_pin_description: "Nevus",
    default_diagnosis: [defaultGroupedDiagnosisHandler("nevus")],
  },
  acne: {
    name: "acne",
    default_label: "Diagnosis Acne",
    translation_key: "toolTitle_Acne",
    default_pin_description: "Acne",
    default_diagnosis: [defaultGroupedDiagnosisHandler("acne")],
  },
  psoriasis: {
    name: "psoriasis",
    default_label: "Diagnosis Psoriasis",
    translation_key: "toolTitle_Psoriasis",
    default_pin_description: "Psoriasis",
    default_diagnosis: [defaultGroupedDiagnosisHandler("psoriasis")],
  },
  eczema: {
    name: "eczema",
    default_label: "Diagnosis Eczema",
    translation_key: "toolTitle_Eczema",
    default_pin_description: "Eczema",
    default_diagnosis: [defaultGroupedDiagnosisHandler("eczema")],
  },
  bcc: {
    name: "bcc",
    default_label: "Basal cell carcinoma",
    translation_key: "toolTitle_BCC",
    default_pin_description: "Bcc",
    default_diagnosis: [defaultGroupedDiagnosisHandler("bcc")],
  },
  scc: {
    name: "scc",
    default_label: "Squamous cell carcinoma",
    translation_key: "toolTitle_SCC",
    default_pin_description: "Scc",
    default_diagnosis: [defaultGroupedDiagnosisHandler("scc")],
  },
  melanoma: {
    name: "melanoma",
    default_label: "Melanoma",
    translation_key: "toolTitle_Melanoma",
    default_pin_description: "Melanoma",
    default_diagnosis: [defaultGroupedDiagnosisHandler("melanoma")],
  },
  actinic_skin_damage: {
    name: "actinic_skin_damage",
    default_label: "Actinic skin damage",
    translation_key: "toolTitle_ActinicSkinDamage",
    default_pin_description: "Actinic skin damage",
    default_diagnosis: [defaultGroupedDiagnosisHandler("actinic_skin_damage")],
  },
  xerosis: {
    name: "xerosis",
    default_label: "Xerosis",
    translation_key: "toolTitle_Xerosis",
    default_pin_description: "Xerosis",
    default_diagnosis: [defaultGroupedDiagnosisHandler("xerosis")],
  },
  atypical_nevus: {
    name: "atypical_nevus",
    default_label: "Atypical_nevus",
    translation_key: "toolTitle_AtypicalNevus",
    default_pin_description: "Atypical_nevus",
    default_diagnosis: [defaultGroupedDiagnosisHandler("atypical_nevus")],
  },
  presence_of_artificial_joints: {
    name: "presence_of_artificial_joints",
    default_label: "Presence of artificial joints",
    translation_key: "toolTitle_PresenceOfArtificialJoints",
    default_pin_description: "Presence of artificial joints",
    default_diagnosis: [
      defaultSingleDiagnosisHandler("presence_of_artificial_joints"),
    ],
  },
  presence_of_cardiac_pacemaker: {
    name: "presence_of_cardiac_pacemaker",
    default_label: "Presence Of Cardiac Pacemaker",
    translation_key: "toolTitle_PresenceOfCardiacPacemaker",
    default_pin_description: "Presence Of Cardiac Pacemaker",
    default_diagnosis: [
      defaultSingleDiagnosisHandler("presence_of_cardiac_pacemaker"),
    ],
  },
  presence_of_cardiac_defibrillator: {
    name: "presence_of_cardiac_defibrillator",
    default_label: "Presence Of Cardiac Defibrillator",
    translation_key: "toolTitle_PresenceOfCardiacDefibrillator",
    default_pin_description: "Presence Of Cardiac Defibrillator",
    default_diagnosis: [
      defaultSingleDiagnosisHandler("presence_of_cardiac_defibrillator"),
    ],
  },
  presence_of_prosthetic_heart_valve: {
    name: "presence_of_prosthetic_heart_valve",
    default_label: "Presence Of Prosthetic Heart Valve",
    translation_key: "toolTitle_PresenceOfProstheticHeartValve",
    default_pin_description: "Presence Of Prosthetic Heart Valve",
    default_diagnosis: [
      defaultSingleDiagnosisHandler("presence_of_prosthetic_heart_valve"),
    ],
  },
  long_term_use_of_anticoagulation: {
    name: "long_term_use_of_anticoagulation",
    default_label: "Long Term Use Of Anti coagulation",
    translation_key: "toolTitle_LongTermUseOfAnticoagulation",
    default_pin_description: "Long Term Use Of Anti coagulation",
    default_diagnosis: [
      defaultSingleDiagnosisHandler("long_term_use_of_anticoagulation"),
    ],
  },
  immunosuppression: {
    name: "immunosuppression",
    default_label: "Immunosuppression",
    translation_key: "toolTitle_Immunosuppression",
    default_pin_description: "Immunosuppression",
    default_diagnosis: [defaultSingleDiagnosisHandler("immunosuppression")],
  },
  history_of_radiation: {
    name: "history_of_radiation",
    default_label: "History Of Radiation",
    translation_key: "toolTitle_HistoryOfRadiation",
    default_pin_description: "History Of Radiation",
    default_diagnosis: [defaultSingleDiagnosisHandler("history_of_radiation")],
  },
  custom_look_up_diag: {
    name: "custom_look_up_diag",
    default_label: "Custom Look Up",
    translation_key: "toolTitle_CustomLookUp",
    default_pin_description: "LookUp",
  },
};

export const COMMENTS_TYPES = {
  general_comment: {
    name: "general_comment",
    default_label: "General Comment",
    translation_key: "toolTitle_GeneralComment",
    default_pin_description: "GenCom",
    default_diagnosis: [default_diagnosis],
  },
  cosmetic_comment: {
    name: "cosmetic_comment",
    default_label: "Cosmetic Comment",
    translation_key: "toolTitle_CosmeticComment",
    default_pin_description: "CosCom",
    default_diagnosis: [default_diagnosis],
  },
  diagnostic_comment: {
    name: "diagnostic_comment",
    default_label: "Diagnosis Comment",
    translation_key: "toolTitle_DiagnosisComment",
    default_pin_description: "DiagCom",
    default_diagnosis: [default_diagnosis],
  },
};
export const DEFER_TYPES = {
  Defer_to_future_encounter: {
    name: "Defer_to_future_encounter",
    default_label: "Defer to future encounter",
    translation_key: "toolTitle_Defer",
    default_pin_description: "Defer",
    default_diagnosis: [default_diagnosis],
  },
  Re_evaluation_and_management_needed: {
    name: "Re_evaluation_and_management_needed",
    default_label: "Re-evaluation and management needed",
    translation_key: "toolTitle_Reeval",
    default_pin_description: "Reevall",
    default_diagnosis: [default_diagnosis],
  },
  Followup_needed: {
    name: "Followup_needed",
    default_label: "Followup needed",
    translation_key: "toolTitle_FU_Needed",
    default_pin_description: "FU_Needed",
    default_diagnosis: [default_diagnosis],
  },
  Outside_referral: {
    name: "Outside_referral",
    default_label: "Outside referral",
    translation_key: "toolTitle_OutsideReferral",
    default_pin_description: "OutsideReferral",
    default_diagnosis: [default_diagnosis],
  },
};

export const PAINTED_DISTRIBUTION_TYPES = {
  dermatitis_nos: {
    name: "dermatitis_nos",
    default_label: "Dermatitis NOS",
    translation_key: "toolTitle_Dermatitis",
    default_diagnosis: [defaultDistributionDiagnosisDermatitisNOS],
  },
  psoriasis: {
    name: "psoriasis",
    default_label: "Psoriasis",
    translation_key: "toolTitle_Psoriasis",
    default_diagnosis: [defaultDistributionDiagnosisPsoriasis],
  },
  eczema: {
    name: "eczema",
    default_label: "Eczema",
    translation_key: "toolTitle_Eczema",
    default_diagnosis: [defaultDistributionDiagnosisEczema],
  },
  seborrheic_dermatitis: {
    name: "seborrheic_dermatitis",
    default_label: "Seborrheic Dermatitis",
    translation_key: "toolTitle_SeborrheicDermatitis",
    default_diagnosis: [defaultDistributionDiagnosisSeborrhoeicDermatitis],
  },
  custom_look_up_diag: {
    name: "custom_look_up_diag",
    default_label: "Custom Look Up",
    translation_key: "toolTitle_CustomLookUp",
    default_pin_description: "LookUp",
  },
};

export const LIST_TYPES = {
  ordered: {
    name: "ordered",
    default_label: "Ordered Procedure",
    translation_key: "preAnnotationBarTitle_OrderedProcedure",
    options: Object.values(ORDERED_TYPES),
  },
  grouped_procedure: {
    name: "grouped_procedure",
    default_label: "Grouped Procedure",
    translation_key: "preAnnotationBarTitle_GroupedProcedure",
    options: Object.values(GROUPED_PROCEDURE_TYPES),
  },
  grouped_diagnosis: {
    name: "grouped_diagnosis",
    default_label: "Grouped Diagnosis",
    translation_key: "preAnnotationBarTitle_GroupedDiagnosis",
    options: Object.values(GROUPED_DIAGNOSIS_TYPES),
  },
  single_diagnosis: {
    name: "single_diagnosis",
    default_label: "Single Diagnosis",
    translation_key: "preAnnotationBarTitle_SingleDiagnosis",
    options: Object.values(SINGLE_DIAGNOSIS_TYPES),
  },
  comments: {
    name: "comments",
    default_label: "Comments",
    translation_key: "listTitle_Comment",
    options: Object.values(COMMENTS_TYPES),
  },
  defer: {
    name: "defer",
    default_label: "Defer",
    translation_key: "listTitle_Defer",
    options: Object.values(DEFER_TYPES),
  },
  painted_distribution: {
    name: "painted_distribution",
    default_label: "Painted Distribution",
    translation_key: "label_PaintedDistribution",
    options: Object.values(PAINTED_DISTRIBUTION_TYPES),
  },
};

const initialGroupDocumentation = {
  links: [],
  groupNotes: {},
  groupFile: [],
  morphologies: [],
  diagnoses: [default_diagnosis],
};

const GroupedProcedureTypesInitialState = {};

Object.keys(GROUPED_PROCEDURE_TYPES).forEach((k) => {
  GroupedProcedureTypesInitialState[k] = {
    attr: GROUPED_PROCEDURE_TYPES[k].attr,
    itemsOrder: [],
  };
});

export const LIST_TYPES_MAPPING = {
  [LIST_TYPES.ordered.name]: ORDERED_TYPES,
  [LIST_TYPES.grouped_procedure.name]: GROUPED_PROCEDURE_TYPES,
  [LIST_TYPES.grouped_diagnosis.name]: GROUPED_DIAGNOSIS_TYPES,
  [LIST_TYPES.comments.name]: COMMENTS_TYPES,
  [LIST_TYPES.defer.name]: DEFER_TYPES,
  [LIST_TYPES.single_diagnosis.name]: SINGLE_DIAGNOSIS_TYPES,
  [LIST_TYPES.painted_distribution.name]: PAINTED_DISTRIBUTION_TYPES,
};

export const listsInitialState = {
  [LIST_TYPES.ordered.name]: {
    activeSubType: ORDERED_TYPES.shave_biopsy.name,
    isGroupMode: false,
    itemType: LIST_ITEM_TYPES.PIN,
    attr: {
      color: "red",
      visibility: true,
      locked: true,
      shape: PIN_SHAPES.circle.name,
      order: ORDERS.ABC.name,
      grouped: false,
      grouped_documentation: {
        ...initialGroupDocumentation,
        diagnoses: ORDERED_TYPES.shave_biopsy.default_diagnosis,
      },
      onlyOnMap: true,
      pinListSettings: {
        show_pin_description: true,
        use_qr: true,
        include_patient_info: true,
        load_originating_lang: false,
        include_encounter_info: true,
        use_enhanced_mod: true,
        auto_relate_pins: true,
      },
    },
    itemsOrder: [],
  },
  [LIST_TYPES.grouped_procedure.name]: {
    activeSubType: GROUPED_PROCEDURE_TYPES.cryo_ak.name,
    isGroupMode: true,
    itemType: LIST_ITEM_TYPES.PIN,
    [GROUPED_PROCEDURE_TYPES.cryo_ak.name]: {
      attr: {
        color: "#4A90E2",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.asterik.name,
        order: "--",
        grouped: true,
        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: GROUPED_PROCEDURE_TYPES.cryo_ak.default_diagnosis,
        },
        onlyOnMap: true,
        pinListSettings: {
          show_pin_description: false,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: true,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_PROCEDURE_TYPES.cryo_isk.name]: {
      attr: {
        color: "#7B4B23",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.asterik.name,
        order: "--",
        grouped: true,
        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: GROUPED_PROCEDURE_TYPES.cryo_isk.default_diagnosis,
        },
        onlyOnMap: true,
        pinListSettings: {
          show_pin_description: false,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: true,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_PROCEDURE_TYPES.cryo_wart.name]: {
      attr: {
        color: "#3C7100",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.asterik.name,
        order: "--",
        grouped: true,
        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: GROUPED_PROCEDURE_TYPES.cryo_wart.default_diagnosis,
        },
        onlyOnMap: true,
        pinListSettings: {
          show_pin_description: false,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: true,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_PROCEDURE_TYPES.injection_medication.name]: {
      attr: {
        color: "#56DD29",
        visibility: true,
        locked: true,
        size: "200px",
        shape: PIN_SHAPES.triangle.name,
        order: "--",
        grouped: true,
        grouped_documentation: initialGroupDocumentation,
        onlyOnMap: true,
        pinListSettings: {
          show_pin_description: false,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: true,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
  },
  [LIST_TYPES.grouped_diagnosis.name]: {
    activeSubType: GROUPED_DIAGNOSIS_TYPES.nevus.name,
    isGroupMode: true,
    itemType: LIST_ITEM_TYPES.PIN,
    [GROUPED_DIAGNOSIS_TYPES.nevus.name]: {
      attr: {
        color: "brown",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.circle.name,
        order: "--",
        grouped: true,
        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: GROUPED_DIAGNOSIS_TYPES.nevus.default_diagnosis,
        },
        onlyOnMap: false,
        pinListSettings: {
          show_pin_description: true,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: true,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_DIAGNOSIS_TYPES.eczema.name]: {
      attr: {
        color: "gray",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.circle.name,
        order: "--",
        grouped: true,
        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: GROUPED_DIAGNOSIS_TYPES.eczema.default_diagnosis,
        },
        onlyOnMap: false,
        pinListSettings: {
          show_pin_description: true,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: false,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_DIAGNOSIS_TYPES.acne.name]: {
      attr: {
        color: "red",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.circle.name,
        order: "--",
        grouped: true,
        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: GROUPED_DIAGNOSIS_TYPES.acne.default_diagnosis,
        },
        onlyOnMap: false,
        pinListSettings: {
          show_pin_description: true,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: false,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_DIAGNOSIS_TYPES.psoriasis.name]: {
      attr: {
        color: "green",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.circle.name,
        order: "--",
        grouped: true,

        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: GROUPED_DIAGNOSIS_TYPES.psoriasis.default_diagnosis,
        },
        onlyOnMap: false,
        pinListSettings: {
          show_pin_description: true,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: false,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_DIAGNOSIS_TYPES.custom_look_up_diag.name]: {
      attr: {
        color: "red",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.circle.name,
        order: "--",
        grouped: true,
        grouped_documentation: initialGroupDocumentation,
        onlyOnMap: false,
        pinListSettings: {
          show_pin_description: true,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: false,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_DIAGNOSIS_TYPES.bcc.name]: {
      attr: {
        color: "magenta",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.circle.name,
        order: "--",
        grouped: true,

        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: GROUPED_DIAGNOSIS_TYPES.bcc.default_diagnosis,
        },
        onlyOnMap: false,
        pinListSettings: {
          show_pin_description: true,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: true,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_DIAGNOSIS_TYPES.scc.name]: {
      attr: {
        color: "purple",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.circle.name,
        order: "--",
        grouped: true,

        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: GROUPED_DIAGNOSIS_TYPES.scc.default_diagnosis,
        },
        onlyOnMap: false,
        pinListSettings: {
          show_pin_description: true,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: true,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_DIAGNOSIS_TYPES.melanoma.name]: {
      attr: {
        color: "black",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.circle.name,
        order: "--",
        grouped: true,

        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: GROUPED_DIAGNOSIS_TYPES.melanoma.default_diagnosis,
        },
        onlyOnMap: false,
        pinListSettings: {
          show_pin_description: true,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: true,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_DIAGNOSIS_TYPES.actinic_skin_damage.name]: {
      attr: {
        color: "blue",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.circle.name,
        order: "--",
        grouped: true,

        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses:
            GROUPED_DIAGNOSIS_TYPES.actinic_skin_damage.default_diagnosis,
        },
        onlyOnMap: false,
        pinListSettings: {
          show_pin_description: true,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: false,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_DIAGNOSIS_TYPES.xerosis.name]: {
      attr: {
        color: "#8B8000", //dark yellow
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.circle.name,
        order: "--",
        grouped: true,

        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: GROUPED_DIAGNOSIS_TYPES.xerosis.default_diagnosis,
        },
        onlyOnMap: false,
        pinListSettings: {
          show_pin_description: true,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: false,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [GROUPED_DIAGNOSIS_TYPES.atypical_nevus.name]: {
      attr: {
        color: "#654321 ", //dark  brown
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.circle.name,
        order: "--",
        grouped: true,

        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: GROUPED_DIAGNOSIS_TYPES.atypical_nevus.default_diagnosis,
        },
        onlyOnMap: false,
        pinListSettings: {
          show_pin_description: true,
          use_qr: false,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: true,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
  },
  [LIST_TYPES.single_diagnosis.name]: {
    activeSubType: SINGLE_DIAGNOSIS_TYPES.acne.name,
    isGroupMode: false,
    itemType: LIST_ITEM_TYPES.PIN,
    attr: {
      color: "#97971E",
      visibility: true,
      locked: true,
      shape: PIN_SHAPES.inside_circle.name,
      order: ORDERS["123"].name,
      grouped: false,
      grouped_documentation: {
        ...initialGroupDocumentation,
        diagnoses: SINGLE_DIAGNOSIS_TYPES.acne.default_diagnosis,
      },
      onlyOnMap: false,
      pinListSettings: {
        show_pin_description: true,
        use_qr: false,
        include_patient_info: false,
        load_originating_lang: false,
        include_encounter_info: false,
        use_enhanced_mod: false,
        auto_relate_pins: false,
      },
    },
    itemsOrder: [],
  },
  [LIST_TYPES.comments.name]: {
    activeSubType: COMMENTS_TYPES.general_comment.name,
    isGroupMode: false,
    itemType: LIST_ITEM_TYPES.PIN,
    attr: {
      color: "green",
      visibility: true,
      locked: true,
      shape: PIN_SHAPES.inside_circle.name,
      order: ORDERS["123"].name,
      grouped: true,
      grouped_documentation: {
        ...initialGroupDocumentation,
        diagnoses: COMMENTS_TYPES.general_comment.default_diagnosis,
      },
      onlyOnMap: false,
      pinListSettings: {
        show_pin_description: false,
        use_qr: true,
        include_patient_info: false,
        load_originating_lang: false,
        include_encounter_info: false,
        use_enhanced_mod: false,
        auto_relate_pins: false,
      },
    },
    itemsOrder: [],
  },
  [LIST_TYPES.defer.name]: {
    activeSubType: DEFER_TYPES.Defer_to_future_encounter.name,
    isGroupMode: false,
    itemType: LIST_ITEM_TYPES.PIN,
    attr: {
      color: "#bd1919",
      visibility: true,
      locked: true,
      shape: PIN_SHAPES.inside_circle.name,
      order: ORDERS["123"].name,
      grouped: true,
      grouped_documentation: {
        ...initialGroupDocumentation,
        diagnoses: COMMENTS_TYPES.general_comment.default_diagnosis,
      },
      onlyOnMap: false,
      pinListSettings: {
        show_pin_description: false,
        use_qr: true,
        include_patient_info: false,
        load_originating_lang: false,
        include_encounter_info: false,
        use_enhanced_mod: true,
        auto_relate_pins: false,
      },
    },
    itemsOrder: [],
  },

  [LIST_TYPES.painted_distribution.name]: {
    activeSubType: PAINTED_DISTRIBUTION_TYPES.dermatitis_nos.name,
    isGroupMode: true,
    itemType: LIST_ITEM_TYPES.REGION,
    [PAINTED_DISTRIBUTION_TYPES.dermatitis_nos.name]: {
      attr: {
        color: "red",
        backgroundColor: "blue",
        isBkgColor: true,
        visibility: true,
        locked: true,
        opacity: 0.6,
        grouped: false,
        pattern: REGION_PATTERNS.NOPATTERN.name,
        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses:
            PAINTED_DISTRIBUTION_TYPES.dermatitis_nos.default_diagnosis,
        },
        onlyOnMap: true,
        pinListSettings: {
          show_pin_description: false,
          use_qr: true,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: false,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [PAINTED_DISTRIBUTION_TYPES.psoriasis.name]: {
      attr: {
        color: "green",
        backgroundColor: "white",
        isBkgColor: true,
        visibility: true,
        locked: true,
        opacity: 0.6,
        grouped: false,
        pattern: REGION_PATTERNS.NOPATTERN.name,
        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: PAINTED_DISTRIBUTION_TYPES.psoriasis.default_diagnosis,
        },
        onlyOnMap: true,
        pinListSettings: {
          show_pin_description: false,
          use_qr: true,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: false,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [PAINTED_DISTRIBUTION_TYPES.eczema.name]: {
      attr: {
        color: "black",
        backgroundColor: "orange",
        isBkgColor: true,
        visibility: true,
        locked: true,
        opacity: 0.6,
        grouped: false,
        pattern: REGION_PATTERNS.DASH.name,
        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses: PAINTED_DISTRIBUTION_TYPES.eczema.default_diagnosis,
        },
        onlyOnMap: true,
        pinListSettings: {
          show_pin_description: false,
          use_qr: true,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: false,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [PAINTED_DISTRIBUTION_TYPES.seborrheic_dermatitis.name]: {
      attr: {
        color: "yellow",
        backgroundColor: "black",
        isBkgColor: true,
        visibility: true,
        locked: true,
        opacity: 0.6,
        grouped: false,
        pattern: REGION_PATTERNS.DASH.name,
        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses:
            PAINTED_DISTRIBUTION_TYPES.seborrheic_dermatitis.default_diagnosis,
        },
        onlyOnMap: true,
        pinListSettings: {
          show_pin_description: false,
          use_qr: true,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: false,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
    [PAINTED_DISTRIBUTION_TYPES.custom_look_up_diag.name]: {
      attr: {
        color: "red",
        visibility: true,
        locked: true,
        shape: PIN_SHAPES.circle.name,
        order: "--",
        grouped: true,
        pattern: REGION_PATTERNS.DASH.name,
        grouped_documentation: {
          ...initialGroupDocumentation,
          diagnoses:
            PAINTED_DISTRIBUTION_TYPES.custom_look_up_diag.default_diagnosis,
        },
        onlyOnMap: true,
        pinListSettings: {
          show_pin_description: false,
          use_qr: true,
          include_patient_info: false,
          load_originating_lang: false,
          include_encounter_info: false,
          use_enhanced_mod: false,
          auto_relate_pins: false,
        },
      },
      itemsOrder: [],
    },
  },
};

export const modifiers = {
  "+x": {
    name: "+x",
    value: "plus_x_modifier_id",
  },
  "-x": {
    name: "-x",
    value: "minus_x_modifier_id",
  },
  "+y": {
    name: "+y",
    value: "plus_y_modifier_id",
  },
  "-y": {
    name: "-y",
    value: "minus_y_modifier_id",
  },
};
