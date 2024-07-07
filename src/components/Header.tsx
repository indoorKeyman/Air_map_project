import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchWeather } from "../api";
import LogoCom from "./LogoCom";

const StyledHeader = styled.div<{ isActive: boolean }>`
  position: fixed;
  width: 100%;
  z-index: 7;
  margin: 0px 0px 100px 0px;
  padding: 5px 0px 0px 0px;
  background-color: ${(props) =>
    props.isActive ? "rgba(40, 42, 41, 0.4)" : "rgb(255, 255, 255)"};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Li = styled.li<{ isActive: boolean }>`
  font-size: 27px;
  font-weight: 600;
  color: ${(props) => (props.isActive ? "#ffffff" : "#000000")};
  a {
    transition: color 0.2s ease-in;
  }
  &:hover {
    color: ${(porps) => porps.theme.textHover};
  }
`;

// const Svg = styled.svg`
//   width: 200px;
//   height: 110px;
//   margin: -25px;
// `;

const Card = styled.div`
  background-color: none;
  width: 108;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div<{ isActive: boolean }>`
  width: auto;
  font-size: 65px;
  margin-left: 20px;
  /* text-shadow: 2px 4px 0px grey; */
  background: ${(props) =>
    props.isActive
      ? `linear-gradient(
    174deg,
    rgba(118, 226, 255, 1) 41%,
    rgba(255, 255, 255, 1) 79%)`
      : "radial-gradient(circle, rgba(240,240,240,0) 0%, rgba(41,41,41,0.764384977623862) 82%)"};
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
`;

// "radial-gradient(circle, rgba(240,240,240,0) 0%, rgba(41,41,41,0.764384977623862) 82%)"
// `linear-gradient(
//   174deg,
//   #000000 41%,
//   rgba(255, 255, 255, 1) 79%
// ) `

const WeatherBox = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeatherTextBox = styled.div``;

const AirportName = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "#ffffff" : "#000000")};
  font-size: 20px;
`;

const AirportCode = styled.span`
  color: #ffffff;
  font-size: 20px;
  background-color: tomato;
  margin-left: 5px;
  padding: 0px 5px;
`;

const WeatherResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WeatherIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 15px;
  margin-bottom: -5px;
`;

const WeatherDes = styled.div<{ isActive: boolean }>`
  text-align: center;
  font-size: 20px;
  color: ${(props) => (props.isActive ? "#ffffff" : "#000000")};
  margin-bottom: 5px;
`;

interface Iweather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
}

function Header() {
  const { isLoading, data } = useQuery<Iweather>("weather", fetchWeather);
  const homeMatch = useMatch("/");

  return (
    <StyledHeader isActive={homeMatch !== null}>
      <Ul>
        <Li isActive={homeMatch !== null}>
          <Link to={"/"}>
            {/* <Logo isActive={homeMatch !== null}>Air Map</Logo> */}
            <LogoCom />
          </Link>
        </Li>
        <Li isActive={homeMatch !== null}>
          <div></div>
        </Li>
        <Li isActive={homeMatch !== null}>
          <Link to={"about/arrival"}>항공편정보</Link>
        </Li>
        <Li isActive={homeMatch !== null}>
          <Link to={"map"}>지도</Link>
        </Li>
        <Li isActive={homeMatch !== null}>
          <Link to={"shopping/dine"}>쇼핑&식당</Link>
        </Li>
        <Li isActive={homeMatch !== null}>
          <Link to={"commu"}>커뮤니티</Link>
        </Li>
        <Li isActive={homeMatch !== null}>
          <div></div>
        </Li>
        <Li isActive={homeMatch !== null}>
          <Card>
            <WeatherBox>
              <WeatherTextBox>
                <AirportName isActive={homeMatch !== null}>
                  인천공항
                </AirportName>
                <AirportCode>RKSI</AirportCode>
              </WeatherTextBox>
              {isLoading ? (
                <h3>Loading...</h3>
              ) : (
                <WeatherResultBox>
                  <WeatherIcon
                    alt="weather_img"
                    src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
                  />
                  <WeatherDes isActive={homeMatch !== null}>
                    {data?.weather[0].main}
                  </WeatherDes>
                </WeatherResultBox>
              )}
            </WeatherBox>
          </Card>
        </Li>
      </Ul>
    </StyledHeader>
  );
}

export default Header;
