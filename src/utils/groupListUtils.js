export const currentGroupsName = {
  CRYO_AK: "Cryo-AK",
  CRYO_WART: "Cryo-Wart",
  CRYO_ISK: "Cryo-ISK",
  INJ_MED: "Injection-Med",
  DIA_NEV: "Diagnosis-Nevus",
  DIA_AC: "Diagnosis-Acne",
  DIA_PS: "Diagnosis-Psoriasis",
  DIA_EC: "Diagnosis-Eczema",
  SKIN_CANCER: "Skin-cancer",
  CUSTOM_LOOKUP: "Custom-Lookup",
};

// Inputs
//  name,note,code,color,images,inputs

export const groupAttributes = {
  [currentGroupsName.CRYO_AK]: {
    name: currentGroupsName.CRYO_AK,
    note: "",
    code: {
      name: "DX11",
      value: "EX10",
      options: ["EX10", "EX11", "EX22"],
    },
    color: "#FF5733",
    images: [],
    inputs: [
      {
        name: "Oienment",
        label: "Oienment",
        type: "text",
        value: "",
      },
      {
        name: "Hemostasis",
        label: "Homostasis",
        type: "text",
        value: "",
      },
      {
        name: "Details",
        label: "Details",
        type: "text",
        value: "",
      },
      {
        name: "Size",
        label: "Size (in cms)",
        type: "select",
        options: ["0.3", "0.4", "0.5"],
        value: "0.4",
      },
    ],
    addDocs: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque,
        optio itaque beatae id, nam laborum maxime amet illo laboriosam
        veniam sed quasi dignissimos blanditiis porro maiores deleniti modi
        ipsam eaque.`,
    items: [],
    toGetCount: 2,
    showPinsOnSvg: true,
    locked: true,
  },
  [currentGroupsName.CRYO_WART]: {
    name: currentGroupsName.CRYO_WART,
    note: "",
    code: {
      name: "DX11",
      value: "EX10",
      options: ["EX10", "EX11", "EX22"],
    },
    color: "#00B9FF",
    images: [],
    inputs: [
      {
        name: "Oienment",
        label: "Oienment",
        type: "text",
        value: "",
      },
      {
        name: "Hemostasis",
        label: "Homostasis",
        type: "text",
        value: "",
      },
      {
        name: "Details",
        label: "Details",
        type: "text",
        value: "",
      },
      {
        name: "Size",
        label: "Size (in cms)",
        type: "select",
        options: ["0.3", "0.4", "0.5"],
        value: "0.4",
      },
    ],
    addDocs: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque,
        optio itaque beatae id, nam laborum maxime amet illo laboriosam
        veniam sed quasi dignissimos blanditiis porro maiores deleniti modi
        ipsam eaque.`,
    items: [],
    toGetCount: 2,
    showPinsOnSvg: true,
    locked: true,
  },
  [currentGroupsName.CRYO_ISK]: {
    name: currentGroupsName.CRYO_ISK,
    note: "",
    code: {
      name: "DX11",
      value: "EX10",
      options: ["EX10", "EX11", "EX22"],
    },
    color: "#8B00FF",
    images: [],
    inputs: [
      {
        name: "Oienment",
        label: "Oienment",
        type: "text",
        value: "",
      },
      {
        name: "Hemostasis",
        label: "Homostasis",
        type: "text",
        value: "",
      },
      {
        name: "Details",
        label: "Details",
        type: "text",
        value: "",
      },
      {
        name: "Size",
        label: "Size (in cms)",
        type: "select",
        options: ["0.3", "0.4", "0.5"],
        value: "0.4",
      },
    ],
    addDocs: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque,
        optio itaque beatae id, nam laborum maxime amet illo laboriosam
        veniam sed quasi dignissimos blanditiis porro maiores deleniti modi
        ipsam eaque.`,
    items: [],
    showPinsOnSvg: true,
    locked: true,
  },
  [currentGroupsName.DIA_AC]: {
    name: currentGroupsName.DIA_AC,
    note: "",
    code: {
      name: "DX11",
      value: "EX10",
      options: ["EX10", "EX11", "EX22"],
    },
    color: "#FF00F0",
    images: [],
    inputs: [
      {
        name: "Oienment",
        label: "Oienment",
        type: "text",
        value: "",
      },
      {
        name: "Hemostasis",
        label: "Homostasis",
        type: "text",
        value: "",
      },
      {
        name: "Details",
        label: "Details",
        type: "text",
        value: "",
      },
      {
        name: "Size",
        label: "Size (in cms)",
        type: "select",
        options: ["0.3", "0.4", "0.5"],
        value: "0.4",
      },
    ],
    addDocs: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque,
        optio itaque beatae id, nam laborum maxime amet illo laboriosam
        veniam sed quasi dignissimos blanditiis porro maiores deleniti modi
        ipsam eaque.`,
    items: [],
    showPinsOnSvg: true,
    locked: true,
  },
  [currentGroupsName.DIA_NEV]: {
    name: currentGroupsName.DIA_NEV,
    note: "",
    code: {
      name: "DX11",
      value: "EX10",
      options: ["EX10", "EX11", "EX22"],
    },
    color: "#FFB200",
    images: [],
    inputs: [
      {
        name: "Oienment",
        label: "Oienment",
        type: "text",
        value: "",
      },
      {
        name: "Hemostasis",
        label: "Homostasis",
        type: "text",
        value: "",
      },
      {
        name: "Details",
        label: "Details",
        type: "text",
        value: "",
      },
      {
        name: "Size",
        label: "Size (in cms)",
        type: "select",
        options: ["0.3", "0.4", "0.5"],
        value: "0.4",
      },
    ],
    addDocs: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque,
        optio itaque beatae id, nam laborum maxime amet illo laboriosam
        veniam sed quasi dignissimos blanditiis porro maiores deleniti modi
        ipsam eaque.`,
    items: [],
    showPinsOnSvg: true,
    locked: true,
  },
  [currentGroupsName.DIA_PS]: {
    name: currentGroupsName.DIA_PS,
    note: "",
    code: {
      name: "DX11",
      value: "EX10",
      options: ["EX10", "EX11", "EX22"],
    },
    color: "#96A3AA",
    images: [],
    inputs: [
      {
        name: "Oienment",
        label: "Oienment",
        type: "text",
        value: "",
      },
      {
        name: "Hemostasis",
        label: "Homostasis",
        type: "text",
        value: "",
      },
      {
        name: "Details",
        label: "Details",
        type: "text",
        value: "",
      },
      {
        name: "Size",
        label: "Size (in cms)",
        type: "select",
        options: ["0.3", "0.4", "0.5"],
        value: "0.4",
      },
    ],
    addDocs: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque,
        optio itaque beatae id, nam laborum maxime amet illo laboriosam
        veniam sed quasi dignissimos blanditiis porro maiores deleniti modi
        ipsam eaque.`,
    items: [],
    showPinsOnSvg: true,
    locked: true,
  },
  [currentGroupsName.INJ_MED]: {
    name: currentGroupsName.INJ_MED,
    note: "",
    code: {
      name: "DX11",
      value: "EX10",
      options: ["EX10", "EX11", "EX22"],
    },
    color: "#00FF32",
    images: [],
    inputs: [
      {
        name: "Oienment",
        label: "Oienment",
        type: "text",
        value: "",
      },
      {
        name: "Hemostasis",
        label: "Homostasis",
        type: "text",
        value: "",
      },
      {
        name: "Details",
        label: "Details",
        type: "text",
        value: "",
      },
      {
        name: "Size",
        label: "Size (in cms)",
        type: "select",
        options: ["0.3", "0.4", "0.5"],
        value: "0.4",
      },
    ],
    addDocs: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque,
        optio itaque beatae id, nam laborum maxime amet illo laboriosam
        veniam sed quasi dignissimos blanditiis porro maiores deleniti modi
        ipsam eaque.`,
    items: [],
    showPinsOnSvg: true,
    locked: true,
  },
  [currentGroupsName.DIA_EC]: {
    name: currentGroupsName.DIA_EC,
    note: "",
    code: {
      name: "DX11",
      value: "EX10",
      options: ["EX10", "EX11", "EX22"],
    },
    color: "#96A3AA",
    images: [],
    inputs: [
      {
        name: "Oienment",
        label: "Oienment",
        type: "text",
        value: "",
      },
      {
        name: "Hemostasis",
        label: "Homostasis",
        type: "text",
        value: "",
      },
      {
        name: "Details",
        label: "Details",
        type: "text",
        value: "",
      },
      {
        name: "Size",
        label: "Size (in cms)",
        type: "select",
        options: ["0.3", "0.4", "0.5"],
        value: "0.4",
      },
    ],
    addDocs: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque,
        optio itaque beatae id, nam laborum maxime amet illo laboriosam
        veniam sed quasi dignissimos blanditiis porro maiores deleniti modi
        ipsam eaque.`,
    items: [],
    showPinsOnSvg: true,
    locked: true,
  },
  [currentGroupsName.SKIN_CANCER]: {
    name: currentGroupsName.SKIN_CANCER,
    note: "",
    code: {
      name: "DX11",
      value: "EX10",
      options: ["EX10", "EX11", "EX22"],
    },
    color: "#96A3AA",
    images: [],
    inputs: [
      {
        name: "Oienment",
        label: "Oienment",
        type: "text",
        value: "",
      },
      {
        name: "Hemostasis",
        label: "Homostasis",
        type: "text",
        value: "",
      },
      {
        name: "Details",
        label: "Details",
        type: "text",
        value: "",
      },
      {
        name: "Size",
        label: "Size (in cms)",
        type: "select",
        options: ["0.3", "0.4", "0.5"],
        value: "0.4",
      },
    ],
    addDocs: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque,
        optio itaque beatae id, nam laborum maxime amet illo laboriosam
        veniam sed quasi dignissimos blanditiis porro maiores deleniti modi
        ipsam eaque.`,
    items: [],
    showPinsOnSvg: true,
    locked: true,
  },
  [currentGroupsName.CUSTOM_LOOKUP]: {
    name: currentGroupsName.CUSTOM_LOOKUP,
    note: "",
    code: {
      name: "DX11",
      value: "EX10",
      options: ["EX10", "EX11", "EX22"],
    },
    color: "#96A3AA",
    images: [],
    inputs: [
      {
        name: "Oienment",
        label: "Oienment",
        type: "text",
        value: "",
      },
      {
        name: "Hemostasis",
        label: "Homostasis",
        type: "text",
        value: "",
      },
      {
        name: "Details",
        label: "Details",
        type: "text",
        value: "",
      },
      {
        name: "Size",
        label: "Size (in cms)",
        type: "select",
        options: ["0.3", "0.4", "0.5"],
        value: "0.4",
      },
    ],
    addDocs: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque,
        optio itaque beatae id, nam laborum maxime amet illo laboriosam
        veniam sed quasi dignissimos blanditiis porro maiores deleniti modi
        ipsam eaque.`,
    items: [],
    showPinsOnSvg: true,
    locked: true,
  },
};
