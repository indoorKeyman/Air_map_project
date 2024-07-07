import { motion } from "framer-motion";
import styled from "styled-components";
import comuImg from "../img/arriveImg.png";

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

function BannerArrive() {
  return (
    <Box variants={boxVariants} initial="start" animate="end">
      <Img src={comuImg} alt="main" />
      <TextWrapper>
        <TextOne>INCHEON AIPORT</TextOne>
        <TextTwo>FLIGHT INFO</TextTwo>
      </TextWrapper>
    </Box>
  );
}

export default BannerArrive;
