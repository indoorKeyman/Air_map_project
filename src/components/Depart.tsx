import { useQuery } from "react-query";
import { fetchDepart } from "../api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import styled from "styled-components";

const TableWrapper = styled.div`
  margin-top: 30px;
`;

interface Iarrive {
  response: {
    body: {
      items: [
        {
          airline: string;
          flightId: string;
          scheduleDateTime: string;
          estimatedDateTime: string;
          airport: string;
          gatenumber: string;
          remark: string;
          airportCode: string;
          terminalId: string;
        }
      ];
    };
  };
}

function Depart() {
  const { isLoading, data } = useQuery<Iarrive>("depart", fetchDepart);

  console.log(data);

  return (
    <>
      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <TableWrapper>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>항공사/운항편명</TableCell>
                    <TableCell align="center">출발예정시간</TableCell>
                    <TableCell align="center">출발변경시간</TableCell>
                    <TableCell align="center">출발게이트</TableCell>
                    <TableCell align="center">터미널ID</TableCell>
                    <TableCell align="center">도착공항</TableCell>
                    <TableCell align="center">출발현황</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.response.body.items.slice(0, 13).map((item) => (
                    <TableRow
                      key={item.scheduleDateTime}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        {item.airline} / {item.flightId}
                      </TableCell>
                      <TableCell align="center">
                        {item.scheduleDateTime}
                      </TableCell>
                      <TableCell align="center">
                        {item.estimatedDateTime}
                      </TableCell>
                      <TableCell align="center">{item.gatenumber}</TableCell>
                      <TableCell align="center">{item.terminalId}</TableCell>
                      <TableCell align="center">{item.airportCode}</TableCell>
                      <TableCell align="center">{item.remark}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TableWrapper>
        )}
      </div>
    </>
  );
}

export default Depart;
