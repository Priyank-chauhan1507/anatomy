import { PIN_SHAPES } from "../constants/itemConstants"
import { getEGZInfo, getRootSVG } from "./cf"

export const getHierarchy = (pathId, coords, lateralityData, egztData) => {
    let hierarchy = []
    // old way
    const parentEl = document.getElementById("HierarchicalLayers")
    if (parentEl) {
        // const children = parentEl.children;
        const elms = []

        let elm
        while (true) {
            elm = document.elementFromPoint(coords.x, coords.y)
            if (elm) {
                if (!parentEl.contains(elm)) {
                    break
                }

                const id = elm.getAttribute("id")
                if (id !== pathId && isAnAnatomicSite(id)) {
                    const { names, egz } = getEGZInfo(
                        id,
                        coords,
                        lateralityData,
                        egztData
                    )
                    const layerInfo = fetchHmap(id)
                    hierarchy.push({ pathId: id, egz, names, layerInfo })
                }
                elms.push(elm)
                //Hide the element from the next round of `elementFromPoint()`:
                elm.style.pointerEvents = "none"
            }
        }

        // output.textContent = elms.map(printElement).join(' ');

        //Cleanup:
        elms.forEach((elm) => (elm.style.pointerEvents = ""))
    }
    return hierarchy
}

export const isAnAnatomicSite = (pathId = "") => {
    if (pathId) {
        if (
            pathId.startsWith("1") ||
            pathId.startsWith("2") ||
            pathId.startsWith("3") ||
            pathId.startsWith("4") ||
            pathId.startsWith("5") ||
            pathId.startsWith("6") ||
            pathId.startsWith("7") ||
            pathId.startsWith("8") ||
            pathId.startsWith("9") ||
            pathId.startsWith("0")
        ) {
            return true
        }
        return false
    }
    return false
}

/**
 *
 * @param  {number} num integer 0,1,2,3, ... 27,28,29,30 ...
 * @returns equivalent character A,B,C,D, ... AA,AB,AC,AD, ...
 */

export function numToSSColumn(num) {
    var s = "",
        t
    if (num === 0) return "A"
    while (num > 0) {
        t = num % 26
        s = String.fromCharCode(65 + t) + s
        num = ((num - t) / 26) | 0
    }
    return s || undefined
}

/**
 * convert base 10 numbers to roman numbers
 * @param {number} num interger 0,1,2,3, ... 27,28,29,30 ...
 * @returns {string} roman number
 */

export function numberToRoman(num) {
    var lookup = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1,
        },
        roman = "",
        i
    for (i in lookup) {
        while (num >= lookup[i]) {
            roman += i
            num -= lookup[i]
        }
    }
    return roman
}

export const getSVGCoords = (coords) => {
    const svg = getRootSVG()

    const pt = svg.createSVGPoint()
    pt.x = coords.x
    pt.y = coords.y
    const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse())
    return { x: svgPt.x, y: svgPt.y }
}

export const transformSVGCoords = (svgCoords) => {
    svgCoords = getSVGCoords(svgCoords)

    return {
        x: window.window.sketchRef.getPointOnSVG(svgCoords.x),
        y: window.window.sketchRef.getPointOnSVG(svgCoords.y),
    }
}

export const loadFromLocalStorage = (key, fallback, merge = false) => {
    const data = localStorage.getItem(key)
    if (data) {
        return merge ? { ...fallback, ...JSON.parse(data) } : JSON.parse(data)
    }
    return fallback
}
export const fetchHmap = (pathId, coords = null) => {
    let parent = document.getElementById(pathId)?.parentElement
    let hlLayer = document.getElementById("HierarchicalLayers")
    const data = {
        HMAP_ID: null,
        D_ID: null,
        G_IDs: [],
        HG_IDs: [],
        PATH_IDS: [],
    }
    if (parent) {
        while (true) {
            if (parent === hlLayer) {
                break
            }
            const id = parent.getAttribute("id")
            if (id.startsWith("HMAP")) {
                data.HMAP_ID = id
                data.D_ID = id.replace("HMAP", "D")
            } else if (id.startsWith("HG")) {
                data.HG_IDs.push(id)
                data.G_IDs.push(id.replace("HG", "G"))
            }

            parent = parent.parentElement
        }
    }
    if (coords) data.PATH_IDS = fetchIds(coords)
    return data
}

