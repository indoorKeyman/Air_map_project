
import BannerArrive from "../components/BannerArrive";
import styled from "styled-components";
import { Link, Outlet, useMatch } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Tab1, Tab2, Tabs } from "./Shopping";

const BannerControl = styled.div`
  display: flex;
  justify-content: center;
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
