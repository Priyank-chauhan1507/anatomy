import { FormControl, Select, useMediaQuery } from "@material-ui/core";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LIST_TYPES } from "../../constants/listsConstants";
import useTranslations from "../../hooks/useTranslations";
import { setMapContext } from "../../store/slices/app";
import { setActiveList, setActiveSubType } from "../../store/slices/lists";
import PaintedDistributionToolbar from "../AccordianToolset/PaintedDistributionToolbar";

const distributionModeOptions = [LIST_TYPES.painted_distribution];
const nonDistributionModeOptions = [
  LIST_TYPES.ordered,
  LIST_TYPES.grouped_procedure,
  LIST_TYPES.grouped_diagnosis,
  LIST_TYPES.single_diagnosis,
  LIST_TYPES.comments,
  LIST_TYPES.defer,
];

export const ListTypeSelector = ({
  name,
  default_label,
  options,
  isActive,
  activeSubType,
  onChange,
  onChangeSubType,
  translation_key,
}) => {
  const { uiData, pinTitles } = useTranslations();

  return (
    <div
      className={`list__btn list__btn__${name} ${isActive ? "selected" : ""}`}
      onClick={() => onChange(name)}>
      {pinTitles[translation_key]?.isChanged
        ? pinTitles[translation_key]?.changed
        : uiData[translation_key]?.tr_text || default_label}
      {isActive && (
        <FormControl className={`dropdown showDropdown`}>
          <Select
            native
            value={activeSubType}
            onChange={(e) => onChangeSubType(e.target.value)}
            className='list__dropdown'>
            {options.map(({ name, default_label, translation_key }) => {
              return (
                <option key={name} value={name}>
                  {uiData[translation_key]?.tr_text || default_label}
                </option>
              );
            })}
          </Select>
        </FormControl>
      )}
    </div>
  );
};
export default function ListSelectionBar(props) {
  const isDistributionMode = useSelector(
    (state) => state.listStore.isDistributionMode
  );
  const activeList = useSelector((state) => state.listStore.activeList);
  const mapContext = useSelector((state) => state.app.mapContext);
  const isWorkingOnList = mapContext === "list";
  const activeSubType = useSelector(
    (state) => state.listStore.lists[activeList].activeSubType
  );
  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  const dispatch = useDispatch();
  const opts = isDistributionMode
    ? distributionModeOptions
    : nonDistributionModeOptions;

  const handleChange = useCallback(
    (listType) => {
      dispatch(setMapContext("list"));
      dispatch(setActiveList(listType));
    },
    [dispatch]
  );

  const handleChangeSubType = useCallback(
    (newValue) => {
      dispatch(setActiveSubType(newValue));
    },
    [dispatch]
  );

  // useEffect(() => {
  //   if (activeSubType === 'custom_look_up_diag') {
  //     dispatch(openICDModal({listType:activeList,listSubtype:activeSubType,isGrouped:true}))
  //   }
  // }, [activeList, activeSubType])

  let activeOptIndex = -1;
  const selectors = opts.map(
    ({ name, default_label, options, translation_key }, index) => {
      const isActive = activeList === name && isWorkingOnList;
      if (isActive) {
        activeOptIndex = index;
      }
      return (
        <ListTypeSelector
          key={name}
          name={name}
          activeSubType={activeSubType}
          isActive={isActive}
          onChange={handleChange}
          onChangeSubType={handleChangeSubType}
          default_label={default_label}
          options={options}
          translation_key={translation_key}
        />
      );
    }
  );
  return (
    <div className='app__nav__listSelect'>
      {isDistributionMode && (
        <PaintedDistributionToolbar subtype={activeSubType} />
      )}
      <div className='app__nav__listSelect__switch'>
        <div
          className={`list__btn list__btn__selector`}
          style={{
            left:
              activeOptIndex === -1
                ? (isSmallScreen ? 22 : 20) * activeOptIndex
                : (isSmallScreen ? 110 : 100) * activeOptIndex,
            opacity: isWorkingOnList ? 1 : 0,
          }}></div>
        {selectors}
      </div>
    </div>
  );
}
