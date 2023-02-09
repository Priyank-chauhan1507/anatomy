import React from "react"
import { PIN_SHAPES } from "../constants/itemConstants"
import { DarkOrLight } from "./colourNameToHex"

export const getPinShape = (
    selectedPinShape,
    orderedListColor,
    size = "12px"
) => {
    switch (selectedPinShape) {
        case PIN_SHAPES.circle.name:
            return <CirclePin fillColor={orderedListColor} size={size} />
        case PIN_SHAPES.asterik.name:
            return <AsteriskPin fillColor={orderedListColor} size={size} />
        case PIN_SHAPES.triangle.name:
            return <CaretPin fillColor={orderedListColor} size={size} />
        case PIN_SHAPES.pin.name:
            return <MapPin fillColor={orderedListColor} size={size} />
        case PIN_SHAPES.inside_circle.name:
            return <EncapsulatedCirclePin fillColor={orderedListColor} />
        default:
            return <CirclePin fillColor={orderedListColor} size={size} />
    }
}

export const CirclePin = ({ fillColor = "red", size = "12px" }) => {
    return (
        <div
            style={{
                height: size,
                width: size,
                borderRadius: "50%",
                background: fillColor,
                borderColor: "white",
                borderWidth: "0.1px",
                borderStyle: "solid",
            }}
        ></div>
    )
}

export const EncapsulatedCirclePin = ({ fillColor = "red", size = "18px" }) => {
    let col = fillColor
        ? DarkOrLight(fillColor) === "#000000"
            ? "#000000"
            : "#ffffff"
        : "#ffffff"

    return (
        <div
            style={{
                height: size,
                width: size,
                borderRadius: "50%",
                background: fillColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: col,
                fontSize: ".5rem",
                fontWeight: "700",
                borderColor: "white",
                borderWidth: "0.1px",
                borderStyle: "solid",
            }}
        >
            Aa#
        </div>
    )
}

export const AsteriskPin = ({ fillColor = "rgb(0,0,255)", size = "12px" }) => {
    return (
        <div
            style={{
                width: size,
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: fillColor,
            }}
        >
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="asterisk"
                class="svg-inline--fa fa-asterisk fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="50"
                viewBox="0 0 512 512"
            >
                <path
                    fill={fillColor}
                    stroke="white"
                    stroke-width="25"
                    d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z"
                ></path>
            </svg>
        </div>
    )
}

export const CaretPin = ({ fillColor = "rgb(0,0,255)", size = "12px" }) => {
    return (
        <div
            style={{
                border: "0",
                height: "100%",
                width: size,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: fillColor,
            }}
        >
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-up"
                class="svg-inline--fa fa-caret-up fa-w-10"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                viewBox="0 0 320 512"
            >
                <path
                    fill={fillColor}
                    stroke="white"
                    stroke-width="25"
                    d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"
                ></path>
            </svg>
        </div>
    )
}

export const MapPin = ({ fillColor = "rgb(0,0,255)", size = "12px" }) => {
    return (
        <div
            style={{
                width: size,
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: fillColor,
            }}
        >
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="map-marker-alt"
                class="svg-inline--fa fa-map-marker-alt fa-w-12"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                viewBox="0 0 384 512"
            >
                <path
                    fill={fillColor}
                    stroke="white"
                    stroke-width="25"
                    d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                ></path>
            </svg>
        </div>
    )
}

export function getPinDescriptionText(pinDesc) {
    const desc = pinDesc?.filter((item) => item !== "")
    return desc?.join("-")
}

export function removePins(node, list) {
    list.forEach((item) => {
        const ele = node.getElementById(item.droppedPin__id)
        if (ele) ele.remove()
    })
}
