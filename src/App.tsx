import { Outlet, ScrollRestoration, useMatch } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { lightTheme } from "./theme";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Globalstyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400&display=swap');

    html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  *{
    box-sizing: border-box;
  }
  body{
    font-family: 'Noto Sans KR', sans-serif;
    color: ${(props) => props.theme.textColor};
    height: 100vh;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  input{
    border: none;
  }
  textarea{
    border: none;
  }
`;

//창이 : "https://cdn.pixabay.com/photo/2021/07/21/02/16/architecture-6482060_1280.jpg"
//인천 : " https://wallpapercave.com/dwp2x/wp11108965.jpg"

const Container = styled.div<{ isActive: boolean }>`
  align-content: center;
  height: 100vh;
  margin: 0 auto;
  background: ${(props) =>
    props.isActive
      ? `center no-repeat url(
        "https://cdn.pixabay.com/photo/2021/07/21/02/16/architecture-6482060_1280.jpg"
          )`
      : `#ffffff`};
  background-size: ${(props) => (props.isActive ? "cover" : "none")};
  opacity: ${(props) => (props.isActive ? "0.95" : "none")};
  position: relative;
  display: flex;
  align-items:flex-start;
  justify-content:center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 150px;
`;

function App() {
  const pageCheck = useMatch("");

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Globalstyle />
        <ScrollRestoration />
        <Container isActive={pageCheck !== null}>
          <Header />
          <Wrapper>
            <Outlet />
          </Wrapper>
          {/* {pageCheck === null ? <Footer /> : null} */}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
