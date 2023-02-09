import { StyleSheet, Text, View, Image, Svg, Path } from "@react-pdf/renderer"

import store from "../store"
import PinWithLabel from "../components/PinWithLabel"
import { getImage } from "../utils/fileCache"
// import { EncapsulatedCirclePin } from "../utils/pinUtils"
import useTranslations from "../hooks/useTranslations"
import Names from "./Name"
import { useSNS } from "../hooks/listAndItemHooks"
import { id } from "date-fns/locale"
import ItemDiagnosis from "./ItemDiagnosis"
import { getPartOfRootSVGWithPoint } from "../utils/exportUtils"
import { getPartOfRootSVGWithRegion } from "../utils/exportUtils/root-svg"
import { LIST_TYPES } from "../constants/listsConstants"
import { ORDERS, PIN_SHAPES } from "../constants/itemConstants"
import { DarkOrLight } from "../utils/colourNameToHex"

export const getPinShape = (
    selectedPinShape,
    orderedListColor,
    order,
    index,
    fSize = "9px",
    size = "12px"
) => {
    switch (selectedPinShape) {
        case PIN_SHAPES.circle.name:
            return <CirclePin fillColor={orderedListColor} />
        case PIN_SHAPES.asterik.name:
            return <AsteriskPin fillColor={orderedListColor} />
        case PIN_SHAPES.triangle.name:
            return <CaretPin fillColor={orderedListColor} />
        case PIN_SHAPES.pin.name:
            return <MapPin fillColor={orderedListColor} />
        case PIN_SHAPES.inside_circle.name:
            return (
                <EncapsulatedCirclePin
                    fillColor={orderedListColor}
                    order={order}
                    index={index}
                    fSize={fSize}
                />
            )
        default:
            return <CirclePin fillColor={orderedListColor} />
    }
}

export const CirclePin = ({ fillColor = "red", size = "8px" }) => {
    return (
        <View
            style={{
                height: size,
                width: size,
                borderRadius: "50%",
                backgroundColor: fillColor,
                borderColor: "white",
                borderWidth: "1px",
                borderStyle: "solid",
            }}
        ></View>
    )
}

export const EncapsulatedCirclePin = ({
    fillColor = "red",
    size = "12px",
    fSize = "9px",
    order,
    index,
    text,
}) => {
    let col = fillColor
        ? DarkOrLight(fillColor) === "#000000"
            ? "#000000"
            : "#ffffff"
        : "#ffffff"

    return (
        <View
            style={{
                height: size,
                width: size,
                borderRadius: "50%",
                backgroundColor: fillColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: col,
                fontSize: ".5rem",
                fontWeight: "700",
                borderColor: "white",
                borderWidth: "1px",
                borderStyle: "solid",
            }}
        >
            <Text style={{ color: "white", fontSize: fSize }}>
                {order ? ORDERS[order].resolve(index) : "Aa#"}
                {/* {order ? console.log(ORDERS[order].resolve(index + 1)) : ""} */}
            </Text>
        </View>
    )
}

export const AsteriskPin = ({ fillColor = "rgb(0,0,255)", size = "9px" }) => {
    return (
        <View
            style={{
                width: size,
                height: size,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: fillColor,
            }}
        >
            <Svg width="50" viewBox="0 0 512 512">
                <Path
                    fill={fillColor}
                    stroke="white"
                    stroke-width="25"
                    d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z"
                />
            </Svg>
        </View>
    )
}

export const CaretPin = ({ fillColor = "rgb(0,0,255)", size = "9px" }) => {
    return (
        <View
            style={{
                border: "0",
                height: size,
                width: size,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: fillColor,
            }}
        >
            <Svg width="50" viewBox="0 0 320 512">
                <Path
                    fill={fillColor}
                    stroke="white"
                    stroke-width="25"
                    d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"
                />
            </Svg>
        </View>
    )
}

export const MapPin = ({ fillColor = "rgb(0,0,255)", size = "8px" }) => {
    return (
        <View
            style={{
                width: size,
                height: size,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: fillColor,
            }}
        >
            <Svg
                // class="svg-inline--fa fa-map-marker-alt fa-w-12"
                // role="img"
                // xmlns="http://www.w3.org/2000/svg"
                width="50"
                viewBox="0 0 384 512"
            >
                <Path
                    fill={fillColor}
                    stroke="white"
                    strokeWidth="25"
                    d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    table: {
        width: "100%",
    },
    row: {
        flexDirection: "row",
        borderTop: "1px solid #EEE",
        paddingHorizontal: "8px",
        paddingVertical: "8px",
        width: "100%",
    },
    header: {
        borderTop: "none",
        color: "white",
    },
    bold: {
        fontWeight: "bold",
    },
    // So Declarative and unDRY 👌
    row1: {
        width: "10%",
        fontSize: "12px",
        overflow: "break-word",
        padding: "2px",
    },
    row2: {
        width: "30%",
        fontSize: "12px",
        overflow: "break-word",
        padding: "2px",
    },
    row3: {
        width: "20%",
        fontSize: "12px",
        overflow: "break-word",
        padding: "2px",
    },
    row4: {
        width: "20%",
        fontSize: "12px",
        overflow: "break-word",
        padding: "2px",
    },
    row5: {
        width: "20%",
        fontSize: "12px",
        overflow: "break-word",
        padding: "2px",
    },
})

