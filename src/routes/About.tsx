import { useQuery } from "react-query";
import { fetchDepart } from "../api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BannerArrive from "../components/BannerArrive";
import styled from "styled-components";
import { Link, Outlet, useMatch } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const BannerControl = styled.div`
  display: flex;
  justify-content: center;
`;

const TableWrapper = styled.div`
  margin-top: 30px;
`;

const Tabs = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 10px 0px;
  gap: 10px;
`;

const Tab1 = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: #3a3b3c;
  padding: 7px 0px;
  border: solid ${(props) => (props.isActive ? "3px #fdfdfd" : "none")};
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.06);
  color: ${(props) => props.theme.mainTextColor};

  a {
    display: block;
  }
`;
const Tab2 = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: #3a3b3c;
  padding: 7px 0px;
  border: solid ${(props) => (props.isActive ? "3px #fdfdfd" : "none")};
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.06);
  color: ${(props) => props.theme.mainTextColor};

  a {
    display: block;
  }
`;

const tabsVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

function About() {
  const departMatch = useMatch("/about/depart");
  const arriveMatch = useMatch("/about/arrive");

  return (
    <>
      <Helmet>
        <title>Air Map : : : flight</title>
      </Helmet>
      <div>
        <BannerControl>
          <BannerArrive />
        </BannerControl>

        <Tabs variants={tabsVariants} initial="initial" animate="animate">
          <Tab1 isActive={arriveMatch !== null}>
            <Link to={"depart"}>ARRIVAL</Link>
          </Tab1>
          <Tab2 isActive={departMatch !== null}>
            <Link to={"arrival"}>DEPART</Link>
          </Tab2>
        </Tabs>
        <Outlet />
      </div>
    </>
  );
}

export default About;
