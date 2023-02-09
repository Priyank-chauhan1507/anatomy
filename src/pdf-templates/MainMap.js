import { Header, StandardPage, SVGImageWithDrawing } from "./common"
import {
    View,
    Image,
    Document,
    Page,
    Text,
    StyleSheet,
} from "@react-pdf/renderer"

// import { getPartOfRootSVG } from "../utils/exportUtils";
import { getRootSVGImage } from "../utils/exportUtils"
import ReportTable, { getPinShape } from "./ReportTable"
import {
    COMMENTS_TYPES,
    DEFER_TYPES,
    GROUPED_DIAGNOSIS_TYPES,
    GROUPED_PROCEDURE_TYPES,
    LIST_TYPES,
    ORDERED_TYPES,
    PAINTED_DISTRIBUTION_TYPES,
    SINGLE_DIAGNOSIS_TYPES,
} from "../constants/listsConstants"
import store from "../store"
import { chooseList } from "../utils/helpers"

export default function MohrsMapPDFTemplate({ diagnosisMap, patternMap }) {
    const listsOrder = store.getState().listStore.listsOrder
    const lists = store.getState().listStore.lists

    return (
        <Document>
            <Page size="A4">
                <Header />
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "100%",
                        justifyContent: "center",
                        padding: "15px",
                    }}
                >
                    <SVGImageWithDrawing orientation="portrait" />
                    <View
                        style={{
                            marginTop: "10px",
                            width: "100%",
                            backgroundColor: "#eee",
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        {listsOrder.length > 0 &&
                            listsOrder.map(
                                ({ listType, listSubtype }, index) => {
                                    if (
                                        listType ===
                                        LIST_TYPES.painted_distribution.name
                                    ) {
                                        return (
                                            <View
                                                style={{
                                                    margin: "12px 0px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    flex: "1 1 100px",
                                                    // gap: "10px",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: "7px",
                                                        marginBottom: "7px",
                                                    }}
                                                >
                                                    {
                                                        PAINTED_DISTRIBUTION_TYPES[
                                                            listSubtype
                                                        ].default_label
                                                    }
                                                </Text>
                                                <Image
                                                    source={() =>
                                                        patternMap[listSubtype]
                                                    }
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                ></Image>
                                            </View>
                                        )
                                    } else {
                                        const { shape, color } = chooseList(
                                            lists,
                                            listType,
                                            listSubtype
                                        ).attr
                                        return (
                                            <View
                                                style={{
                                                    margin: "12px 0px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    flex: "1 1 100px",
                                                    // gap: "10px",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: "7px",
                                                        marginBottom: "7px",
                                                    }}
                                                >
                                                    {listType ===
                                                    LIST_TYPES.grouped_procedure
                                                        .name
                                                        ? GROUPED_PROCEDURE_TYPES[
                                                              listSubtype
                                                          ].default_label
                                                        : listType ===
                                                          LIST_TYPES
                                                              .grouped_diagnosis
                                                              .name
                                                        ? GROUPED_DIAGNOSIS_TYPES[
                                                              listSubtype
                                                          ].default_label
                                                        : LIST_TYPES[listType]
                                                              .default_label}
                                                </Text>
                                                <View
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        backgroundColor: color,
                                                    }}
                                                >
                                                    {getPinShape(
                                                        shape,
                                                        color,
                                                        null,
                                                        null,
                                                        "5px"
                                                    )}
                                                </View>
                                            </View>
                                        )
                                    }
                                }
                            )}
                    </View>
                </View>
            </Page>
            <Page size="A4">
                <Header />
                {listsOrder.length > 0 &&
                    listsOrder.map(({ listType, listSubtype }, index) => {
                        switch (listType) {
                            case LIST_TYPES.ordered.name:
                                return (
                                    <ReportTable
                                        itemsOrder={lists[listType].itemsOrder}
                                        diagnosisMap={diagnosisMap}
                                        key={listType}
                                        listName={
                                            LIST_TYPES.ordered.default_label
                                        }
                                        listType={listType}
                                        attr={
                                            chooseList(
                                                lists,
                                                listType,
                                                listSubtype
                                            ).attr
                                        }
                                    />
                                )
                            case LIST_TYPES.grouped_procedure.name:
                                return (
                                    <ReportTable
                                        itemsOrder={
                                            lists[listType][listSubtype]
                                                .itemsOrder
                                        }
                                        diagnosisMap={diagnosisMap}
                                        key={listType + "-" + listSubtype}
                                        listName={
                                            GROUPED_PROCEDURE_TYPES[listSubtype]
                                                .default_label
                                        }
                                        subtype={listSubtype}
                                        listType={listType}
                                        attr={
                                            chooseList(
                                                lists,
                                                listType,
                                                listSubtype
                                            ).attr
                                        }
                                    />
                                )
                            case LIST_TYPES.grouped_diagnosis.name:
                                return (
                                    <ReportTable
                                        itemsOrder={
                                            lists[listType][listSubtype]
                                                .itemsOrder
                                        }
                                        diagnosisMap={diagnosisMap}
                                        key={listType + "-" + listSubtype}
                                        attr={
                                            chooseList(
                                                lists,
                                                listType,
                                                listSubtype
                                            ).attr
                                        }
                                        listType={listType}
                                        listName={
                                            GROUPED_DIAGNOSIS_TYPES[listSubtype]
                                                .default_label
                                        }
                                        subtype={listSubtype}
                                    />
                                )

                            case LIST_TYPES.single_diagnosis.name:
                                return (
                                    <ReportTable
                                        itemsOrder={lists[listType].itemsOrder}
                                        diagnosisMap={diagnosisMap}
                                        key={listType}
                                        listName={
                                            LIST_TYPES.single_diagnosis
                                                .default_label
                                        }
                                        listType={listType}
                                        attr={
                                            chooseList(
                                                lists,
                                                listType,
                                                listSubtype
                                            ).attr
                                        }
                                    />
                                )
                            case LIST_TYPES.comments.name:
                                return (
                                    <ReportTable
                                        itemsOrder={lists[listType].itemsOrder}
                                        diagnosisMap={diagnosisMap}
                                        key={listType}
                                        listName={
                                            LIST_TYPES.comments.default_label
                                        }
                                        listType={listType}
                                        attr={
                                            chooseList(
                                                lists,
                                                listType,
                                                listSubtype
                                            ).attr
                                        }
                                    />
                                )
                            case LIST_TYPES.defer.name:
                                return (
                                    <ReportTable
                                        itemsOrder={lists[listType].itemsOrder}
                                        diagnosisMap={diagnosisMap}
                                        key={listType}
                                        subtype={listSubtype}
                                        listName={
                                            LIST_TYPES.defer.default_label
                                        }
                                        listType={listType}
                                        attr={
                                            chooseList(
                                                lists,
                                                listType,
                                                listSubtype
                                            ).attr
                                        }
                                    />
                                )
                            case LIST_TYPES.painted_distribution.name:
                                return (
                                    <ReportTable
                                        itemsOrder={
                                            lists[listType][listSubtype]
                                                .itemsOrder
                                        }
                                        diagnosisMap={diagnosisMap}
                                        key={listType + "-" + listSubtype}
                                        distributed={true}
                                        listName={
                                            PAINTED_DISTRIBUTION_TYPES[
                                                listSubtype
                                            ].default_label
                                        }
                                        listType={listType}
                                        subtype={listSubtype}
                                        attr={
                                            chooseList(
                                                lists,
                                                listType,
                                                listSubtype
                                            ).attr
                                        }
                                        patternMap={patternMap}
                                    />
                                )
                            default:
                                return null
                        }
                    })}
            </Page>
        </Document>
    )
}
