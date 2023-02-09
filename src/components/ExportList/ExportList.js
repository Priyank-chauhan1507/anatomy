import React from "react";
import "./ExportList.css";

const ExportList = ({ orderedListContents, unorderedListContents }) => {
  // const classes = useStyles();

  return (
    <div className="exportList">
      {/* <TableContainer component={Paper} style={{ display: "flex" }}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Ordered List</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedListContents.map((listContent) => (
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>
                  {String.fromCharCode(64 + listContent.id)}){" "}
                  {listContent.anatomic__site} -{" "}
                  {listContent.biopsy__type.toUpperCase()} biopsy
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Table className={classes.table} aria-label="customized table">
          <TableHead style={{ borderLeft: "1px solid lightGray" }}>
            <TableRow>
              <StyledTableCell align="center">Unordered List</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {unorderedListContents.map((listContent) => (
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>
                  {"•"} {listContent.anatomic__site} -{" "}
                  {listContent.biopsy__type.toUpperCase()} biopsy
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      {orderedListContents.length !== 0 && (
        <>
          <div style={{ fontSize: "18px" }}>
            <b>
              <u>Ordered Procedure</u>
            </b>
          </div>
          <br />
          {orderedListContents.map(
            ({
              id,
              biopsy__type,
              anatomic__site,
              user__notes,
              user__image,
            }) => (
              <p>
                {id}. {anatomic__site?.getFullName()} - {biopsy__type} Biopsy{" "}
                <br /> Note: {user__notes}
                <img src={user__image} alt="" height="50px" />
                <br />
                <br />
              </p>
            )
          )}
        </>
      )}
      <br />

      {unorderedListContents.length !== 0 && (
        <>
          <div style={{ fontSize: "18px" }}>
            <b>
              <u>Unordered List</u>
            </b>
          </div>
          <br />

          {unorderedListContents.map(
            ({
              id,
              biopsy__type,
              anatomic__site,
              user__notes,
              user__image,
            }) => (
              <p>
                • {anatomic__site?.getFullName()} - {biopsy__type} Biopsy <br />{" "}
                Note: {user__notes}
                <img src={user__image} alt="" height="50px" />
                <br />
                <br />
              </p>
            )
          )}
        </>
      )}
    </div>
  );
};

export default ExportList;
