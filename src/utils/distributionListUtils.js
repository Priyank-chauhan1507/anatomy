export const currentDistributionList = {
  DERMATITIS_NOS: "Dermatitis NOS",
};

export const DISTRIBUTION_FILL_PATTERNS = {
  SOLID: "-",
  DASH: "--",
  DOTTED: "..",
};

export const DISTRIBUTION_LIST = {
  [currentDistributionList.DERMATITIS_NOS]: {
    name: currentDistributionList.DERMATITIS_NOS,
    note: "",
    code: "",
    opacity: 0.6,
    pattern: DISTRIBUTION_FILL_PATTERNS["DASH"],
    color: "#FF0000",
    items: [],
  },
};