const ReportTable = ({
    diagnosisMap,
    itemsOrder,
    listName,
    attr,
    listType,
    patternMap,
    subtype,
}) => {
    const { color, shape, order } = attr
    const data = store.getState()
    const itemMap = data.listStore.itemsMap
    var data1 = []
    for (const [key, val] of Object.entries(itemMap)) {
        data1.push(val)
    }

    return (
        <View style={{ marginBottom: "50px" }}>
            {/* <View
                style={{
                    fontSize: "18px",
                    padding: "6px",
                    marginBottom: "6px",
                    color: "blue",
                }}
            > */}
            <Svg viewBox="0 0 300 40">
                <Text x="4" y="30" fill={color} style={{ fontSize: "10px" }}>
                    {listName}
                </Text>
            </Svg>
            {/* </View> */}
            <View style={styles.table}>
                <View style={[styles.row, styles.bold, styles.header]}>
                    <Text style={{ ...styles.row1, backgroundColor: "blue" }}>
                        Order
                    </Text>
                    <Text style={{ ...styles.row2, backgroundColor: "blue" }}>
                        Name
                    </Text>
                    <Text style={{ ...styles.row3, backgroundColor: "blue" }}>
                        Subtype and Morphology
                    </Text>
                    <Text style={{ ...styles.row4, backgroundColor: "blue" }}>
                        {listType === LIST_TYPES.painted_distribution.name
                            ? "Distribution Regions"
                            : "Pin Preview"}
                    </Text>
                    <Text style={{ ...styles.row5, backgroundColor: "blue" }}>
                        Attachments
                    </Text>
                </View>
                {itemsOrder
                    ? itemsOrder.map(({ id }, i) => {
                          const row = itemMap[id]

                          return (
                              <View key={i} style={styles.row} wrap={false}>
                                  <View
                                      style={{
                                          ...styles.row1,
                                          borderRadius: "50%",
                                          flexDirection: "row",
                                      }}
                                  >
                                      {patternMap ? (
                                          <Image
                                              source={() => patternMap[subtype]}
                                              style={{
                                                  width: "20px",
                                                  height: "20px",
                                              }}
                                          ></Image>
                                      ) : (
                                          getPinShape(shape, color, order, i)
                                      )}
                                      {!patternMap &&
                                      listName === "Ordered Procedure" ? (
                                          <Text
                                              style={{
                                                  textAlign: "center",
                                                  fontSize: "10px",
                                                  marginLeft: "1px",
                                              }}
                                          >
                                              {String.fromCharCode(
                                                  i + "A".charCodeAt(0)
                                              )}
                                          </Text>
                                      ) : (
                                          ""
                                      )}
                                  </View>

                                  <View style={styles.row2}>
                                      {<Names names={row.names} id={row.id} />}
                                      <Text style={{ color: color }}>
                                          {row.listSubtype}
                                      </Text>
                                      <Text
                                          style={{
                                              fontSize: "10px",
                                              marginTop: "10px",
                                          }}
                                      >
                                          Dx:{" "}
                                          {row.diagnoses.length &&
                                              row.diagnoses.map(({ icd }) => {
                                                  return (
                                                      diagnosisMap[icd] +
                                                      " (" +
                                                      icd +
                                                      ") "
                                                  )
                                              })}
                                          {/* <ItemDiagnosis
                                      itemId={row.id}
                                      isGrouped={true}
                                  /> */}
                                      </Text>
                                  </View>
                                  <View style={styles.row3}>
                                      <Text>{row.listSubtype}</Text>
                                      <Text> </Text>
                                      <Text>Notes: {row.notes}</Text>
                                      <Text> </Text>
                                      <Text>
                                          Morphology:
                                          {row.morphologies
                                              ? row.morphologies.map(
                                                    (item, index) => {
                                                        return `${
                                                            data.translation
                                                                .morphoMap[
                                                                item.name
                                                            ].synonym_language
                                                        } `
                                                    }
                                                )
                                              : null}
                                      </Text>
                                  </View>
                                  <View style={styles.row4}>
                                      {listType ===
                                      LIST_TYPES.painted_distribution.name ? (
                                          <Image
                                              style={{
                                                  width: "50%",
                                                  // objectFit: "cover",
                                              }}
                                              source={() =>
                                                  getPartOfRootSVGWithRegion(
                                                      row.layerInfo.D_ID,
                                                      [row.pathId]
                                                  )
                                              }
                                          ></Image>
                                      ) : (
                                          <Image
                                              style={{
                                                  width: "50%",
                                                  // objectFit: "cover",
                                              }}
                                              source={() =>
                                                  getPartOfRootSVGWithPoint(
                                                      row.layerInfo.D_ID,
                                                      [row.id]
                                                  )
                                              }
                                          ></Image>
                                      )}
                                  </View>

                                  <View
                                      style={{
                                          ...styles.row5,
                                          flexWrap: "wrap",
                                          flex: 1,
                                          flexDirection: "row",
                                          alignItems: "flex-start",
                                          justifyContent: "space-between",
                                          gap: "2px",
                                      }}
                                  >
                                      {row.files.map((item) => (
                                          <View
                                              style={{
                                                  flex: "0 0 49%",
                                                  padding: "1px",
                                              }}
                                          >
                                              <Image
                                                  style={{
                                                      width: "55px",
                                                      height: "55px",
                                                  }}
                                                  src={getImage(item.id)}
                                              />
                                          </View>
                                      ))}
                                  </View>
                              </View>
                          )
                      })
                    : null}
            </View>
        </View>
    )
}

export default ReportTable
