import styled from "styled-components";
import dineImg from "../img/dineImg.png";
import { Link, Outlet, useMatch } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet";

const ComponentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0px;
  width: 480px;
`;

const Box = styled(motion.div)`
  margin-top: 50px;
  margin-bottom: -60px;
`;

const Img = styled.img`
  width: 480px;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -130px;
  left: 20px;
`;

const TextOne = styled.span`
  font-size: 40px;
  font-weight: 800;
  color: ${(props) => props.theme.mainTextColor};
  text-align: left;
  margin-bottom: 5px;
  text-shadow: 3px 3px 3px ${(props) => props.theme.textShadow};
`;
const TextTwo = styled.span`
  font-size: 40px;
  font-weight: 800;
  color: ${(props) => props.theme.mainTextColor};
  text-align: left;
  text-shadow: 3px 3px 3px ${(props) => props.theme.textShadow};
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

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

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

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0.1px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding-top: 500px;
  align-items: top;
  z-index: 2;
`;

const ExplainText = styled.span`
  font-size: 40px;
  font-weight: 800;
  color: ${(props) => props.theme.mainTextColor};
  text-align: left;
  text-shadow: 3px 3px 3px ${(props) => props.theme.textShadow};
`;

function Shopping() {
  const [clicked, setClicked] = useState(true);
  const shopMatch = useMatch("/shopping/shop");
  const dineMatch = useMatch("/shopping/dine");

  return (
    <>
      <Helmet>
        <title>Air Map : : : Shopping</title>
      </Helmet>
      <ComponentsContainer>
        <AnimatePresence>
          {clicked ? (
            <Overlay
              onClick={() => setClicked(false)}
              initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
              animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <ExplainText>Pelase Click 'SHOP' or 'DINE'</ExplainText>
            </Overlay>
          ) : null}
        </AnimatePresence>
        <Box variants={boxVariants} initial="start" animate="end">
          <Img src={dineImg} alt="main" />
          <TextWrapper>
            <TextOne>INCHEON AIPORT</TextOne>
            <TextTwo>DUTY FREE</TextTwo>
          </TextWrapper>
        </Box>
        <Tabs variants={tabsVariants} initial="initial" animate="animate">
          <Tab2 isActive={dineMatch !== null}>
            <Link to={"dine"}>dine</Link>
          </Tab2>
          <Tab1 isActive={shopMatch !== null}>
            <Link to={"shop"}>shop</Link>
          </Tab1>
        </Tabs>
        <Outlet />
      </ComponentsContainer>
    </>
  );
}

export default Shopping;
