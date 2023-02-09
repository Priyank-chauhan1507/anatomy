import { Header, StandardPage, SVGImageWithDrawing } from "./common";
import { View, Image } from "@react-pdf/renderer";
import store from "../store";
import { getRootSVGImage } from "../utils/exportUtils";
const imageStyles = {
  position: "absolute",
  height: "100vh",
  top: 0,
};

export default function MarkedUpMapPDFTemplate() {
  const size =
    store.getState().userSettings.userSettings.clinicCountryOpts.paper_size;

  return (
    <StandardPage orientation="landscape">
      <View
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 40,
        }}
      >
        <SVGImageWithDrawing orientation="landscape" />
      </View>
    </StandardPage>
  );
}
