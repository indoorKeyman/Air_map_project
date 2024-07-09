import { useQuery } from "react-query";
import { fetchArrival } from "../api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

export const TableWrapper = styled.div`
  margin-top: 30px;
  overflow-y: scroll;
  height: 80%;
`;
interface Iarrive {
  response: {
    body: {
      items: [
        {
          airline: string;
          flightId: string;
          scheduleDateTime: string;
          airport: string;
          gatenumber: string;
          carousel: string;
          exitnumber: string;
          remark: string;
          airportCode: string;
          terminalId: string;
        }
      ];
    };
  };
}

function Depart() {
  const { isLoading, data } = useQuery<Iarrive>("arrival", fetchArrival);

  console.log(data?.response.body);

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
                    <TableCell>도착시간</TableCell>
                    <TableCell align="right">출발지</TableCell>
                    <TableCell align="right">항공사/운항편명</TableCell>
                    <TableCell align="right">터미널</TableCell>
                    <TableCell align="right">출발게이트</TableCell>
                    <TableCell align="right">수하물수취대</TableCell>
                    <TableCell align="right">입국장 출구</TableCell>
                    <TableCell align="right">도착현황</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.response.body.items.slice(0, 13).map((item) => (
                    <TableRow
                      key={item.scheduleDateTime}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="item">
                        {item.scheduleDateTime}
                      </TableCell>
                      <TableCell component="th" scope="item">
                        {item.airportCode}
                      </TableCell>
                      <TableCell align="right">
                        {item.airline} / {item.flightId}
                      </TableCell>
                      <TableCell align="center">{item.terminalId}</TableCell>
                      <TableCell align="center">
                        {item.scheduleDateTime}
                      </TableCell>
                      <TableCell align="center">{item.carousel}</TableCell>
                      <TableCell align="center">{item.exitnumber}</TableCell>
                      <TableCell align="center">
                        {item.remark === null ? "-" : item.remark}
                      </TableCell>
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
