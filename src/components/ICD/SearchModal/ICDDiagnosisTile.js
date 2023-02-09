import { Grid, Tooltip, Typography } from "@material-ui/core";
import { Info } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useDiagnosis } from "../../../hooks/useDiagnosis";
export const DescriptionDiag = ({ icd }) => {
  const { data, isLoaded } = useDiagnosis(icd);
  return isLoaded ? data.description : "Loading...";
};
export default function ICDDiagnosisTile({
  isLoading,
  title,
  icdCode,
  onClick,
}) {
  return isLoading ? (
    <Grid container>
      <Grid item xs={12} style={{ height: 20, padding: 12 }}>
        <Skeleton animation={"wave"} />
      </Grid>
    </Grid>
  ) : (
    <Grid container style={{ paddingBlock: 12, cursor: "pointer" }}>
      <Grid
        item
        xs={8}
        className={"diag__border-box"}
        style={{ position: "relative" }}
      >
        <Typography
          variant={"body2"}
          align="center"
          style={{ width: "calc(100% - 25px)" }}
          onClick={onClick}
        >
          {title}
          {title && (
            <Tooltip title={<DescriptionDiag icd={icdCode} />}>
              <Info
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "5px",
                  transform: "translateY(-50%)",
                }}
              />
            </Tooltip>
          )}
        </Typography>
      </Grid>
      <Grid item xs={4} className={"diag__border-box"}>
        <Typography variant={"body2"} align="center">
          {icdCode}
        </Typography>
      </Grid>
    </Grid>
  );
}
