import { CheckBoxOutlineBlank } from "@material-ui/icons";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import moment from "moment/moment";
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

export const MohsrMapForm = () => {
  //   const { uiData } = useTranslations();
  const storeState = store.getState();
  const encounterDateTime = storeState.userSettings.encounterInfo.dateTime;

  const patientData = storeState.userSettings.patientInfo;
  const patientImg = storeState.userSettings.patientImg;
  const uiData = storeState.translation.uiData;
  const patientName = patientData.firstName + " " + patientData.lastName;

  const formatDate = (date) => {
    if (date) {
      const d = moment(date).format("DD/MM/YYYY")
      return d;
    }
    return "";
  }

  const checkBox = <CheckBoxOutlineBlank style={{ fontSize: '10px', display: 'inline' }} />
  return (
    <View
      fixed
      style={{
        display: "block",
        paddingVertical: "10px",
        paddingHorizontal: "10px",
      }}
    >
      <View style={{
        fontSize: '10px',
        display: 'flex',
      }}>
        <Text style={{ marginBottom: '8px' }}>
          Patient Name: <span>{patientName ? patientName : '______________________'}</span>
        </Text>
        <Text style={{ marginBottom: '8px' }}>
          Birthday: <span>{patientData.DOB ? formatDate(patientData.DOB) : '______________________'}</span>
        </Text>
        <Text style={{ marginBottom: '8px' }}>
          Encounter Date: <span>{encounterDateTime ? formatDate(encounterDateTime) : '______________________'}</span>
        </Text>
        <Text style={{ marginBottom: '8px' }}>
          Tumor Type/Diagnosis: ______________
        </Text>
        <Text style={{ marginBottom: '8px' }}>
          Location: ______________
        </Text>
        <View style={{ marginBottom: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Text>Accession: _____________________________</Text>
          <Text>Path Report Location: _____________________________</Text>
        </View>
        <View style={{ marginBottom: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Text>Initial Size: _______ cm</Text>
          <Text>Final Defect: _______ cm</Text>
          <Text>Layer: ____________________________</Text>
        </View>
        <View style={{ fontSize: '8px', marginTop: '10px' }}>
          <Text style={{ marginBottom: '5px' }}>
            __ If positive A layer: Depth _____________________ Pathological Pattern: _____________________ Cell Morphology: __________________________________
          </Text>
          <Text style={{ marginBottom: '5px' }}>
            Perneural Invasion: Yes / No &emsp;&emsp; Presence of Scar: Yes / No
          </Text>
          <Text style={{ marginBottom: '5px' }}>
            __ If positive after A: [  ] Histologic pattern is the same as described inthe A layer &emsp; [  ] New info for this layer: ____________________________________________
          </Text>
        </View>
        <View style={{ fontSize: '8px', marginTop: '15px' }}>
          <Text style={{ marginBottom: '5px' }}>
            Repair Type: ___________________ Repair Measurement: _________________________ [  ] 2* Defect Total Repair Size: _________________________________
          </Text>
          <Text style={{ marginBottom: '5px' }}>
            Deep Sutures: _____________________________ Superficial Sutures: _____________________________ Repair Notes: ______________________________
          </Text>
        </View>
        <View style={{ fontSize: '8px', marginTop: '15px' }}>
          <Text style={{ marginBottom: '5px' }}>
            _________ Complex Closure Documentation: [  ] Perpendicular (Smaller Wound edge) measurement: ____ cm [  ] Undermining measurement ____ cm
          </Text>
          <Text style={{ marginBottom: '5px' }}>
            [  ] Removal of devitalized tissue (e.g. from hyfrecation) +/- debeveling of edges +/- removal of standing cones representing more than a layered closure
          </Text>
          <Text style={{ marginBottom: '5px' }}>
            [  ] Retention sutures placed [  ] Involvement of cartilage, named neurovascular structures ___________, free margin (ear, nostril, lip)
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
