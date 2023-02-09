import { getBounds, getCoordsFromDeviation } from "../../utils/cf";
// import { addMarker } from "../AnatomyMapper";
import {
  asterisk_pin,
  caret_pin,
  circle_pin,
  encapsulated_circle_pin,
  hyphenElement,
  map_pin,
} from "../AnatomyMapper/pinStrings";

//this function runs whenever you change the pin shape
//and modifies the previously plotted points
export const updatePinShape = (
  listItems,
  selectedPinShape,
  pinColor,
  listChronology,
  left_to_right
) => {
  listItems.forEach(({ droppedPin__id, id }) => {
    const elem = document.getElementById(droppedPin__id);
    if (elem) {
      const pinWrapper = elem.getElementsByClassName("Pin-Marker-Wrapper")[0];
      const pinLabel = elem.getElementsByClassName("Pin-Label")[0];
      const hyphen = elem.getElementsByClassName("Pin-Hyphen")[0];
      const pinDescription = elem.getElementsByClassName("Pin-Description")[0];
      if (left_to_right) {
        pinLabel.setAttribute("x", 24);
        hyphen.setAttribute("x", 56);
        pinDescription.setAttribute("x", 80);
        pinDescription.setAttribute("text-anchor", "start");
      } else {
        pinLabel.setAttribute("x", -48);
        hyphen.setAttribute("x", -76);
        pinDescription.setAttribute("x", -88);
        pinDescription.setAttribute("text-anchor", "end");
      }

      pinLabel.innerHTML = getChronologyLabel(listChronology, id);
      pinLabel.setAttribute("y", 16);
      pinLabel.style.fill = pinColor;
      pinDescription.style.fill = pinColor;
      hyphen.innerHTML = hyphenElement({ pinColor });

      pinWrapper.setAttribute("x", -14);
      pinWrapper.setAttribute("y", -10);

      pinLabel.removeAttribute("dominant-baseline");
      pinLabel.removeAttribute("text-anchor");

      if (selectedPinShape === 0) {
        //
        pinWrapper.innerHTML = circle_pin({ fillColor: pinColor });
        pinWrapper.setAttribute("x", -11);
        pinWrapper.setAttribute("y", -11);
      }
      if (selectedPinShape !== 0) {
        pinWrapper.style.backgroundColor = "red";
        pinWrapper.classList.add("squarePin");
        if (selectedPinShape === 1) {
          pinWrapper.setAttribute("x", -9);
          pinWrapper.setAttribute("y", -11);
          pinWrapper.innerHTML = asterisk_pin({ fillColor: pinColor });
        } else if (selectedPinShape === 2) {
          pinWrapper.setAttribute("x", -10);
          pinWrapper.setAttribute("y", -11);
          pinWrapper.innerHTML = caret_pin({ fillColor: pinColor });
        } else if (selectedPinShape === 3) {
          pinWrapper.setAttribute("x", -11);
          pinWrapper.setAttribute("y", -22);
          pinWrapper.innerHTML = map_pin({ fillColor: pinColor });
        } else if (selectedPinShape === 4) {
          pinLabel.style.fill = "white";
          pinLabel.style.fontWeight = "bolder";
          pinWrapper.innerHTML = encapsulated_circle_pin({
            fillColor: pinColor,
          });
          pinWrapper.setAttribute("x", -22);
          pinWrapper.setAttribute("y", -24);

          const pinX = Number(pinWrapper.getAttribute("x"));
          const pinY = Number(pinWrapper.getAttribute("y"));
          let { width: pinWidth, height: pinHeight } = pinWrapper.getBBox();
          pinWidth = Number(pinWidth);
          pinHeight = Number(pinHeight);

          let { width: pinLableWidth, height: pinLabelHeight } =
            pinLabel.getBBox();
          if (pinLableWidth > pinWidth - 1 || pinLabelHeight > pinHeight - 1) {
            pinLabel.style.fontSize = "1.5rem";
          }
          pinLabel.setAttribute("x", pinX + pinWidth / 2);
          pinLabel.setAttribute("y", pinY + pinHeight / 2 + 2.5);
          pinLabel.setAttribute("dominant-baseline", "middle");
          pinLabel.setAttribute("text-anchor", "middle");

          //for encapsulated pin, pin description shifts closer to the pin
          hyphen.setAttribute("x", 36);
          pinDescription.setAttribute("x", 60);

          if (left_to_right) {
            hyphen.setAttribute("x", 11 * 4);
            pinDescription.setAttribute("x", 18 * 4);
          } else {
            hyphen.setAttribute("x", -13 * 4);
            pinDescription.setAttribute("x", -16 * 4);
          }
        }
      }
    }
  });
};

export const updatePinsOnResize = (
  listItems,
  selectedPinShape,
  pinColor,
  chronology = "",
  left_to_right
) => {
  return listItems.map((listContent, index) => {
    const elem = document.getElementById(listContent.droppedPin__id);
    if (elem) {
      elem.remove();
    }
    // const newCoords = getCoordsFromDeviation(
    //   getBounds(listContent.content_id),
    //   listContent.attrInfo.deviation
    // );

    const coords = listContent.attrInfo.normalized_coords;
    // addMarker({
    //   coords,
    //   useAbsoluteCoords: true,
    //   chronology: getChronologyLabel(chronology, index + 1),
    //   droppedPin__id: listContent.droppedPin__id,
    //   listType: listContent.list__type,
    //   subType: listContent.sub__type,
    //   pin_description: listContent.pin_description,
    //   pinShape: selectedPinShape,
    //   fillColor: pinColor,
    //   left_to_right,
    // });

    return {
      ...listContent,
      attrInfo: {
        ...listContent.attrInfo,
      },
    };
  });
};

function integer_to_roman_upper(num) {
  if (typeof num !== "number") return false;

  var digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman_num = "",
    i = 3;
  while (i--) roman_num = (key[+digits.pop() + i * 10] || "") + roman_num;
  return Array(+digits.join("") + 1).join("M") + roman_num;
}
function integer_to_roman_lower(num) {
  if (typeof num !== "number") return false;

  var digits = String(+num).split(""),
    key = [
      "",
      "c",
      "cc",
      "ccc",
      "cd",
      "d",
      "dc",
      "dcc",
      "dccc",
      "cm",
      "",
      "x",
      "xx",
      "xxx",
      "xl",
      "l",
      "lx",
      "lxx",
      "lxxx",
      "xc",
      "",
      "i",
      "ii",
      "iii",
      "iv",
      "v",
      "vi",
      "vii",
      "viii",
      "ix",
    ],
    roman_num = "",
    i = 3;
  while (i--) roman_num = (key[+digits.pop() + i * 10] || "") + roman_num;
  return Array(+digits.join("") + 1).join("M") + roman_num;
}

export const getChronologyLabel = (type, id) => {
  switch (type) {
    case "A-Z":
      return `${String.fromCharCode(64 + id)}`;
    case "a-z":
      return `${String.fromCharCode(96 + id)}`;
    case "1-9":
      return `${0 + id}`;
    case "I-IX":
      return integer_to_roman_upper(id);
    case "i-ix":
      return integer_to_roman_lower(id);
    case "--":
      return "";
    default:
      return `${64 + id}`;
  }
};
