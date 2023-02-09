export default function getLabelsList(lateralityData, uiData, label) {
  const labelsList = {};

  Object.values(lateralityData.modifierTerms).forEach((val) => {
    labelsList[val.modifier_id] = val.tr_text;
  });

  var array = ["bilateral", "right", "left", "median", "unilateral"];
  array.forEach((item) => {
    const { laterality_id, text } = lateralityData[item];
    labelsList[laterality_id] = text;
  });

  return labelsList;
}
