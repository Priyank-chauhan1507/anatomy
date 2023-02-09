import { useContext } from "react"
import { TranslationContext } from "../contexts/translation"
const useTranslations = () => {
    return useContext(TranslationContext)
}
export default useTranslations