export const fetchIds = (coords) => {
    let pathIds = []
    const parentEl = document.getElementById("HierarchicalLayers")
    if (parentEl) {
        const elms = []
        let elm
        while (true) {
            elm = document.elementFromPoint(coords.x, coords.y)
            if (elm) {
                if (!parentEl.contains(elm)) {
                    break
                }
                const id = elm.getAttribute("id")
                if (!isAnAnatomicSite(id)) break
                pathIds.push(id.replace(/:/g, "-C-o-L-"))
                elms.push(elm)
                elm.style.pointerEvents = "none"
            }
        }
        elms.forEach((elm) => (elm.style.pointerEvents = ""))
    }
    return pathIds
}

const SCALE = 4

const createPinByShape = ({
    NS,
    listType,
    g,
    pinShape,
    text,
    fillColor,
    short_label,
}) => {
    let pin = document.createElementNS(NS, "svg")
    pin.classList.add("Pin-Marker-Wrapper")
    pin.setAttribute("cx", 0)
    pin.setAttribute("cy", 0)
    pin.setAttribute("r", 2.5 * SCALE)
    pin.setAttribute("fill", "red")
    pin.style.backgroundColor = "red"
    pin.classList.add("squarePin")
    pin.setAttribute("x", PIN_SHAPES[pinShape].label.x)
    pin.setAttribute("y", PIN_SHAPES[pinShape].label.y)
    pin.innerHTML = PIN_SHAPES[pinShape].shape(fillColor, text)
    g.appendChild(pin)
    if (pinShape === PIN_SHAPES.inside_circle.name) {
        let { width: pinWidth, height: pinHeight } = pin.getBBox()
        pinWidth = Number(pinWidth)
        pinHeight = Number(pinHeight)
        const label = document.createElementNS(NS, "text")
        label.classList.add("Pin-Label")

        let { width: pinLableWidth, height: pinLabelHeight } = label.getBBox()
        if (pinLableWidth > pinWidth - 1 || pinLabelHeight > pinHeight - 1) {
            label.style.fontSize = "1.5rem"
        }

        label.style.fontWeight = "700"
        label.style.paintOrder = "stroke"
        label.innerHTML = short_label

        // label.style.fill = "white";

        label.style.fill = "white"
        label.setAttribute("x", 1.25)
        label.setAttribute("y", 1.75)
        label.setAttribute("dominant-baseline", "middle")
        label.setAttribute("text-anchor", "middle")
        g.appendChild(label)
    }

    return pin
}

const addLabel = ({ NS, g, text, fillColor, left_to_right, pinShape }) => {
    const label = document.createElementNS(NS, "text")
    label.removeAttribute("dominant-baseline")
    label.removeAttribute("text-anchor")

    label.setAttribute("y", 4 * SCALE)
    label.classList.add("Pin-Label")
    label.style.fill = fillColor + ""
    label.style.fontWeight = "700"
    label.style.paintOrder = "stroke"
    label.style.fontSize = 0.55 * SCALE + "rem"
    if (left_to_right) label.setAttribute("x", 6 * SCALE)
    else label.setAttribute("x", 6 * SCALE)
    // else {
    //     label.style.direction = "rtl"
    //     label.setAttribute("x", -6 * SCALE + 6)
    // }

    pinShape !== "inside_circle"
        ? (label.innerHTML = text)
        : (label.innerHTML = "")
    label.style.fontSize = 0.6 * SCALE + "rem"

    return label
}
const addDesc = ({
    NS,
    g,
    text,
    label_dimensions,
    fillColor,
    left_to_right,
    dash,
}) => {
    const label = document.createElementNS(NS, "text")
    label.removeAttribute("dominant-baseline")
    label.removeAttribute("text-anchor")
    label.innerHTML = text
    const dimen = label.getBoundingClientRect()

    label.setAttribute("y", 4 * SCALE)
    label.classList.add("Pin-Label")
    label.style.fill = fillColor + ""
    label.style.fontWeight = "700"
    label.style.paintOrder = "stroke"
    label.style.fontSize = 0.55 * SCALE + "rem"

    if (left_to_right)
        label.setAttribute(
            "x",
            !label_dimensions.width
                ? (label_dimensions.width + 6) * SCALE
                : 14 * SCALE
        )
    else {
        label.style.direction = "rtl"

        dash
            ? label.setAttribute("x", -2 * SCALE)
            : label.setAttribute("x", -6 * SCALE)
    }
    // else {
    //     label.style.direction = "rtl"
    //     label.setAttribute("x", -14 * SCALE)
    // }

    label.style.fontSize = 0.6 * SCALE + "rem"
    return label
}

