import styled from "styled-components";
import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import logoIMG from "../img/logoIMG.png";

const FooterWrapper = styled.div`
  width: 100%;
  background-color: gray;
  height: 150px;
  padding: 30px;
  position: fixed;
  bottom: 0;
`;

const FooterHead = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const IconWrapper = styled.div``;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #c5461d;
  text-shadow: 1px 1px 1px black;
`;

const HS = styled.div`
  font-size: 18px;
`;

const FooterBody = styled.p`
  margin-top: 18px;
  text-align: center;
  padding-left: 45px;
`;

const LogoImg = styled.img`
  width: 40px;
  height: 35px;
  margin-right: 5px;
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterHead>
        <IconWrapper>
          <FacebookShareButton
            style={{ marginRight: "15px" }}
            url={"www.facebook.com"}
          >
            <FacebookIcon size={36} round={true} borderRadius={24} />
          </FacebookShareButton>
          <InstapaperShareButton
            style={{ marginRight: "15px" }}
            url={"www.facebook.com"}
          >
            <InstapaperIcon size={36} round={true} borderRadius={24} />
          </InstapaperShareButton>
          <LineShareButton
            style={{ marginRight: "15px" }}
            url={"https://line.me"}
          >
            <LineIcon size={36} round={true} borderRadius={24} />
          </LineShareButton>
          <TwitterShareButton
            style={{ marginRight: "15px" }}
            url={"https://twitter.com/"}
          >
            <TwitterIcon size={36} round={true} borderRadius={24} />
          </TwitterShareButton>
        </IconWrapper>
        <LogoWrapper>
          <LogoImg src={logoIMG} />
          <LogoText>Air Map</LogoText>
        </LogoWrapper>
        <HS>Hanseo University</HS>
      </FooterHead>
      <FooterBody>
        Copyright &copy; 2023 AIRMAP(KOREA), All rights reserved.
      </FooterBody>
    </FooterWrapper>
  );
}

export default Footer;
