import { devicePixelRatio } from "../../constants/global"
import { getRootSVG } from "../cf"
import { applyAllStyle, convertSVGElementToXML } from "./helpers"
import { convertSVGToPNG } from "./svg-to-png"
export const refineRootSVGForExport = (svg, opacity = 1) => {
    var clonedElement = svg?.cloneNode(true)
    clonedElement.style.transform = `scale(1)`
    clonedElement
        .querySelectorAll(
            "#HierarchicalLayers path, #HierarchicalLayers polygon, #HierarchicalLayers circle, #HierarchicalLayers rect, #HierarchicalLayers ellipse"
        )
        .forEach((item) => {
            if (item) {
                if (!item.style.fill) item.style.opacity = 0
            }
        })
    ;[
        // "HierarchicalLayers",
        "Directions",
        "CopyrightAnatomyMapper",
    ].forEach((id) => {
        clonedElement.getElementById(id)?.remove()
    })

    const regionList = clonedElement.querySelectorAll(".distribution-regions")
    const markers = clonedElement.querySelectorAll(".map-items-region")
    const opacityMap = {}
    markers.forEach((m) => {
        const id = m.getAttribute("id")
        opacityMap[id] = m.getAttribute("data-opacity") || 1
        return m.remove()
    })
    const def = clonedElement.querySelector("defs")

    const imageMap = {}
    for (let i = 0; i < regionList.length; i++) {
        const fill = regionList[i].getAttribute("fill")
        regionList[i].style.opacity =
            opacityMap[regionList[i].getAttribute("data-marker-id")] || 0
        if (fill && fill.startsWith("url")) {
            const tilePatternID = fill.replace("url(#", "").replace(")", "")

            if (imageMap[tilePatternID]) {
            } else {
                const tilePattern = document
                    .getElementById(tilePatternID)
                    ?.cloneNode(true)

                if (tilePattern) {
                    try {
                        def.appendChild(tilePattern)
                    } catch (error) {}
                }
            }
        }
    }
    clonedElement.querySelector(".mapelm").style.opacity = opacity
    clonedElement.style.background = "transparent"
    return clonedElement
}

export const getRootSVGImage = async (opacity = 1) => {
    try {
        const element = getRootSVG()
        const newWidth = 3168
        const newHeight = 2448
        const clonedElement = refineRootSVGForExport(element, opacity)
        clonedElement.setAttribute("width", newWidth + "px")
        clonedElement.setAttribute("height", newHeight + "px")
        // document.body.append(clonedElement)
        const svg = convertSVGElementToXML(clonedElement)
        // const img = document.createElement("img")
        // img.src = svg
        // document.body.append(img)
        const du = await convertSVGToPNG(svg, newWidth, newHeight)
        console.log("DU", du)
        return du
    } catch (e) {
        throw e
    }
}

export const createPartOfSVGElement = (id, opacity = 1, background = null) => {
    const el = document.getElementById(id)

    if (el) {
        console.log(el, id)
        const { x, y, width, height } = el.getBBox()
        let width1 = width
        if (
            id.includes("mohs") &&
            !(id.includes("BLR") || id.includes("BRL"))
        ) {
            width1 = 140
        }

        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        )

        //const g=document.getElementById(id)
        //const { x1, y1, width1, height1} = g.getBBox();
        //const cloneg=g.cloneNode(true)

        const cloneNode = el.cloneNode(true)

        if (!id.includes("mohs")) applyAllStyle(cloneNode, el)
        if (id.includes("mohs")) {
            cloneNode.style.opacity = 1
        }
        svg.setAttribute("width", width1 + "px")
        svg.setAttribute("height", height + "px")
        svg.setAttribute("opacity", opacity)
        svg.setAttribute("background", background === null ? "" : background)
        svg.setAttribute("viewBox", `${x} ${y} ${width1} ${height}`)

        svg.style.overflow = "visible"
        //svg.appendChild(cloneg)
        svg.appendChild(cloneNode)

        //document.body.append(svg)

        return { source: svg, width: width1, height }
    } else {
        return null
    }
}
export const getPatterns = async (node, subtype) => {
    try {
        const newWidth = 100
        const newHeight = 100

        node.setAttribute("width", newWidth + "px")
        node.setAttribute("height", newHeight + "px")
        node.setAttribute("viewBox", `${0} ${0} ${newWidth} ${newHeight}`)
        const svg = convertSVGElementToXML(node)

        const du = await convertSVGToPNG(svg, newWidth, newHeight)
        let ans = {}
        ans[subtype] = du
        return ans
    } catch (e) {
        throw e
    }
}

export const getPartOfRootSVG = async (id, background = null) => {
    try {
        const svg = createPartOfSVGElement(id)
        if (svg) {
            const svgString = convertSVGElementToXML(svg.source)
            const width = svg.source.width.baseVal.value
            const height = svg.source.height.baseVal.value
            const du = await convertSVGToPNG(svgString, width * 4, height * 4)
            svg.source.remove()

            return du
        } else {
            throw new Error("No SVG found")
        }
    } catch (e) {
        throw e
    }
}

export const getPartOfRootSVGWithRegion = async (id, deps) => {
    const svg = createPartOfSVGElement(id, 1, "white")
    if (svg) {
        for (const d of deps) {
            const g = document.getElementById(d)
            const cloneg = g?.cloneNode(true)
            const fill = g?.getAttribute("fill")
            if (fill?.startsWith("url")) {
                const tilePatternID = fill.replace("url(#", "").replace(")", "")
                const tilePattern = document
                    .getElementById(tilePatternID)
                    ?.cloneNode(true)
                if (tilePattern) {
                    svg.source.appendChild(tilePattern)
                }
            }

            //   applyAllStyle(cloneg, g);
            svg.source.appendChild(cloneg)
        }
        const svgString = convertSVGElementToXML(svg.source)
        svg.source.remove()
        const du = await convertSVGToPNG(svgString, svg.width, svg.height)
        return du
    }
}

export const getPartOfRootSVGWithPoint = async (id, deps) => {
    try {
        const svg = createPartOfSVGElement(id)
        if (svg) {
            for (const d of deps) {
                const depEl = document.getElementById(d)
                if (depEl) {
                    const depElClone = depEl?.cloneNode(true)
                    const delEl = depElClone.querySelectorAll(".Pin-Label")
                    if (delEl.length >= 2) delEl[delEl.length - 1].remove()

                    svg.source.appendChild(depElClone?.cloneNode(true))
                } else {
                    throw new Error("Dependencies not found")
                }
            }
            const svgString = convertSVGElementToXML(svg.source)
            svg.source.remove()
            const du = await convertSVGToPNG(svgString, svg.width, svg.height)
            return du
        } else {
            throw new Error("No SVG found")
        }
    } catch (e) {
        throw e
    }
}