export const addMarker = ({
    coords = { x: 0, y: 0 },
    id,
    fillColor,
    label: l,
    listType,
    pinShape,
    left_to_right,
    description: desc,
    visibility,
    isArea = false,
    regionFill = null,
    pathId = null,
    opacity = null,
    isSeaAllowed = false,
    mapContext,
}) => {
    const rootSVG = getRootSVG()
    const NS = rootSVG.getAttribute("xmlns")
    const pt = rootSVG.createSVGPoint()
    pt.x = coords.x
    pt.y = coords.y
    //
    const svgP = coords
    const svg = document.createElementNS(NS, "svg")
    const g = document.createElementNS(NS, "g")
    desc =
        pinShape === PIN_SHAPES.inside_circle.name
            ? desc
            : l
            ? "-" + desc
            : desc
    //const newLabel = pinShape === PIN_SHAPES.inside_circle.name ? desc : l + desc;
    const label = addLabel({
        NS,
        g,
        text: l,
        desc,
        fillColor,
        left_to_right: left_to_right,
        pinShape,
    })
    g.appendChild(label)
    const pin = createPinByShape({
        NS,
        listType,
        g,
        pinShape,
        fillColor,
        short_label: l,
    })
    g.appendChild(label)
    svg.setAttribute("x", svgP.x)
    svg.setAttribute("y", svgP.y)
    if (isArea) {
        svg.dataset.markerId = id
    }
    svg.setAttribute("id", id)
    svg.setAttribute("class", "map-items")

    if (
        !isArea &&
        (mapContext === "region_select" || mapContext === "region_drag")
    ) {
        svg.style.display = "none"
    }

    if (!isArea) {
        svg.classList.add("map-items-marker")
    } else {
        svg.classList.add("map-items-region")
        svg.setAttribute("data-fill", regionFill)
        svg.setAttribute("data-path", pathId)
        svg.setAttribute("data-opacity", opacity)
    }
    svg.setAttribute("data-is-sea-allowed", isSeaAllowed ? "true" : "false")

    svg.style.overflow = "visible"

    // svg.classList.add("list-type_" + listType);
    // svg.classList.add("Pin-Point-Marker")
    svg.appendChild(g)
    rootSVG.appendChild(svg)

    const label_dimensions = label.getBoundingClientRect()
    if (visibility) {
        const description = addDesc({
            NS,
            g,
            text: desc,
            label_dimensions,
            desc,
            fillColor,
            left_to_right: left_to_right,
            dash: desc[0] === "-",
        })
        g.appendChild(description)
    }
    return svg
}

export const updateMarker = ({
    svg,
    text,
    pinShape,
    fillColor,
    left_to_right,
}) => {
    const rootSVG = getRootSVG()
    const NS = rootSVG.getAttribute("xmlns")
    const g = svg.querySelector("g")
    const pin = g.querySelector(".Pin-Marker-Wrapper")
    pin?.remove()
    const label = g.querySelector(".Pin-Label")
    label.removeAttribute("dominant-baseline")
    label.removeAttribute("text-anchor")
    label.innerHTML = text
    label.style.fill = fillColor + ""
    label.style.fontSize = "2.4rem"
    createPinByShape({ NS, fillColor, pinShape, g, text, label })

    if (left_to_right) label.setAttribute("x", 6 * SCALE)
    else label.setAttribute("x", -12 * SCALE)
}

export const stopPropagation = (e, cb) => {
    e.stopPropagation()
    cb(e)
}

