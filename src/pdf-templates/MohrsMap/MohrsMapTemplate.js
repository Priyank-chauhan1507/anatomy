import { Header, StandardPage } from "../common";
import { View, Image } from "@react-pdf/renderer";
import { getPartOfRootSVG } from "../../utils/exportUtils";
import { MohrsMapHeader } from "./MohrsMapHeader";
import { MohsrMapForm } from "./MohrsMapForm";

export default function MohrsMapPDFTemplate({ id }) {
  //  if(document.getElementById(id).children[0].children[0].children[1])
  //  {
  //   id=document.getElementById(id).children[0].children[0].children[1]
  //  }
  //id=id.replace("Dseg", "HMAPseg");

  const el = document.getElementById(id)?.getBBox() || {
    width: "auto",
    height: "auto",
  };

  const width = 200;
  const height = (width * el.height) / el.width;
  const LateralLabel = id.includes("DLAT");
  return (
    <StandardPage margin>
      <MohrsMapHeader />
      <MohsrMapForm />
      <View
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {LateralLabel && (
          <Image
            source={() => {
              return getPartOfRootSVG(`${id}-mohs`);
            }}
            style={{
              width: "100%",
              height: "35px",
              opacity: 0.5,
              zIndex: "1",
              position: "absolute",
              top: "5px",
              //:"50%",
              //transform: `translateX(${"-90%"})`
            }}
          />
        )}

        <Image
          source={() => {
            return getPartOfRootSVG(id);
          }}
          style={{
            width: width,
            height: height,
            opacity: 0.5,
            zIndex: "1",
            position: "relative",
          }}
        />
      </View>
    </StandardPage>
  );
}
