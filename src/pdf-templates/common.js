import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import Logo from "../assets/logo.png";
import store from "../store";
import calculateAge from "../utils/calculateAge";
import { getDate } from "../utils/cf";
import { getRootSVGImage } from "../utils/exportUtils";
import { getGenderSymbol, numberToRoman } from "../utils/helpers";
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

export const Header = () => {
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
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: "20px",
        paddingHorizontal: "20px",
        borderBottom: "2px",
        borderColor: "blue",
      }}
    >
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
              marginBottom: "5px",
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
                fontSize: "25px",
                fontWeight: "extrabold",
              }}
            >
              anatomy mapper
            </Text>
          </View>
        </View>
        <View>
          {clinicLogo && (
            <Image
              src={clinicLogo}
              style={{
                objectFit: "cover",
                width: "100px",
                marginTop: "10px",
              }}
              alt=""
              id="clinicLogo"
            />
          )}
          {/*  */}
        </View>
        <View>
          <Text style={{ fontSize: "10px", marginTop: "10px" }}>
            https://AnatomyMapper.com
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
          flexDirection: "row",
          padding: "3px",
        }}
      >
        <Image
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "50%",
          }}
          src={
            patientImg
              ? patientImg
              : "https://secure.gravatar.com/avatar/67673a3eb87ceac87e28ebdde8d99201?s=150&d=mm&r=g"
          }
        />
        <View
          style={{
            paddingLeft: "5px",
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
            padding: "3px",
          }}
        >
          <Text style={{ fontSize: "10px", paddingBottom: "4px" }}>
            <Text style={{ fontSize: "12px", fontWeight: "600" }}>
              Patient Info:{" "}
            </Text>{" "}
            {patientData.firstName && <Text>{patientData.firstName}</Text>}{" "}
            {patientData.lastName && <Text>{patientData.lastName}</Text>}
            {patientData.preferredName?.length > 0 && (
              <>
                <Text> ({patientData.preferredName})</Text>
              </>
            )}
            {patientData.DOB && (
              <>
                {calculateAge(patientData.DOB, encounterDateTime) !== "" && (
                  <Text>
                    ({calculateAge(patientData.DOB, encounterDateTime)})
                  </Text>
                )}
              </>
            )}
            {patientData.gender && (
              <>
                {patientData.gender === "male" ? (
                  <Text style={{}}>(♂️)</Text>
                ) : (
                  <Text style={{}}>(♀️)</Text>
                )}
              </>
            )}
          </Text>
          {patientData.DOB && (
            <>
              <Text
                style={{
                  fontSize: "8px",
                  display: "inline-block",
                  paddingBottom: "4px",
                }}
              >
                {uiData && getDate(patientData.DOB) !== ""
                  ? `${uiData.label_FNB_PtDOB.emoji_code} `
                  : ""}
                {getDate(patientData.DOB)}
              </Text>
            </>
          )}
          <Text
            style={{
              fontSize: "8px",
              display: "inline-block",
              paddingBottom: "4px",
            }}
          >
            {patientData.MRN && (
              <Text>
                {uiData?.label_FNB_MRN.emoji_code} {patientData.MRN}
              </Text>
            )}{" "}
            {patientData.additionalInfo && (
              <Text style={{}}>
                {uiData?.label_PT_AdditionalPatientInfo.tr_text}:{" "}
                {patientData.additionalInfo}
              </Text>
            )}
          </Text>
          <Text
            style={{
              fontSize: "8px",
              display: "inline-block",
              paddingBottom: "4px",
            }}
          >
            {patientData.skinType && (
              <Text>
                {"(" + numberToRoman(parseFloat(patientData.skinType)) + ")"}
                &nbsp;
              </Text>
            )}
            {patientData.monkType && (
              <Text
                style={{ marginRight: "8px" }}
              >{`MST-${patientData.monkType}`}</Text>
            )}

            {encounterDateTime && (
              <Text style={{ display: "inline-block" }}>
                {"       "}
                {uiData.label_FNB_EncounterDate.emoji_code}{" "}
                {getDate(encounterDateTime)}{" "}
              </Text>
            )}
          </Text>
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
