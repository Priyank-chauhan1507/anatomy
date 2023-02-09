import React from "react";
import { ORDERS, PIN_SHAPES } from "../../constants/itemConstants";
import { getPinShape } from "../../utils/pinUtils";

export default function PinWithLabel({ order, color, index, shape }) {
  return shape === PIN_SHAPES.inside_circle.name ? (
    <span
      style={{
        background: color,
        borderRadius: "50%",
        width: "18px",
        height: "18px",
        padding: "0 5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
      }}>
      <span
        style={{
          color: "white",
          padding: "0px",
          fontSize: "14px",
          fontWeight: "bold",
          overflow: "unset",
          marginBottom: order === "abc" ? "4px" : "0px",
        }}>
        {order ? ORDERS[order].resolve(index) : ""}
      </span>
    </span>
  ) : (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: ".03rem",
        marginRight: 8,
      }}>
      <span>{getPinShape(shape, color, "8px")}</span>
      <span style={{ color, fontSize: "1.4rem" }}>
        {order ? ORDERS[order].resolve(index) : null}
      </span>
    </span>
  );
}
