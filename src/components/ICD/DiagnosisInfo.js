import { Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { TranslationContext } from "../../contexts/translation";
function DiagnosisInfo({ diagnosisData }) {
  const { uiData } = useContext(TranslationContext);

  return (
    <>
      {diagnosisData ? (
        <div display="flex" flexDirection="column">
          <div
            display="flex"
            flexDirection="column"
            style={{ textAlign: "left" }}
          >
            <Typography>
              <b>{uiData.transtext_PrimaryDiagnosis.tr_text}:</b>
              {diagnosisData.primary.diagnosis.text}(
              {diagnosisData.primary.diagnosis.code})
            </Typography>
            {diagnosisData.primary.exts.length ? (
              <Box>
                <b>{uiData?.listItem_DiagnosisExtensions?.tr_text}:</b>
                {/* <b>Diagnosis Extensions:</b> */}
                {diagnosisData.primary.exts.map((item) => {
                  return (
                    <Typography>
                      {item.text}({item.code})
                    </Typography>
                  );
                })}
              </Box>
            ) : (
              ""
            )}
          </div>
          {diagnosisData.addl.length
            ? diagnosisData.addl
                .filter((item) => item.diagnosis.text)
                .map((item) => (
                  <div
                    display="flex"
                    flexDirection="column"
                    style={{ textAlign: "left" }}
                  >
                    <Typography>
                      <b>{uiData.transtext_AdditionalDiagnosis.tr_text}</b> :{item.diagnosis.text}(
                      {item.diagnosis.code})
                    </Typography>
                    {item.exts.length ? (
                      <Box>
                        <b>{uiData.transtext_Additional.tr_text} {uiData.transtext_DxExtensions.tr_text}:</b>{" "}
                        {item.exts.map((item) => {
                          return (
                            <Typography>
                              {item.text}({item.code})
                            </Typography>
                          );
                        })}
                      </Box>
                    ) : (
                      ""
                    )}
                  </div>
                ))
            : ""}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default DiagnosisInfo;
