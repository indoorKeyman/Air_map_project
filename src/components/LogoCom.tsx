import styled from "styled-components";
import logoIMG from "../img/logoIMG.png";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 80px;
  height: 70px;
  margin-right: 5px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Airmap = styled.span`
  font-weight: 700;
  font-size: 36px;
  color: #c5461d;
  text-shadow: 1px 1px 1px black;
`;
const Oldteam = styled.span`
  margin-top: 3px;
  font-size: 16px;
  color: #c5461d;
  text-shadow: 1px 1px 1px black;
`;

function LogoCom() {
  return (
    <LogoWrapper>
      <LogoImg src={logoIMG} />

      <TextWrapper>
        <Airmap>Air Map</Airmap>
        <Oldteam>Old Team</Oldteam>
      </TextWrapper>
    </LogoWrapper>
  );
}

export default LogoCom;
