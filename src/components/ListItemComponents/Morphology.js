import {
  Box,
  Button,
  Chip,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { HelpOutlined } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { Autocomplete } from "@material-ui/lab";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import useTranslations from "../../hooks/useTranslations";
import { updateMorphologies } from "../../store/slices/lists";
import CustomizedDialogs from "../Dialog/Dialog";

function Morphology({
  itemId,
  isGrouped,
  morphologies,
  listSubtype,
  listType,
}) {
  const [openMorph, setOpenMorph] = useState(false);
  const [currentMorph, setCurrentMorph] = useState("");
  const { morphoMap, morphoArray, uiData } = useTranslations();
  // const morphologies = useSelector(
  //   (state) => state.listStore.itemsMap[itemId].morphologies
  // );
  const dispatch = useDispatch();
  const onInputChange = (e, value) => {
    setCurrentMorph(value);
  };
  const setMorphologies = useCallback(
    (m) => {
      if (isGrouped) {
        const data = { isGrouped, listType, listSubtype };
        dispatch(updateMorphologies({ data, morphologies: m }));
      } else {
        const data = { isGrouped, itemId };
        dispatch(updateMorphologies({ data, morphologies: m }));
      }
    },
    //eslint-disable-next-line
    [dispatch]
  );
  const handleOnAddClick = () => {
    if (!morphologies.some((item) => item === currentMorph))
      setMorphologies([...morphologies, { name: currentMorph }]);
    setOpenMorph(false);
  };

  return (
    <>
      <CustomizedDialogs
        open={openMorph}
        onClose={() => {
          setOpenMorph(false);
          setCurrentMorph("");
        }}
        title={`${uiData?.drawingTools_Select?.tr_text}  ${uiData?.label_Morphology?.tr_text}`}
        body={
          <>
            {morphoMap && (
              <Autocomplete
                id="combo-box-demo"
                options={morphoArray}
                renderOption={(v) => {
                  return morphoMap[v].synonym_language;
                }}
                getOptionLabel={(v) => {
                  return morphoMap[v].synonym_language;
                }}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`${uiData?.label_Morphology?.tr_text} Type`}
                    variant="outlined"
                  />
                )}
                onChange={onInputChange}
              />
            )}
          </>
        }
        footer={
          <div>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={() => {
                handleOnAddClick();
              }}
            >
              {uiData?.label_Add?.tr_text}
            </Button>
          </div>
        }
      />

      <Box display="flex" alignItems="center">
        <Tooltip title={uiData?.label_Morphology_help?.tr_text}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              marginTop: "2px",
            }}
          >
            <HelpOutlined fontSize={"small"} />
          </span>
        </Tooltip>
        <Typography>{uiData?.label_Morphology?.tr_text}:</Typography>
        <AddIcon fontSize={"small"} onClick={() => setOpenMorph(true)} />
        <ReactSortable
          list={morphologies}
          setList={setMorphologies}
          animation={200}
          style={{
            display: "flex",
            gap: 8,
            minWidth: 40,
            flexWrap: "wrap",
          }}
          handle=".sorting-handle"
        >
          {morphologies.map((item, index) => {
            return (
              <span className={"sorting-handle"} key={item.name}>
                <Chip
                  label={morphoMap[item.name].synonym_language}
                  onDelete={() => {
                    const newMorphologies = [...morphologies];
                    newMorphologies.splice(index, 1);
                    setMorphologies(newMorphologies);
                  }}
                />
              </span>
            );
          })}
        </ReactSortable>
      </Box>
    </>
  );
}

export default Morphology;
