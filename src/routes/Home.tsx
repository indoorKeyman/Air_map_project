import styled from "styled-components";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const ComponentsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// const WelcomeWrapper = styled(motion.div)`
//   display: flex;
// `;

// const HomeTitle = styled(motion.span)`
//   font-size: 80px;
//   font-weight: 800;
//   color: #3498db;
//   text-align: center;
//   margin: 50px 0px 90px 0px;
//   text-shadow: 3px 3px 3px ${(props) => props.theme.textShadow};
// `;

const TextParents = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const TextOne = styled(motion.span)`
  font-size: 40px;
  font-weight: 800;
  color: ${(props) => props.theme.mainTextColor};
  text-align: center;
  margin-bottom: 15px;
  text-shadow: 3px 3px 3px ${(props) => props.theme.textShadow};
`;
const TextTwo = styled(motion.span)`
  font-size: 40px;
  font-weight: 800;
  color: ${(props) => props.theme.mainTextColor};
  text-align: center;
  text-shadow: 3px 3px 3px ${(props) => props.theme.textShadow};
`;

const Flying = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 80px;
`;

const Svg = styled.svg`
  width: 110px;
  height: 110px;
  margin: -25px;
  fill: #ffffff;
`;

// const welcomeVariants = {
//   start: {
//     scale: 1,
//   },
//   end: {
//     scale: 1,

//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const homeTitleVariants = {
//   start: {
//     y: -50,
//     scale: 0,
//     opacity: 0,
//   },
//   end: {
//     y: 0,
//     scale: 1,
//     opacity: 1,
//     transition: { type: "spring", duration: 1, bounce: 0.6 },
//   },
// };

const flyingVariants = {
  start: {
    x: -240,
    scale: 0,
    opacity: 0,
  },
  end: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { delay: 0.4, type: "spring", duration: 3, bounce: 0.6 },
  },
};

const textParentsVariants = {
  start: {
    scale: 1,
  },
  end: {
    scale: 1,

    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.5,
      delayChildren: 2.8,
      staggerChildren: 0.6,
    },
  },
};

const textChildVariants = {
  start: {
    opacity: 0,
    scale: 0,
  },
  end: {
    scale: 1,
    opacity: 1,
  },
};

function Home() {
  return (
    <>
      <Helmet>
        <title>Air Map : : : Home</title>
      </Helmet>
      <ComponentsContainer>
        <TextWrapper>
          {/* <WelcomeWrapper
          variants={welcomeVariants}
          initial="start"
          animate="end"
        >
          {["W", "e", "l", "c", "o", "m", "e", "!"].map((i, index) => (
            <HomeTitle key={index} variants={homeTitleVariants}>
              {i}
            </HomeTitle>
          ))}
        </WelcomeWrapper> */}
          <Flying variants={flyingVariants} initial="start" animate="end">
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="15"
                  dy="20"
                  stdDeviation="4"
                  floodColor="#000000"
                  floodOpacity="0.8"
                />
              </filter>
              <path
                d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
                filter="url(#shadow)"
              />
            </Svg>
          </Flying>
          <TextParents
            variants={textParentsVariants}
            initial="start"
            animate="end"
          >
            <TextOne variants={textChildVariants}>여행은 즐겁게</TextOne>
            <TextTwo variants={textChildVariants}>비행은 편리하게</TextTwo>
          </TextParents>
        </TextWrapper>
      </ComponentsContainer>
    </>
  );
}

export default Home;
