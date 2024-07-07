import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    mainTextColor: string;
    textShadow: string;
    textHover: string;
  }
}