export const chooseList = (state, listType, listSubtype) => {
    return state[listType].isGroupMode
        ? state[listType][listSubtype]
        : state[listType]
}

export const getGenderSymbol = (gender) => {
    if (gender === "male") {
        return "♂"
    } else if (gender === "female") {
        return "♀"
    } else if (gender === "other") {
        return "⚥"
    }
    return ""
}

export const removePin = () => {
    if (document.querySelector("#clicked_marker")) {
        document.querySelector("#clicked_marker").remove()
    }
}

export const onSelectPin = (droppedPinId, isArea = false) => {
    if (document.querySelector("#clicked_marker")) {
        document.querySelector("#clicked_marker").remove()
    }

    const SCALE = 4

    const targetElement = isArea
        ? document.querySelector('[data-marker-id="' + droppedPinId + '"]')
        : document.getElementById(droppedPinId).querySelector(".Pin-Marker")
    if (targetElement) {
        const rootSVG = document.querySelector("#loaded-svg-cont").firstChild
        const NS = rootSVG.getAttribute("xmlns")
        const pt = rootSVG.createSVGPoint()
        const mapZoom = window.window.sketchRef._zoom
        const { x, y, width, height } = targetElement.getBoundingClientRect()
        pt.x = x
        pt.y = y
        const svgP = pt.matrixTransform(rootSVG.getScreenCTM().inverse())
        const svg = document.createElementNS(NS, "svg")
        const circle = document.createElementNS(NS, "circle")
        const radiusOfMarker = 20
        circle.setAttribute(
            "cx",
            isArea ? (width / 2) * (SCALE / mapZoom) : radiusOfMarker
        )
        circle.setAttribute(
            "cy",
            isArea ? (height / 2) * (SCALE / mapZoom) : radiusOfMarker
        )
        const radius = !isArea
            ? 15 * SCALE
            : (Math.max(width, height) / 2 / mapZoom) * SCALE

        circle.setAttribute("r", radius)
        circle.setAttribute("fill", "transparent")
        circle.setAttribute("stroke", "orange")
        circle.setAttribute("stroke-width", "5")
        // circle.classList.add("flash-animation")

        svg.setAttribute("x", window.window.sketchRef.getPointOnSVG(svgP.x))
        svg.setAttribute("y", window.window.sketchRef.getPointOnSVG(svgP.y))

        svg.setAttribute("id", "clicked_marker")
        svg.style.overflow = "visible"
        svg.appendChild(circle)
        rootSVG.appendChild(svg)
    }
}

