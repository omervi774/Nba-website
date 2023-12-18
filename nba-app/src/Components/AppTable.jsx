import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function AppTable({
  firstCell,
  secondCell,
  thirdCell,
  forthCell,
  fifthCell,
  ...rest
}) {
  const rows = Object.entries(rest);
  console.log(rows);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{firstCell}</TableCell>
            <TableCell align="right">&nbsp;&nbsp;{secondCell}</TableCell>
            <TableCell align="right">{thirdCell}</TableCell>
            <TableCell align="right">{forthCell}</TableCell>
            <TableCell align="right">{fifthCell}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows[0][1].map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {typeof row.first === "object" ? (
                  <div style={{ gap: "0.3rem", alignItems: "center" }}>
                    <img src={row.first.logo}></img>
                    <p>{row.first.name}</p>
                  </div>
                ) : (
                  row.first
                )}
              </TableCell>
              <TableCell align="right">{row.second}</TableCell>
              <TableCell align="right">{row.third}</TableCell>
              <TableCell align="right">{row.forth}</TableCell>
              <TableCell align="right">{row.fifth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AppTable;
