import React, { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
    GROUPED_PROCEDURE_TYPES,
    LIST_TYPES,
} from "../../../constants/listsConstants"
import useTranslations from "../../../hooks/useTranslations"
import SubToolbar from "../../subtoolbar/OrderedSubToolbar"
import { CommonItemWrapper } from "../ItemTemplates"
import { CommonListWrapper } from "../ListTemplates"

import { useDispatch } from "react-redux"
import { ReactSortable } from "react-sortablejs"
import { reorderItems } from "../../../store/slices/lists"
import { chooseList } from "../../../utils/helpers"
import { setItemVisibility } from "../../../store/slices/lists"

const GroupProcedureItem = ({ itemId, locked, subtype }) => {
    return (
        <div className="listContent__item">
            <CommonItemWrapper
                itemId={itemId}
                subtype={subtype}
                listType={LIST_TYPES.grouped_procedure.name}
                subtypeOptions={LIST_TYPES.grouped_procedure.options}
                locked={locked}
            />
        </div>
    )
}
export const GroupedProcedureList = ({ subtype }) => {
    const { uiData, pinTitles } = useTranslations()
    const itemsOrder = useSelector(
        (state) =>
            state.listStore.lists[LIST_TYPES.grouped_procedure.name][subtype]
                .itemsOrder
    )
    const { locked, color, visibility, shape, order, grouped, onlyOnMap } =
        useSelector(
            (state) =>
                state.listStore.lists[LIST_TYPES.grouped_procedure.name][
                    subtype
                ].attr
        )

    const dispatch = useDispatch()
    const onReorder = useCallback(
        (newItemsOrder) => {
            dispatch(
                reorderItems({
                    listType: LIST_TYPES.grouped_procedure.name,
                    listSubtype: subtype,
                    newItemsOrder,
                })
            )
        },
        [dispatch, subtype]
    )

    const [changeTitle, setChangeTitle] = useState(
        `${uiData[GROUPED_PROCEDURE_TYPES[subtype].translation_key].tr_text}`
    )

    useEffect(() => {
        setChangeTitle(
            pinTitles[GROUPED_PROCEDURE_TYPES[subtype].translation_key]
                ?.isChanged
                ? pinTitles[GROUPED_PROCEDURE_TYPES[subtype].translation_key]
                      ?.changed
                : uiData[GROUPED_PROCEDURE_TYPES[subtype].translation_key]
                      .tr_text
        )
        //eslint-disable-next-line
    }, [uiData])

    const pinListSettings = useSelector(
        (state) =>
            chooseList(
                state.listStore.lists,
                LIST_TYPES.grouped_procedure.name,
                subtype
            ).attr.pinListSettings
    )

    useEffect(() => {
        if (pinListSettings["show_pin_description"])
            Object.keys(itemsOrder).forEach((key) => {
                dispatch(
                    setItemVisibility({
                        name: "pinDescriptionVisibility",
                        itemId: itemsOrder[key].id,
                        toggle: 1,
                    })
                )
            })
        else
            Object.keys(itemsOrder).forEach((key) => {
                dispatch(
                    setItemVisibility({
                        name: "pinDescriptionVisibility",
                        itemId: itemsOrder[key].id,
                        toggle: 0,
                    })
                )
            })
    }, [pinListSettings, itemsOrder])

    return (
        <CommonListWrapper
            listType={LIST_TYPES.grouped_procedure.name}
            listSubtype={subtype}
            title={
                uiData[GROUPED_PROCEDURE_TYPES[subtype].translation_key].tr_text
            }
            inBracketTitle={itemsOrder.length}
            target={GROUPED_PROCEDURE_TYPES[subtype].translation_key}
            OgTitle={GROUPED_PROCEDURE_TYPES[subtype].default_label}
            changeTitle={changeTitle}
            setChangeTitle={setChangeTitle}
            locked={locked}
            printButton={false}
            color={color}
            visibility={visibility}
            listItemContainer={
                <div style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                        {/* <SubToolbar
              locked={locked}
              shape={shape}
              order={order}
              color={color}
              grouped={grouped}
              onlyOnMap={onlyOnMap}
              listType={LIST_TYPES.grouped_procedure.name}
              listSubtype={subtype}
              changeTitle={changeTitle}
            /> */}
                    </div>
                    <div style={{ width: "100%" }}>
                        <ReactSortable
                            list={itemsOrder}
                            setList={onReorder}
                            handle=".item-handle-icon"
                            filter=".NoSort"
                        >
                            {itemsOrder.map(({ id: itemId }, index) => (
                                <GroupProcedureItem
                                    key={itemId}
                                    itemId={itemId}
                                    subtype={subtype}
                                    locked={locked}
                                />
                            ))}
                        </ReactSortable>
                    </div>
                </div>
            }
        />
    )
}

export default GroupedProcedureList