export const onLocatePin = (
    droppedPinId,
    isArea = false,
    keepSelected = false
) => {
    if (document.querySelector("#clicked_marker")) {
        document.querySelector("#clicked_marker").remove()
    }

    const SCALE = 4
    const SCALE_RECT = 6

    const targetElement = isArea
        ? document.querySelector('[data-marker-id="' + droppedPinId + '"]')
        : document.getElementById(droppedPinId).querySelector(".Pin-Marker")

    const rootSVG = document.querySelector("#loaded-svg-cont").firstElementChild
    const NS = rootSVG.getAttribute("xmlns")
    const pt = rootSVG.createSVGPoint()
    const mapZoom = window.window.sketchRef._zoom
    const { x, y, width, height } = targetElement.getBoundingClientRect()
    pt.x = x
    pt.y = y

    const svgP = pt.matrixTransform(rootSVG.getScreenCTM().inverse())
    const svg = document.createElementNS(NS, "svg")
    const circle = document.createElementNS(NS, "circle")
    const rectangle = document.createElementNS(NS, "rect")

    const radiusOfMarker = 20
    circle.setAttribute(
        "cx",
        isArea ? (width / 2) * (SCALE / mapZoom) : radiusOfMarker
    )
    circle.setAttribute(
        "cy",
        isArea ? (height / 2) * (SCALE / mapZoom) : radiusOfMarker
    )
    const radius = !isArea
        ? 15 * SCALE
        : (Math.max(width, height) / 2 / mapZoom) * SCALE

    circle.setAttribute("r", radius)
    circle.setAttribute("fill", "transparent")
    circle.setAttribute("stroke", "orange")
    circle.setAttribute("stroke-width", "5")
    // { !keepSelected && circle.classList.add("flash-animation") }
    circle.classList.add("flash-animation")

    rectangle.setAttributeNS(null, "x", -(width / 4) * (SCALE / mapZoom))
    rectangle.setAttributeNS(null, "y", -(height / 4) * (SCALE / mapZoom))
    rectangle.setAttributeNS(null, "width", (width / mapZoom) * SCALE_RECT)
    rectangle.setAttributeNS(null, "height", (height / mapZoom) * SCALE_RECT)

    rectangle.setAttribute("fill", "transparent")
    rectangle.setAttribute("stroke", "orange")
    rectangle.setAttribute("stroke-width", "5")
    // { !keepSelected && rectangle.classList.add("flash-animation") }
    rectangle.classList.add("flash-animation")

    svg.setAttribute("x", window.window.sketchRef.getPointOnSVG(svgP.x))
    svg.setAttribute("y", window.window.sketchRef.getPointOnSVG(svgP.y))

    svg.setAttribute("id", "clicked_marker")
    svg.style.overflow = "visible"
    if (isArea) {
        svg.appendChild(rectangle)
    } else {
        svg.appendChild(circle)
    }
    rootSVG.appendChild(svg)

    window.window.sketchRef.panAndZoomToARegion(svg, () => {
        setTimeout(() => {
            circle && circle.classList.remove("flash-animation")

            rectangle && rectangle.classList.remove("flash-animation")

            // { !keepSelected && circle.remove() }
        }, 800)
    })
}

export const getFlagURL = (code = "") => {
    return `${
        process.env.REACT_APP_BACKEND_URL
    }/static/media/svgFlags/${code.toLowerCase()}.svg`
}

export const getPatternId = (pattern, subtype) => {
    if (pattern === "dash") {
        return `pattern-circles-${subtype}`
    } else if (pattern === "dash_dash") {
        return `pattern-checkers-${subtype}`
    } else if (pattern === "dot") {
        return `pattern-chevron-${subtype}`
    } else {
        return null
    }
}

export const renderFlag = (countryCode = "") => {
    return (
        <img
            src={getFlagURL(countryCode)}
            width="25"
            alt={"Country Flag: " + countryCode}
        />
    )
}

export const parseMarkerToGetID = (ele) => {
    if (ele) {
        if (ele.tagName === "path")
            return ele.parentElement.parentElement.parentElement.parentElement.getAttribute(
                "id"
            )
        else if (ele.parentElement.classList.contains("Pin-Marker")) {
            return ele.parentElement.parentElement.parentElement.parentElement.getAttribute(
                "id"
            )
        } else if (ele.classList.contains("Pin-Label")) {
            return ele.parentElement.parentElement.getAttribute("id")
        } else if (ele.tagName === "g") {
            if (ele.parentElement.classList.contains("map-items")) {
                return ele.parentElement.getAttribute("id")
            } else {
                return null
            }
        } else if (ele.classList.contains("map-items")) {
            return ele.getAttribute("id")
        } else {
            return null
        }
    } else {
        return null
    }
}

export const parseRegionMarkerToDistributionInfo = (ele) => {
    const id = parseMarkerToGetID(ele)

    if (id) {
        const distributionElMarker = document.getElementById(id)

        if (distributionElMarker) {
            return {
                id: id,
                fill: distributionElMarker.getAttribute("data-fill"),
                pathId: distributionElMarker.getAttribute("data-path"),
                opacity: distributionElMarker.getAttribute("data-opacity"),
                isSeaAllowed:
                    distributionElMarker.getAttribute("data-is-sea-allowed") ===
                    "true"
                        ? true
                        : false,
            }
        } else {
            return null
        }
    }
    return null
}

export const checkIsSeaAllowed = (id) => {
    const marker = document.getElementById(id)
    if (marker) {
        return marker.getAttribute("data-is-sea-allowed") === "true"
            ? true
            : false
    } else {
        return false
    }
}

export const getAllMarkers = () => {
    return document.querySelectorAll(".map-items-marker")
}
