import {
    downloadPDFUsingTemplate,
    getFileNameForPDFExport,
    getPDFUsingTemplate,
} from "./helpers"
import MohrsMapPDFTemplate from "../../pdf-templates/MohrsMap/MohrsMapTemplate"
import MarkedMapPDFTemplate from "../../pdf-templates/MarkedMapPDFTemplate"
import MainMainPDFTemplate from "../../pdf-templates/MainMap"
import { getRootSVGImage } from "./root-svg"

export const getMarkedUpPDF = async () => {
    try {
        const url = URL.createObjectURL(
            await getPDFUsingTemplate(MarkedMapPDFTemplate, {})
        )

        // const svg = await getRootSVGImage();
        // return ";
        return url
    } catch (e) {
        throw e
    }
}

export const downloadMohrsMap = (id) => {
    return downloadPDFUsingTemplate(
        MohrsMapPDFTemplate,
        { id },
        getFileNameForPDFExport()
    )
}

export const downloadMainMap = (diagnosisMap, patternMap) => {
    return downloadPDFUsingTemplate(
        MainMainPDFTemplate,
        { diagnosisMap, patternMap },
        getFileNameForPDFExport()
    )
}
