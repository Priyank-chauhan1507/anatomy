import React, { useState, useEffect } from "react";
import "../../../css/app.css";
import "../../../css/global.css";
import ListContent from "../../../ListContent";
import { patchSNSObject } from "../../../App";

import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
// import "date-fns";
import { ReactSortable } from "react-sortablejs";
import { cloneDeep } from "lodash";

const GroupedItems = (props) => {
  const {
    locked,
    listItems,
    setAnatomicSiteGroup,
    setBiopsy__type,
    setPinDescription,
    setUser__image,
    delete__content,
    setListItems,
    color,
    pinShape,
    transfer_to_parent,
    onLocatePin,
    sns,
    getARName,
    onOpenNameBuilder,
    nameIncludes,
    delimiter,
    formData,
    allSNS,
    editPinDescription,
  } = props;

  useEffect(() => {
    listItems.forEach(({ droppedPin__id }) => {
      const elem = document.getElementById(droppedPin__id);
      if (elem) {
        elem.getElementsByClassName("Pin-Marker")[0].style.fill = color;
        elem.getElementsByClassName(
          "Hyphen-svg"
        )[0].firstElementChild.style.fill = color;
        elem.getElementsByClassName("Pin-Description")[0].style.fill = color;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, listItems.length]);

  const [listOrderDescending] = useState(false);
  const sortList = (listContents) => {
    return listContents.map((content, index) => {
      if (content.list__type === "ordered") {
        document.getElementById(`${content.droppedPin__id}__label`).innerHTML =
          listOrderDescending
            ? String.fromCharCode(64 + (listContents.length - index))
            : String.fromCharCode(65 + index);
      }
      return {
        ...content,
        id: listOrderDescending ? listContents.length - index : index + 1,
      };
    });
  };

  return (
    <AccordionDetails className='app__mainBody__list__body'>
      <Typography>
        <ReactSortable
          list={listItems}
          setList={setListItems}
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          onEnd={() => {
            setListItems(sortList(listItems));
          }}
          handle='.item-handle-icon'
          filter='.NoSort'>
          {listItems.length &&
            listItems.map((listContent, index) => {
              return (
                <ListContent
                  locked={locked}
                  pinOnSea={listContent.pin_on_sea}
                  key={listContent.id}
                  id={listContent.id}
                  content_id={listContent.content_id}
                  color={color}
                  pinShape={pinShape}
                  nameIncludes={nameIncludes}
                  delimiter={delimiter}
                  formData={{ ...formData, ...listContent }}
                  biopsy__type={listContent.biopsy__type}
                  pin_description={listContent.pin_description}
                  anatomic__site={listContent.anatomic__site}
                  hierarchy={listContent.hierarchy}
                  list__type={listContent.list__type}
                  user__notes={listContent.user__notes}
                  sns={sns}
                  user__image={listContent.user__image}
                  inputs={listContent.inputs}
                  setPinDescription={(pinDescription) => {
                    setPinDescription(pinDescription, index);
                  }}
                  setAnatomicSite={(newAnatomicSite) => {
                    setAnatomicSiteGroup(newAnatomicSite, index);
                  }}
                  setBiopsy__type={(biopsy) => {
                    setBiopsy__type(biopsy, index);
                  }}
                  delete__content={(id) => {
                    delete__content(index);

                    // setUnorderedListContents(newUnorderedListContents);
                  }}
                  ar={getARName(listContent.droppedPin__id)}
                  setUser__image={(image) => {
                    setUser__image(index, image);

                    // setUnorderedListContents(newUnorderedListContents);
                  }}
                  onInputChange={(newValue, ind) => {
                    const newListItems = cloneDeep(listItems);
                    newListItems[index].inputs[ind]["value"] = newValue;
                    setListItems(newListItems);
                  }}
                  setUser__notes={(notes) => {
                    // setUnorderedListContents(newUnorderedListContents);
                  }}
                  transfer_to_parent={(parentId) => {
                    transfer_to_parent(parentId, listContent.droppedPin__id);
                  }}
                  coords={listContent.normalized_coords}
                  droppedPinId={listContent.droppedPin__id}
                  onLocatePin={onLocatePin}
                  defined_name={listContent.defined_name}
                  native_name={listContent.native_name}
                  attrInfo={listContent.attrInfo}
                  onOpenNameBuilder={() => {
                    onOpenNameBuilder({
                      names: listContent.defined_name,
                      id: listContent.id,
                      native_name: listContent.native_name,
                      site_amid: listContent.attrInfo.amid,
                      droppedPin__id: listContent.droppedPin__id,
                      hierarchy: listContent.hierarchy,
                      pinOnSea: listContent.pin_on_sea,
                    });
                  }}
                  editPinDescription={editPinDescription}
                />
              );
            })}
        </ReactSortable>
      </Typography>
    </AccordionDetails>
  );
};

export default GroupedItems;
