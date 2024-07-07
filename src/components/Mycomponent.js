/* eslint-disable jsx-a11y/alt-text */
import "./style.css"; // CSS 파일을 가져옴
import "bootstrap/dist/css/bootstrap.min.css";
const Manual = () => {
  return (
    <div className="manual">
      <div className="container bg-light mt-4 p-4 rounded">
        <h1 className="display-4 text-center p-4">공항 지도 사용 메뉴얼</h1>
        <h2 className="h4 mt-4">지도 소개</h2>
        <p className="content mt-3">
          이 메뉴얼은 Leaflet을 사용하여 지도를 탐색하는 방법을 안내합니다. 현재
          지도는 인천공항의 실내지도를 나타내고 있습니다.
        </p>

        <h2 className="h4 mt-4">지도 이동</h2>
        <p className="content mt-3">
          지도를 드래그하거나 확대/축소하여 원하는 위치를 찾을 수 있습니다. 또한
          일정 수준 확대 시 지도에 주변 시설이 표현됩니다.
        </p>

        <h2 className="h4 mt-4">지도 확대 축소</h2>
        <p className="content mt-3">
          지도를 스크롤하거나 왼쪽 상단에 +- 버튼을 클릭해서 지도를
          조절하십시오.
        </p>

        <h2 className="h4 mt-4">버튼 소개</h2>
        <img src="/mapImg/start.png"></img>

        <p className="content mt-3">
          해당 버튼을 클릭 시 현재 시작 위치를 선택할 수 있습니다.
        </p>
        <img src="/mapImg/floorButton.png"></img>

        <p className="content mt-3">
          해당 버튼을 클릭 시 해당 버튼에 쓰여진 층으로 지도가 바뀝니다.
        </p>

        <h2 className="h4 mt-4">마커 선택</h2>
        <img src="/mapImg/restaurant.png"></img>
        <p className="content mt-3">
          마커 클릭 시 현재 위치에서 해당 목적지까지 가는 경로를 그리고 목적지에
          대한 정보가 뜹니다.
        </p>
        <img src="/mapImg/button.png"></img>

        <p className="content mt-3">
          해당 버튼을 클릭 시 오른쪽에 새로운 지도가 생성되며 생성된 지도는
          버튼에 쓰여진 층을 나타냅니다. 오른쪽 지도에서 목적지의 마커를
          선택하면 왼쪽 지도는 현재 층에 앨리베이터까지의 경로를 나타내며,
          오른쪽 지도는 해당 층 앨리베이터에서 도착지점까지의 경로를 그리게
          됩니다. 사용자는 그걸보고 현재 위치에서 다른 층의 목적지까지의 경로를
          확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
};
const MyComponent = () => {
  return <Manual></Manual>;
};

export default MyComponent;
