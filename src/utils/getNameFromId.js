export const getNameFromId = (id, lateralityData, anatomicData) => {
  if (typeof id === "string") {
    if (id.includes(".")) {
      const [laterlityPart, restId] = id.split(".");
      const amid = laterlityPart.split("-")[0];
      let laterlity = laterlityPart.split("-")[1];
      laterlity =
        laterlity === "L"
          ? lateralityData.left.text
          : laterlity === "R"
          ? lateralityData.right.text
          : "";
      const [...rest] = restId.split("--");
      let name = "";
      if (anatomicData && anatomicData[amid]) {
        name = anatomicData[amid].synonym_language;
      }

      const prefixList = [];
      const suffixList = [];
      const researchList = [];

      rest.forEach((entity) => {
        let [key, value] = entity.split(":");
        // prefix
        if (
          ["data-pre1", "data-pre2", "data-pre3", "data-pre4"].some(
            (k) => k === key
          )
        ) {
          if (lateralityData?.modifierTerms[value])
            prefixList.push(lateralityData?.modifierTerms[value]?.tr_text);
        }

        // suffix
        if (["data-post1", "data-post2", "data-post3"].some((k) => k === key)) {
          if (lateralityData?.modifierTerms[value])
            suffixList.push(lateralityData?.modifierTerms[value]?.tr_text);
        }

        // research
        if (["data-egzt", "data-egzx", "data-egzy"].some((k) => k === key)) {
          if (lateralityData?.modifierTerms[value])
            researchList.push(lateralityData?.modifierTerms[value]?.tr_text);
        }
      });

      const data = {
        laterlity: {
          length: laterlity ? 1 : 0,
          text: laterlity,
          type: "laterlity",
        },
        prefix: {
          length: prefixList.length,
          text: prefixList.join(" "),
          type: "prefix",
        },
        name: {
          length: name ? 1 : 0,
          text: name,
          type: "name",
        },
        suffix: {
          length: suffixList.length,
          text: suffixList.join(" "),
          type: "suffix",
        },
        research: {
          length: researchList.length,
          text: researchList.join(" "),
          type: "research",
        },
        getFullName: (snsSequence, isDistribution = false) => {
          // return snsSequence == "laterality_then_site"
          //   ? laterlity +
          //       " " +
          //       prefixList.join(" ") +
          //       " " +
          //       name +
          //       " " +
          //       suffixList.join(" ")
          //   : prefixList.join(" ") +
          //       " " +
          //       name +
          //       " " +
          //       suffixList.join(" ") +
          //       " " +
          //       laterlity;

          //isDistribution if true then hide EM's

          const lists = {
            laterality: (
              <>
                &nbsp;<u>{laterlity}</u>
              </>
            ),
            anatomic_site: (
              <>
                &nbsp;<b>{name}</b>
              </>
            ),
            prefix: prefixList.length > 0 ? " " + prefixList.join(" ") : "",
            suffix:
              suffixList.length > 0 ? " {" + suffixList.join(" ") + "}" : "",
            enhance_modifier:
              researchList.length > 0 && !isDistribution
                ? " (" + researchList.join(" ") + ")"
                : "",
          };
          if (typeof snsSequence != "object")
            return snsSequence === "laterality_then_site" ? (
              <>
                <u>{laterlity}</u>
                {" " +
                  prefixList.join(" ") +
                  " " +
                  name +
                  " " +
                  suffixList.join(" ")}
              </>
            ) : (
              <>
                {prefixList.join(" ") +
                  " " +
                  name +
                  " " +
                  suffixList.join(" ") +
                  " "}
                <u>{laterlity}</u>
              </>
            );
          else {
            const snsStateObject = {};
            Object.values(snsSequence.orderList).forEach((val) => {
              snsStateObject[val.id] = val;
            });
            lists.optional_separator =
              snsStateObject.optional_separator.defaultValueTextBox;

            const newSnsSequence = snsSequence.orderList
            // eslint-disable-next-line
              .map((item) => {
                if (item.visible) return item.id;
              })
              .filter((id) => lists[id] || id === "optional_separator");

            return (
              <>
                {// eslint-disable-next-line
                newSnsSequence.map((id, index) => {
                  if (
                    (id === "optional_separator" &&
                      index !== newSnsSequence.length - 1) ||
                    id !== "optional_separator"
                  )
                    return lists[id];
                })}
              </>
            );
          }
        },
      };
      return data;
    } else if (id === "white_space") {
      const data = {
        laterlity: {
          length: 0,
        },
        prefix: {
          length: 0,
        },
        name: {
          length: 0,
          text: "",
          type: "name",
        },
        suffix: {
          length: 0,
        },
        research: {
          length: 0,
        },
        getFullName: () => {
          return id;
        },
      };

      return data;
    } else {
      const [notNamePart, namePart] = id.split("-");
      let name = "";
      if (namePart) {
        const indexOfHl = namePart.indexOf("HL");
        name = indexOfHl !== -1 ? namePart.substring(0, indexOfHl) : namePart;
      } else {
        name = notNamePart;
      }

      name = name.split("_").join(" ");
      const data = {
        laterlity: {
          length: 0,
        },
        prefix: {
          length: 0,
        },
        name: {
          length: name ? 1 : 0,
          text: name,
          type: "name",
        },
        suffix: {
          length: 0,
        },
        research: {
          length: 0,
        },
        getFullName: () => {
          return name;
        },
      };

      return data;
    }
  }
  return id;
};
