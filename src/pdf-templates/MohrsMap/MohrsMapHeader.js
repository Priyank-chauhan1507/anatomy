import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import Logo from "../../assets/logo.png";
import store from "../../store";
import calculateAge from "../../utils/calculateAge";
import { getDate } from "../../utils/cf";
import { getRootSVGImage } from "../../utils/exportUtils";
import { getGenderSymbol, numberToRoman } from "../../utils/helpers";
const styles = StyleSheet.create({
  pageWithMargin: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  pageWithoutMargin: {
    margin: 0,
  },
});
// Font.registerEmojiSource({
//   format: "png",
//   url: "https://twemoji.maxcdn.com/2/72x72/",
// });

const RATIO = 3168 / 2448;
export const StandardPage = ({
  children,
  margin,
  orientation = "portrait",
  style,
}) => {
  const selectedC = store.getState().userSettings.userSettings
    .clinicCountryOpts || { paper_size: "Letter" };

  //   const selectedC = useSelector(
  //     (state) => state.userSettings.userSettings.clinicCountryOpts
  //   );
  return (
    <Document>
      <Page
        size={selectedC.paper_size === "Letter" ? "LETTER" : "A4"}
        orientation={orientation}
        style={
          margin
            ? [styles.pageWithMargin, style]
            : [styles.pageWithoutMargin, style]
        }
      >
        {children}
      </Page>
    </Document>
  );
};

export const MohrsMapHeader = () => {
  //   const { uiData } = useTranslations();
  const storeState = store.getState();
  const encounterDateTime = storeState.userSettings.encounterInfo.dateTime;

  const patientData = storeState.userSettings.patientInfo;
  const patientImg = storeState.userSettings.patientImg;
  const uiData = storeState.translation.uiData;
  const clinicLogo = storeState.userSettings.userSettings.clinicLogo;

  //   const encounterDateTime = new Date();
  return (
    <View
      fixed
      style={{
        display: "block",
        paddingVertical: "10px",
        paddingHorizontal: "10px",
        borderBottom: "2px",
        borderColor: "blue",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: '16px'
        }}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                width: "40px",
                marginRight: "7px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Image
                src={Logo}
                style={{
                  objectFit: "cover",
                  width: "100%",
                }}
                alt=""
                id="logo"
              />
            </View>
            <View>
              <Text
                style={{
                  color: "blue",
                  fontSize: "20px",
                  fontWeight: 800,
                }}
              >
                Anatomy Mapper
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: "8px", marginTop: "10px" }}>
              https://AnatomyMapper.com
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: "14px", fontWeight: "ultrabold", marginTop: '5px' }}>
            AUC Score: _______
          </Text>
          <Text style={{ fontSize: "8px", marginTop: "10px", width: '130px', textAlign: 'center' }}>
            The surgeon who initials this document operated in two distinct and integrated capacities as the surgeon and pathologist.
          </Text>
        </View>
        <View style={{
          width: '160px',
          maxHeight: '80px'
        }}>
          {clinicLogo && (
            <Image
              src={clinicLogo}
              style={{
                objectFit: "contain",
                width: "100%",
              }}
              alt=""
              id="clinicLogo"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export const SVGImageWithDrawing = ({
  styles = {},
  orientation = "landscape",
}) => {
  const dims =
    orientation === "portrait" ? { width: "100%" } : { height: "100%" };
  const padding =
    orientation === "portrait"
      ? { paddingTop: 100 * (1 / RATIO) + "%" }
      : { width: "100%" };
  return (
    <View
      style={{
        position: "relative",
        ...dims,
        ...padding,
        ...styles,
      }}
    >
      <Image
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          ...dims,
        }}
        source={() => {
          const image = window.window.sketchRef.toDataURL();
          return image;
        }}
      />
      <Image
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          ...dims,
        }}
        source={() => getRootSVGImage()}
      />
    </View>
  );
};
