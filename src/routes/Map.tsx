import { Helmet } from "react-helmet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import React, { useRef, useEffect, useState } from "react";

import MyComponent from "../components/Mycomponent";

const ComponentsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
`;

const MapBox = styled.div`
  margin: 20px auto;
`;

//맵 구현 함수
function Map(props: any) {
  const mapRef = useRef(null);
  //백엔드 데이터 타입
  interface DataItem {
    seatnum: number;
    existence: number;
  }
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  //백엔드에서 데이터 받아오는 함수
  function fetchData() {
    fetch("http://localhost:4000/data")
      .then((response) => response.json())
      .then((data) => {
        console.log("백엔드로부터 받은 데이터:", data[0].seatnum);
        // 데이터를 여기서 처리합니다
        setData(data);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }

  interface CustomImageOverlayOptions extends L.ImageOverlayOptions {
    minZoom?: number;
    maxZoom?: number;
  }

  useEffect(() => {
    // Leaflet 초기화 및 맵 생성
    const map = L.map(mapRef.current!, {
      attributionControl: false,
    }).setView([15, 300], 0.5);

    var overlay = L.imageOverlay(
      "/mapImg/mapB1.svg",
      [
        [-100, 0],
        [90, 600],
      ],
      {} as CustomImageOverlayOptions
    ).addTo(map);

    var startLat = [-65.94647177615738, -3.1563612729905395, 6.101715139249571];
    var startLng = [119.29687455296518, 212.4133301898837, 398.17382901906973];

    var arriveLat = [
      -78.34941069014627, -78.20656311074711, -51.39920565355378,
      -51.508742458803326,
    ];
    var arriveLng = [
      320.44921875000006, 279.66796875000006, 283.88671875000006,
      319.83398437500006,
    ];

    console.log(data); //data에 seattable 데이터가 담겨있음

    var latlngs0 = [[], [], []];
    var polyline = L.polyline(latlngs0).addTo(map);
    var polyline2 = L.polyline(latlngs0).addTo(map);
    var map2: any = null;

    var otherFacilitys: any = [];
    var otherFacilityArr: any = [];
    var markerElevatorLocation: any = [-52.052490476001, 300.23437500000006];
    var latlngsElevator: any = [
      [
        [startLat[0], startLng[0]],
        [-58.813741715707806, 133.59375000000003],
        [-46.55817421503483, 288.7606573104859],
        markerElevatorLocation,
      ],
    ];

    var startIcon = L.icon({
      iconUrl: "/mapImg/start.png",
      iconSize: [20, 20], // 마커의 가로, 세로 크기
      iconAnchor: [10, 15], // 마커 포인트 위치
      popupAnchor: [0, 0], // 팝업 위치
    });
    //엘리베이터 아이콘 가져오기
    var elevatorIcon = L.icon({
      iconUrl: "/mapImg/elevator.png",
      iconSize: [20, 20], // 마커의 가로, 세로 크기
      iconAnchor: [10, 15], // 마커 포인트 위치
      popupAnchor: [0, 0], // 팝업 위치
    });
    var restaurantIcon = L.icon({
      iconUrl: "/mapImg/restaurant.png",
      iconSize: [30, 30], // 마커의 가로, 세로 크기
      iconAnchor: [15, 28], // 마커 포인트 위치
      popupAnchor: [0, 0], // 팝업 위치
    });
    var museumIcon = L.icon({
      iconUrl: "/mapImg/museum.png",
      iconSize: [25, 25], // 마커의 가로, 세로 크기
      iconAnchor: [12, 25], // 마커 포인트 위치
      popupAnchor: [0, 0], // 팝업 위치
    });
    var informationIcon = L.icon({
      iconUrl: "/mapImg/information.png",
      iconSize: [25, 25], // 마커의 가로, 세로 크기
      iconAnchor: [12, 25], // 마커 포인트 위치
      popupAnchor: [0, 0], // 팝업 위치
    });
    var postIcon = L.icon({
      iconUrl: "/mapImg/post.png",
      iconSize: [25, 25], // 마커의 가로, 세로 크기
      iconAnchor: [12, 25], // 마커 포인트 위치
      popupAnchor: [0, 0], // 팝업 위치
    });

    // 시작 마커 찍기
    var markerStart = L.marker([startLat[0], startLng[0]], {
      icon: startIcon,
    }).addTo(map);
    var markerStart2 = L.marker([startLat[1], startLng[1]], {
      icon: startIcon,
    })
      .addTo(map)
      .bindPopup("시작지점입니다.")
      .openPopup();
    var markerStart3 = L.marker([startLat[2], startLng[2]], {
      icon: startIcon,
    })
      .addTo(map)
      .bindPopup("시작지점입니다.")
      .openPopup();

    markerStart.bindTooltip("시작지점을 선택해주세요", {
      className: "custom-tooltip", // 사용자 정의 클래스 이름 설정
      permanent: false, // 항상 툴팁을 표시할 것인지 여부 설정
      direction: "bottom", // 툴팁이 표시될 위치 설정
    });
    markerStart2.bindTooltip("시작지점을 선택해주세요", {
      className: "custom-tooltip", // 사용자 정의 클래스 이름 설정
      permanent: false, // 항상 툴팁을 표시할 것인지 여부 설정
      direction: "bottom", // 툴팁이 표시될 위치 설정
    });
    markerStart3.bindTooltip("시작지점을 선택해주세요", {
      className: "custom-tooltip", // 사용자 정의 클래스 이름 설정
      permanent: false, // 항상 툴팁을 표시할 것인지 여부 설정
      direction: "bottom", // 툴팁이 표시될 위치 설정
    });
    markerStart.on("click", function (e: any) {
      deleteLine();
      start1Select();
      markerStart.unbindTooltip();
      markerStart.bindPopup("시작지점입니다.").openPopup();
    });

    markerStart2.on("click", function (e: any) {
      deleteLine();
      start2Select();
      markerStart2.unbindTooltip();
      markerStart2.bindPopup("시작지점입니다.").openPopup();
    });
    markerStart3.on("click", function (e: any) {
      deleteLine();
      start3Select();
      markerStart3.unbindTooltip();
      markerStart3.bindPopup("시작지점입니다.").openPopup();
    });

    //엘리베이터 마커 찍기
    var markerElevator: any = L.marker(markerElevatorLocation, {
      icon: elevatorIcon,
    })
      .addTo(map)
      .bindPopup("엘리베이터입니다.")
      .openPopup();
    markerElevator.on("click", function (e: any) {
      deleteLine();
      // 클릭한 마커의 좌표 가져오기
      var latlng = e.latlng;
      console.log(latlng);
      // 경로 이벤트 처리
      polyline = L.polyline(latlngsElevator[0], { color: "red" }).addTo(map);
    });
    var otherElevator = [-52.052490476001, 300.23437500000006 + 550];

    //도착마커 구성
    var markersArrive: any = [
      {
        name: "버거킹",
        lat: arriveLat[0],
        lng: arriveLng[0],
        latlngs: [
          [startLat[0], startLng[0]],
          [-58.813741715707806, 133.59375000000003],
          [-49.38237278700955, 243.45703125000003],
          [-70.3800725582021, 257.9090083027673],
          [-74.21378075601139, 280.4095734722727],
          [arriveLat[0], arriveLng[0]],
        ],
        lineColor: "red",
        radius: 7,
        color: "red",
        icon: restaurantIcon,
        message:
          "이름 : 버거킹 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 1",
      },

      {
        name: "KFC",
        lat: arriveLat[1],
        lng: arriveLng[1],
        latlngs: [
          [startLat[0], startLng[0]],
          [-58.813741715707806, 133.59375000000003],
          [-49.38237278700955, 243.45703125000003],
          [-70.3800725582021, 257.9090083027673],
          [-74.21378075601139, 280.4095734722727],
          [arriveLat[1], arriveLng[1]],
        ],
        lineColor: "red",
        radius: 7,
        color: "black",
        icon: restaurantIcon,
        message: "이름 : KFC <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 2",
      },
      {
        name: "한찬",
        lat: arriveLat[2],
        lng: arriveLng[2],
        latlngs: [
          [startLat[0], startLng[0]],
          [-58.813741715707806, 133.59375000000003],
          [-66.37540324833978, 158.4162935217202],
          [-53.124369722213544, 222.75278671911116],
          [-46.31589503644567, 282.75213360786444],
          [arriveLat[2], arriveLng[2]],
        ],
        lineColor: "red",
        radius: 7,
        color: "blue",
        icon: restaurantIcon,
        message: "이름 : 한찬 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 3",
      },
      {
        name: "경양식당",
        lat: arriveLat[3],
        lng: arriveLng[3],
        latlngs: [
          [startLat[0], startLng[0]],
          [-58.813741715707806, 133.59375000000003],
          [-49.38237278700955, 243.45703125000003],
          [-46.31589503644567, 282.75213360786444],
          [-45.9534435838201, 299.81439538163033],
          [-46.77134258405013, 321.328125],
          [arriveLat[3], arriveLng[3]],
        ],
        lineColor: "red",
        radius: 7,
        color: "blue",
        icon: restaurantIcon,
        message:
          "이름 : 경양식당 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 4",
      },
    ];

    var markers: any = [];
    markersArrive.forEach(function (marker: any) {
      var markers1 = L.marker([marker.lat, marker.lng], {
        icon: marker.icon,
      })
        .addTo(map)
        .bindPopup(marker.message, { autoClose: true })
        .openPopup();
      markers1.on("click", function (e: any) {
        console.log(marker.name);
        deleteLine();
        // 클릭한 마커의 좌표 가져오기
        var latlng = e.latlng;
        console.log(latlng);
        // 경로 이벤트 처리
        polyline = L.polyline(marker.latlngs, {
          color: marker.lineColor,
        }).addTo(map);
      });
      markers.push(markers1);
    });

    //주변 시설 구성
    var facilityLat: number[] = [
      -52.48278022207821, -72.18281337488712, -72.34346659697908,
    ];
    var facilityLng: number[] = [
      273.33984375000006, 308.60341367842875, 289.19662951822016,
    ];
    var facilitys: any = [];
    var facilityArr: any = [
      { name: "하나은행 영업점", lat: facilityLat[0], lng: facilityLng[0] },
      { name: "신한은행 영업점", lat: facilityLat[1], lng: facilityLng[1] },
      { name: "약국", lat: facilityLat[2], lng: facilityLng[2] },
    ];

    //맵 전체 이벤트 구성
    map.on("click", function (e: any) {
      console.log(e.latlng);
    });

    map.on("zoomend", function () {
      facilityArr.forEach(function (facility: any) {
        var marker = L.circleMarker([facility.lat, facility.lng], {
          radius: 5,
          color: "black",
          fillColor: "#f03",
          fillOpacity: 0,
        }).addTo(map);

        marker.bindTooltip(facility.name, {
          className: "custom-tooltip",
          permanent: true,
          direction: "bottom",
        });

        facilitys.push(marker);
      });
      if (map.getZoom() < 2) {
        // 일정 레벨 이하에서는 마커를 숨깁니다.
        for (var i = 0; i < facilitys.length; i++) {
          facilitys[i].closeTooltip();
        }
        for (i = 0; i < facilitys.length; i++) {
          facilitys[i].setStyle({ opacity: 0 });
        }
      } else {
        for (i = 0; i < facilitys.length; i++) {
          facilitys[i].openTooltip();
        }
        for (i = 0; i < facilitys.length; i++) {
          facilitys[i].setStyle({ opacity: 1 });
        }
      }
    });

    //맵 UI 구성
    function createNav(nav: any, floor: any) {
      var parent = document.createElement("ul");
      var liElement = document.createElement("li");
      var aElement = document.createElement("a");
      var spanElement = document.createElement("span");
      var ulElement = document.createElement("ul");
      var liElement1 = document.createElement("li");
      var liElement2 = document.createElement("li");
      var liElement3 = document.createElement("li");
      var liElement4 = document.createElement("li");

      aElement.href = "#";
      aElement.innerHTML = floor;
      spanElement.className = "plus";
      spanElement.innerHTML = "+";
      aElement.appendChild(spanElement);

      liElement.appendChild(aElement);
      liElement.appendChild(ulElement);

      ulElement.appendChild(liElement1);
      ulElement.appendChild(liElement2);
      ulElement.appendChild(liElement3);
      ulElement.appendChild(liElement4);

      liElement.classList.add("child", floor);

      liElement1.onclick = function () {
        element1Event(liElement1);
      };

      parent.className = "parent";
      parent.appendChild(liElement);
      nav.appendChild(parent);
    }
    var element1Event = (liElement: any) => {
      console.log("a");
    };

    var navB1 = L.Control.extend({
      options: {
        position: "topright",
      },

      onAdd: function () {
        var nav = L.DomUtil.create("div", "nav");
        var floor = "B1";

        createNav(nav, floor);

        nav.onclick = function () {
          otherFloor(floor);
        };
        return nav;
      },
    });
    var nav1F = L.Control.extend({
      options: {
        position: "topright",
      },

      onAdd: function () {
        var nav = L.DomUtil.create("div", "nav");
        var floor = "1F";
        createNav(nav, floor);

        nav.onclick = function () {
          otherFloor(floor);
        };
        return nav;
      },
    });
    var nav2F = L.Control.extend({
      options: {
        position: "topright",
      },

      onAdd: function () {
        var nav = L.DomUtil.create("div", "nav");
        var floor = "2F";
        createNav(nav, floor);

        nav.onclick = function () {
          otherFloor(floor);
        };
        return nav;
      },
    });
    var nav3F = L.Control.extend({
      options: {
        position: "topright",
      },

      onAdd: function () {
        var nav = L.DomUtil.create("div", "nav");

        var floor = "3F";
        createNav(nav, floor);

        nav.onclick = function () {
          otherFloor(floor);
        };
        return nav;
      },
    });
    var nav4F = L.Control.extend({
      options: {
        position: "topright",
      },

      onAdd: function () {
        var nav = L.DomUtil.create("div", "nav");

        var floor = "4F";
        createNav(nav, floor);

        nav.onclick = function () {
          otherFloor(floor);
        };
        return nav;
      },
    });

    map.addControl(new navB1());
    map.addControl(new nav1F());
    map.addControl(new nav2F());
    map.addControl(new nav3F());
    map.addControl(new nav4F());

    // 지하 1층 구현 함수
    var changeB1 = () => {
      console.log("B1");
      deleteMap();
      resetElement();
      facilityLat = [-52.48278022207821, -72.39570570653261];
      facilityLng = [273.33984375000006, 300.05859375000006];
      facilityArr = [
        { name: "하나은행 영업점", lat: facilityLat[0], lng: facilityLng[0] },
        { name: "신한은행 영업점", lat: facilityLat[1], lng: facilityLng[1] },
      ];
      overlay = L.imageOverlay("/mapImg/mapB1.svg", [
        [-100, 0],
        [90, 600],
      ]).addTo(map);
      // 마커 찍기
      startLat = [-65.94647177615738, -3.1563612729905395, 6.101715139249571];
      startLng = [119.29687455296518, 212.4133301898837, 398.17382901906973];
      markerElevatorLocation = [-52.052490476001, 300.23437500000006];

      markerElevator = L.marker(markerElevatorLocation, {
        icon: elevatorIcon,
      })
        .addTo(map)
        .bindPopup("엘리베이터입니다.")
        .openPopup();
      latlngsElevator = [
        [
          [startLat[0], startLng[0]],
          [-58.813741715707806, 133.59375000000003],
          [-46.55817421503483, 288.7606573104859],
          markerElevatorLocation,
        ],
      ];

      markerStart = L.marker([-65.94647177615738, 119.29687455296518], {
        icon: startIcon,
      }).addTo(map);

      markerStart.bindTooltip("시작 지점을 선택해주세요", {
        className: "custom-tooltip", // 사용자 정의 클래스 이름 설정
        permanent: false, // 항상 툴팁을 표시할 것인지 여부 설정
        direction: "bottom", // 툴팁이 표시될 위치 설정
      });

      arriveLat = [
        -78.34941069014627, -78.20656311074711, -51.39920565355378,
        -51.508742458803326,
      ];
      arriveLng = [
        320.44921875000006, 279.66796875000006, 283.88671875000006,
        319.83398437500006,
      ];

      markersArrive = [
        {
          name: "버거킹",
          lat: arriveLat[0],
          lng: arriveLng[0],
          latlngs: [
            [startLat[0], startLng[0]],
            [-58.813741715707806, 133.59375000000003],
            [-49.38237278700955, 243.45703125000003],
            [-70.3800725582021, 257.9090083027673],
            [-74.21378075601139, 280.4095734722727],
            [arriveLat[0], arriveLng[0]],
          ],
          lineColor: "red",
          radius: 7,
          color: "red",
          icon: restaurantIcon,
          message:
            "이름 : 버거킹 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 1",
        },

        {
          name: "KFC",
          lat: arriveLat[1],
          lng: arriveLng[1],
          latlngs: [
            [startLat[0], startLng[0]],
            [-58.813741715707806, 133.59375000000003],
            [-49.38237278700955, 243.45703125000003],
            [-70.3800725582021, 257.9090083027673],
            [-74.21378075601139, 280.4095734722727],
            [arriveLat[1], arriveLng[1]],
          ],
          lineColor: "red",
          radius: 7,
          color: "black",
          icon: restaurantIcon,
          message: "이름 : KFC <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 2",
        },
        {
          name: "한찬",
          lat: arriveLat[2],
          lng: arriveLng[2],
          latlngs: [
            [startLat[0], startLng[0]],
            [-58.813741715707806, 133.59375000000003],
            [-66.37540324833978, 158.4162935217202],
            [-53.124369722213544, 222.75278671911116],
            [-46.31589503644567, 282.75213360786444],
            [arriveLat[2], arriveLng[2]],
          ],
          lineColor: "red",
          radius: 7,
          color: "blue",
          icon: restaurantIcon,
          message:
            "이름 : 한찬 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 3",
        },
        {
          name: "경양식당",
          lat: arriveLat[3],
          lng: arriveLng[3],
          latlngs: [
            [startLat[0], startLng[0]],
            [-58.813741715707806, 133.59375000000003],
            [-49.38237278700955, 243.45703125000003],
            [-46.31589503644567, 282.75213360786444],
            [-45.9534435838201, 299.81439538163033],
            [-46.77134258405013, 321.328125],
            [arriveLat[3], arriveLng[3]],
          ],
          lineColor: "red",
          radius: 7,
          color: "blue",
          icon: restaurantIcon,
          message:
            "이름 : 경양식당 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 4",
        },
      ];
      facilityLat = [-62.274915950787374, -59.71862885480727];
      facilityLng = [221.83418749581466, 219.28548296976498];
      facilitys = [];

      markersArrive.forEach(function (marker: any) {
        var markers1 = L.marker([marker.lat, marker.lng], {
          icon: restaurantIcon,
        })
          .addTo(map)
          .bindPopup(marker.message)
          .openPopup();
        markers1.on("click", function (e: any) {
          console.log(marker.name);
          deleteLine();
          // 클릭한 마커의 좌표 가져오기
          var latlng = e.latlng;
          console.log(latlng);
          // 경로 이벤트 처리
          polyline = L.polyline(marker.latlngs, {
            color: marker.lineColor,
          }).addTo(map);
        });
        markers.push(markers1);
      });
    };

    // 1층 구현 함수
    var change1F = () => {
      console.log("1F");
      deleteMap();
      resetElement();
      facilityLat = [-58.904645703019995, -61.85614879566797];
      facilityLng = [219.99023437500003, 227.63671875000003];

      facilityArr = [
        { name: "맘스터치", lat: facilityLat[0], lng: facilityLng[0] },
        { name: "스타벅스", lat: facilityLat[1], lng: facilityLng[1] },
      ];
      overlay = L.imageOverlay("/mapImg/map1F.svg", [
        [-100, 0],
        [90, 600],
      ]).addTo(map);
      // 마커 찍기
      startLat = [-65.94647177615738, -3.1563612729905395, 6.101715139249571];
      startLng = [119.29687455296518, 212.4133301898837, 398.17382901906973];

      markerElevatorLocation = [-46.07781267422704, 300.7298857431335];
      markerElevator = L.marker(markerElevatorLocation, {
        icon: elevatorIcon,
      })
        .addTo(map)
        .bindPopup("엘리베이터입니다.")
        .openPopup();
      latlngsElevator = [
        [
          [startLat[0], startLng[0]],
          [-46.07323062540835, 159.43359375],
          [-56.45200625824782, 177.60297954082492],
          [-46.55817421503483, 288.7606573104859],
          markerElevatorLocation,
        ],
      ];
      markerStart.on("click", function (e: any) {
        deleteLine();
        start1Select();
      });

      markerStart2.on("click", function (e: any) {
        deleteLine();
        start2Select();
      });
      markerStart3.on("click", function (e: any) {
        deleteLine();
        start3Select();
      });

      markerStart = L.marker([startLat[0], startLng[0]], {
        icon: startIcon,
      }).addTo(map);

      markerStart.bindTooltip("시작 지점을 선택해주세요", {
        className: "custom-tooltip", // 사용자 정의 클래스 이름 설정
        permanent: false, // 항상 툴팁을 표시할 것인지 여부 설정
        direction: "bottom", // 툴팁이 표시될 위치 설정
      });

      arriveLat = [
        -50.0641917366591, -50.569282865582416, -40.780541431860314,
        -40.3130432088809,
      ];
      arriveLng = [
        247.67578125000003, 215.20019531250003, 325.76660156250006,
        288.01757812500006,
      ];
      markersArrive = [
        {
          name: "안내데스크",
          lat: arriveLat[0],
          lng: arriveLng[0],
          latlngs: [
            [startLat[0], startLng[0]],
            [-46.07323062540835, 159.43359375],
            [-56.45200625824782, 177.60297954082492],
            [arriveLat[0], arriveLng[0]],
          ],
          lineColor: "red",
          radius: 10,
          color: "red",
          icon: informationIcon,
          message:
            "이름 : 안내데스크 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 6",
        },
        {
          name: "푸드가든",
          lat: arriveLat[1],
          lng: arriveLng[1],
          latlngs: [
            [startLat[0], startLng[0]],
            [-46.07323062540835, 159.43359375],
            [-56.45200625824782, 177.60297954082492],
            [arriveLat[1], arriveLng[1]],
          ],
          lineColor: "red",
          radius: 10,
          color: "black",
          icon: restaurantIcon,
          message:
            "이름 : 푸드가든 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 2",
        },
        {
          name: "무쿄쿠",
          lat: arriveLat[2],
          lng: arriveLng[2],
          latlngs: [
            [startLat[0], startLng[0]],
            [-46.07323062540835, 159.43359375],
            [-56.838594680443045, 179.20099139213565],
            [-42.409448780315834, 235.45099139213565],
            [-35.58829024019928, 282.4005603790284],
            [arriveLat[2], arriveLng[2]],
          ],
          lineColor: "red",
          radius: 10,
          color: "blue",
          icon: restaurantIcon,
          message:
            "이름 : 무쿄쿠 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 5",
        },
      ];
      facilityLat = [-62.274915950787374, -59.71862885480727];
      facilityLng = [221.83418749581466, 219.28548296976498];
      facilitys = [];

      markersArrive.forEach(function (marker: any) {
        var markers1 = L.marker([marker.lat, marker.lng], {
          icon: restaurantIcon,
        })
          .addTo(map)
          .bindPopup(marker.message)
          .openPopup();
        markers1.on("click", function (e: any) {
          console.log(marker.name);
          deleteLine();
          // 클릭한 마커의 좌표 가져오기
          var latlng = e.latlng;
          console.log(latlng);
          // 경로 이벤트 처리
          polyline = L.polyline(marker.latlngs, {
            color: marker.lineColor,
          }).addTo(map);
        });
        markers.push(markers1);
      });
    };
    // 2층 구현 함수
    var change2F = () => {
      console.log("1F");
      deleteMap();
      resetElement();
      facilityLat = [-58.904645703019995, -61.85614879566797];
      facilityLng = [219.99023437500003, 227.63671875000003];

      facilityArr = [
        { name: "맘스터치", lat: facilityLat[0], lng: facilityLng[0] },
        { name: "스타벅스", lat: facilityLat[1], lng: facilityLng[1] },
      ];
      overlay = L.imageOverlay("./mapImg/map2F.svg", [
        [-100, 0],
        [90, 600],
      ]).addTo(map);
      // 마커 찍기

      startLat = [-65.94647177615738, -3.1563612729905395, 6.101715139249571];
      startLng = [119.29687455296518, 212.4133301898837, 398.17382901906973];

      markerElevatorLocation = [-52.052490476001, 300.23437500000006];

      markerElevator = L.marker(markerElevatorLocation, {
        icon: elevatorIcon,
      })
        .addTo(map)
        .bindPopup("엘리베이터입니다.")
        .openPopup();
      latlngsElevator = [
        [
          [startLat[0], startLng[0]],
          [-57.70361412444209, 157.5319601967931],
          [-63.704722429433225, 166.71093709766865],
          [-45.460130637921, 286.2421870976687],
          markerElevatorLocation,
        ],
      ];

      markerStart = L.marker([startLat[0], startLng[0]], {
        icon: startIcon,
      }).addTo(map);

      markerStart.bindTooltip("시작 지점을 선택해주세요", {
        className: "custom-tooltip", // 사용자 정의 클래스 이름 설정
        permanent: false, // 항상 툴팁을 표시할 것인지 여부 설정
        direction: "bottom", // 툴팁이 표시될 위치 설정
      });

      arriveLat = [
        -50.06355122737638, -61.07725022543949, -61.07725022543949,
        20.63301769573328,
      ];
      arriveLng = [
        320.11363651603466, 233.05397696793082, 368.5813207179309,
        394.2214143276216,
      ];

      markersArrive = [
        {
          name: "우체국",
          lat: arriveLat[0],
          lng: arriveLng[0],
          latlngs: [
            [startLat[0], startLng[0]],
            [-57.70361412444209, 157.5319601967931],
            [-63.704722429433225, 166.71093709766865],
            [-51.39920565355378, 280.2656245976687],
            [arriveLat[0], arriveLng[0]],
          ],
          icon: postIcon,
          lineColor: "red",
          radius: 10,
          color: "red",
          message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
            data.filter((item) => item.seatnum === 1).length
          }`,
        },
        {
          name: "파스쿠찌",
          lat: arriveLat[1],
          lng: arriveLng[1],
          latlngs: [
            [startLat[0], startLng[0]],
            [-57.70361412444209, 157.5319601967931],
            [-63.704722429433225, 166.71093709766865],
            [-54.57206165565852, 250.1015616953373],
            [-58.99531118795094, 251.9648433476687],
            [arriveLat[1], arriveLng[1]],
          ],
          icon: restaurantIcon,
          lineColor: "red",
          radius: 10,
          color: "black",
          message: `이름 : 파스쿠찌 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
            data.find((item) => item.seatnum === 2)?.existence
          }`,
        },
        {
          name: "던킨 커피하우스",
          lat: arriveLat[2],
          lng: arriveLng[2],
          latlngs: [
            [startLat[0], startLng[0]],
            [-57.70361412444209, 157.5319601967931],
            [-63.860035895395306, 168.1874991953373],
            [-49.38237278700955, 227.24999919533735],
            [-46.0732306254083, 284.765625],
            [-51.508742458803326, 286.2421870976687],
            [-53.5403073915002, 352.33593709766865],
            [-58.99531118795094, 350.05078084766865],
            [arriveLat[2], arriveLng[2]],
          ],
          icon: restaurantIcon,
          lineColor: "red",
          radius: 10,
          color: "blue",
          message: `이름 : 던킨 커피하우스 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
            data.find((item) => item.seatnum === 3)?.existence
          }`,
        },
        {
          name: "전통문화 LED 미디어 월",
          lat: arriveLat[3],
          lng: arriveLng[3],
          latlngs: [
            [startLat[0], startLng[0]],
            [-57.70361412444209, 157.5319601967931],
            [-35.459857240239025, 227.4928976967931],
            [-24.20597957152906, 300.96946019679314],
            [-34.596220172379624, 382.8835226967932],
            [-5.7908968128719565, 395.2265620976687],
            [arriveLat[3], arriveLng[3]],
          ],
          icon: museumIcon,
          lineColor: "red",
          radius: 10,
          color: "blue",
          message: `이름 : 전통문화 LED 미디어 월 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
            data.find((item) => item.seatnum === 5)?.existence
          }`,
        },
      ];
      facilityLat = [-62.274915950787374, -59.71862885480727];
      facilityLng = [221.83418749581466, 219.28548296976498];
      facilitys = [];
      markersArrive.forEach(function (marker: any) {
        var markers1 = L.marker([marker.lat, marker.lng], {
          icon: restaurantIcon,
        })
          .addTo(map)
          .bindPopup(marker.message)
          .openPopup();
        markers1.on("click", function (e: any) {
          console.log(marker.name);
          deleteLine();
          // 클릭한 마커의 좌표 가져오기
          var latlng = e.latlng;
          console.log(latlng);
          // 경로 이벤트 처리
          polyline = L.polyline(marker.latlngs, {
            color: marker.lineColor,
          }).addTo(map);
        });
        markers.push(markers1);
      });
    };
    // 3층 구현 함수
    var change3F = () => {
      console.log("3F");
      deleteMap();
      resetElement();
      overlay = L.imageOverlay(process.env.PUBLIC_URL + "/mapImg/map3F.svg", [
        [-100, 0],
        [90, 600],
      ]).addTo(map);
      // 마커 찍기
      startLat = [-66.76418610020211, -3.1563612729905395, 6.101715139249571];
      startLng = [195.1874995976687, 212.4133301898837, 398.17382901906973];
      markerElevatorLocation = [-72.23652213869084, 300.72974050404264];

      markerElevator = L.marker(markerElevatorLocation, {
        icon: elevatorIcon,
      })
        .addTo(map)
        .bindPopup("엘리베이터입니다.")
        .openPopup();
      latlngsElevator = [
        [
          [startLat[0], startLng[0]],
          [-58.813741715707806, 133.59375000000003],
          [-46.55817421503483, 288.7606573104859],
          markerElevatorLocation,
        ],
      ];
      markerStart = L.marker([startLat[0], startLng[0]], {
        icon: startIcon,
      }).addTo(map);

      markerStart.bindTooltip("시작 지점을 선택해주세요", {
        className: "custom-tooltip", // 사용자 정의 클래스 이름 설정
        permanent: false, // 항상 툴팁을 표시할 것인지 여부 설정
        direction: "bottom", // 툴팁이 표시될 위치 설정
      });
      facilityArr = [];
      arriveLat = [
        -57.23150299147892, -53.2257684357902, -62.99515845212052,
        -44.27667127377517,
      ];
      arriveLng = [
        277.31249570846563, 252.21093535423282, 373.32421660423284,
        392.1503895521164,
      ];
      markersArrive = [
        {
          name: "경인문고",
          lat: arriveLat[0],
          lng: arriveLng[0],
          latlngs: [
            [startLat[0], startLng[0]],
            [-57.70361412444209, 157.5319601967931],
            [-63.704722429433225, 166.71093709766865],
            [-51.39920565355378, 280.2656245976687],
            [arriveLat[0], arriveLng[0]],
          ],
          icon: restaurantIcon,
          lineColor: "red",
          radius: 10,
          color: "red",
          message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
            data.find((item) => item.seatnum === 1)?.existence
          }`,
        },
        {
          name: "KT 로밍센터",
          lat: arriveLat[1],
          lng: arriveLng[1],
          latlngs: [
            [startLat[0], startLng[0]],
            [-57.70361412444209, 157.5319601967931],
            [-63.704722429433225, 166.71093709766865],
            [-51.39920565355378, 280.2656245976687],
            [arriveLat[0], arriveLng[0]],
          ],
          icon: restaurantIcon,
          lineColor: "red",
          radius: 10,
          color: "red",
          message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
            data.find((item) => item.seatnum === 1)?.existence
          }`,
        },
        {
          name: "항공 일자리 취업지원센터",
          lat: arriveLat[2],
          lng: arriveLng[2],
          latlngs: [
            [startLat[0], startLng[0]],
            [-57.70361412444209, 157.5319601967931],
            [-63.704722429433225, 166.71093709766865],
            [-51.39920565355378, 280.2656245976687],
            [arriveLat[0], arriveLng[0]],
          ],
          icon: restaurantIcon,
          lineColor: "red",
          radius: 10,
          color: "red",
          message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
            data.find((item) => item.seatnum === 1)?.existence
          }`,
        },
        {
          name: "퀴즈노스",
          lat: arriveLat[3],
          lng: arriveLng[3],
          latlngs: [
            [startLat[0], startLng[0]],
            [-57.70361412444209, 157.5319601967931],
            [-63.704722429433225, 166.71093709766865],
            [-51.39920565355378, 280.2656245976687],
            [arriveLat[0], arriveLng[0]],
          ],
          icon: restaurantIcon,
          lineColor: "red",
          radius: 10,
          color: "red",
          message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
            data.find((item) => item.seatnum === 1)?.existence
          }`,
        },
      ];
      markersArrive.forEach(function (marker: any) {
        var markers1 = L.marker([marker.lat, marker.lng], {
          icon: restaurantIcon,
        })
          .addTo(map)
          .bindPopup(marker.message)
          .openPopup();
        markers1.on("click", function (e: any) {
          console.log(marker.name);
          deleteLine();
          // 클릭한 마커의 좌표 가져오기
          var latlng = e.latlng;
          console.log(latlng);
          // 경로 이벤트 처리
          polyline = L.polyline(marker.latlngs, {
            color: marker.lineColor,
          }).addTo(map);
        });
        markers.push(markers1);
      });
    };
    // 4층 구현 함수
    var change4F = () => {
      console.log("4F");
      deleteMap();
      resetElement();
      overlay = L.imageOverlay(process.env.PUBLIC_URL + "/mapImg/map4F.svg", [
        [-100, 0],
        [90, 600],
      ]).addTo(map);
      // 마커 찍기
      startLat = [-77.38950127867194, -3.1563612729905395, 6.101715139249571];
      startLng = [131.6484323307451, 212.4133301898837, 398.17382901906973];

      markerElevatorLocation = [-63.705453916460854, 300.23437500000006];

      markerElevator = L.marker(markerElevatorLocation, {
        icon: elevatorIcon,
      })
        .addTo(map)
        .bindPopup("엘리베이터입니다.")
        .openPopup();
      latlngsElevator = [
        [
          [startLat[0], startLng[0]],
          [-68.14008034239306, 182.67360405520606],
          [-60.59020862556253, 226.48067418632067],
          [-53.958028775274414, 287.08431516937935],
          [-59.08743564886918, 287.08431516937935],
          markerElevatorLocation,
        ],
      ];
      markerStart = L.marker([startLat[0], startLng[0]], {
        icon: startIcon,
      }).addTo(map);

      markerStart.bindTooltip("시작 지점을 선택해주세요", {
        className: "custom-tooltip", // 사용자 정의 클래스 이름 설정
        permanent: false, // 항상 툴팁을 표시할 것인지 여부 설정
        direction: "bottom", // 툴팁이 표시될 위치 설정
      });
      facilityArr = [];
      arriveLat = [-70.61480674519025, -58.08136749288486, -57.13803146031117];
      arriveLng = [185.69858432549123, 275.6985369649181, 325.5804846962963];
      markersArrive = [
        {
          name: "우체국",
          lat: arriveLat[0],
          lng: arriveLng[0],
          latlngs: [
            [startLat[0], startLng[0]],
            [-68.14008034239306, 182.67360405520606],
            [arriveLat[0], arriveLng[0]],
          ],
          icon: restaurantIcon,
          lineColor: "red",
          radius: 10,
          color: "red",
          message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
            data.find((item) => item.seatnum === 1)?.existence
          }`,
        },
        {
          name: "안내데스크",
          lat: arriveLat[1],
          lng: arriveLng[1],
          latlngs: [
            [startLat[0], startLng[0]],
            [-68.14008034239306, 182.67360405520606],
            [-60.59020862556253, 226.48067418632067],
            [-55.080256068729156, 273.9046095583677],
            [arriveLat[1], arriveLng[1]],
          ],
          icon: restaurantIcon,
          lineColor: "red",
          radius: 10,
          color: "red",
          message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
            data.find((item) => item.seatnum === 1)?.existence
          }`,
        },
        {
          name: "KT 로밍센터",
          lat: arriveLat[2],
          lng: arriveLng[2],
          latlngs: [
            [startLat[0], startLng[0]],
            [-68.14008034239306, 182.67360405520606],
            [-60.59020862556253, 226.48067418632067],
            [-53.958028775274414, 287.08431516937935],
            [-59.08743564886918, 287.08431516937935],
            [-58.72431380640431, 313.10017381487324],
            [-53.75066367724298, 314.5064364443595],
            [-54.6239336899085, 325.65168887458094],
            [arriveLat[2], arriveLng[2]],
          ],
          icon: restaurantIcon,
          lineColor: "red",
          radius: 10,
          color: "red",
          message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
            data.find((item) => item.seatnum === 1)?.existence
          }`,
        },
      ];
      markersArrive.forEach(function (marker: any) {
        var markers1 = L.marker([marker.lat, marker.lng], {
          icon: restaurantIcon,
        })
          .addTo(map)
          .bindPopup(marker.message)
          .openPopup();
        markers1.on("click", function (e: any) {
          console.log(marker.name);
          deleteLine();
          // 클릭한 마커의 좌표 가져오기
          var latlng = e.latlng;
          console.log(latlng);
          // 경로 이벤트 처리
          polyline = L.polyline(marker.latlngs, {
            color: marker.lineColor,
          }).addTo(map);
        });
        markers.push(markers1);
      });
    };

    // 맵 변경 시 기존 맵, 마커, 경로 삭제
    const resetElement = () => {
      if (map2) {
        // Remove previous markers and elevator marker
        for (var i = 0; i < markers2.length; i++) {
          map.removeLayer(markers2[i]);
        }
        markers2 = [];
        map.removeLayer(markerElevator);

        // 마커 지우기
      }
      for (let i = 0; i < otherMarker.length; i++) {
        map.removeLayer(otherMarker[i]);
      }
      otherMarker = [];
      overlay.remove();
      markersArrive = [];
      markerStart.remove();
      markerElevator.remove();

      for (let i = 0; i < markers.length; i++) {
        markers[i].remove();
      }
      markers = [];
      for (let i = 0; i < facilitys.length; i++) {
        map.removeLayer(facilitys[i]);
      }
      facilitys = [];

      polyline.remove();
    };

    // 층 변경
    var customControlB1 = L.Control.extend({
      options: {
        position: "bottomleft",
      },

      onAdd: function () {
        var button = L.DomUtil.create(
          "button",
          "B1floor leaflet-bar leaflet-control leaflet-control-custom"
        );
        button.innerHTML = "B1";
        button.onclick = function () {
          changeB1();
        };
        return button;
      },
    });
    var customControl1F = L.Control.extend({
      options: {
        position: "bottomleft",
      },

      onAdd: function () {
        var button = L.DomUtil.create(
          "button",
          "first-floor leaflet-bar leaflet-control leaflet-control-custom"
        );
        button.innerHTML = "1F";
        button.onclick = function () {
          change1F();
        };
        return button;
      },
    });
    var customControl2F = L.Control.extend({
      options: {
        position: "bottomleft",
      },

      onAdd: function () {
        var button = L.DomUtil.create(
          "button",
          "second-floor leaflet-bar leaflet-control leaflet-control-custom"
        );
        button.innerHTML = "2F";
        button.onclick = function () {
          change2F();
        };
        return button;
      },
    });
    var customControl3F = L.Control.extend({
      options: {
        position: "bottomleft",
      },

      onAdd: function () {
        var button = L.DomUtil.create(
          "button",
          "third-floor leaflet-bar leaflet-control leaflet-control-custom"
        );
        button.innerHTML = "3F";
        button.onclick = function () {
          change3F();
        };
        return button;
      },
    });
    var customControl4F = L.Control.extend({
      options: {
        position: "bottomleft",
      },

      onAdd: function () {
        var button = L.DomUtil.create(
          "button",
          "fourth-floor leaflet-bar leaflet-control leaflet-control-custom"
        );
        button.innerHTML = "4F";
        button.onclick = function () {
          change4F();
        };
        return button;
      },
    });

    map.addControl(new customControlB1());
    map.addControl(new customControl1F());
    map.addControl(new customControl2F());
    map.addControl(new customControl3F());
    map.addControl(new customControl4F());

    //[-51.56325726112842, 851.7800080776215] -3.3, 501
    var otherLat;
    var otherLng;
    var markers2: any = [];
    var otherLatlngs: any;
    var otherArrive: any = [];

    var otherMarker: any = [];

    //다른 층 맵, 마커, 경로 삭제
    const resetOtherElement = () => {
      if (map2) {
        // Remove previous markers and elevator marker
        for (var i = 0; i < markers2.length; i++) {
          map.removeLayer(markers2[i]);
        }
        markers2 = [];
        map.removeLayer(markerElevator);
        for (i = 0; i < otherFacilitys.length; i++) {
          map.removeLayer(otherFacilitys[i]);
        }
      }
      for (let i = 0; i < otherMarker.length; i++) {
        map.removeLayer(otherMarker[i]);
      }
      otherMarker = [];
    };

    // 다른 층 생성
    const otherFloor = (floor: any) => {
      console.log(`OtherFloor ${floor}`);

      deleteMap();
      resetOtherElement();
      deleteLine();

      map2 = L.imageOverlay(`./mapImg/map${floor}.svg`, [
        [-100, 1100],
        [90, 600],
      ]).addTo(map);
      markerElevator = L.marker([otherElevator[0], otherElevator[1]], {
        icon: elevatorIcon,
      })
        .addTo(map)
        .bindPopup("엘리베이터입니다.")
        .openPopup();

      otherFacilitys = [];
      otherFacilityArr = [];

      // 경로 이벤트 처리
      if (floor === "B1") {
        facilityLat = [-52.48278022207821, -72.39570570653261];
        facilityLng = [273.33984375000006 + 550, 300.05859375000006 + 550];
        otherFacilityArr = [
          { name: "하나은행 영업점", lat: facilityLat[0], lng: facilityLng[0] },
          { name: "신한은행 영업점", lat: facilityLat[1], lng: facilityLng[1] },
        ];
        otherLat = [
          -78.34941069014627, -78.20656311074711, -51.39920565355378,
          -51.508742458803326,
        ];
        otherLng = [
          320.44921875000006 + 550,
          279.66796875000006 + 550,
          283.88671875000006 + 550,
          319.83398437500006 + 550,
        ];

        otherLatlngs = [
          [
            [otherElevator[0], otherElevator[1]],
            [otherLat[0], otherLng[0]],
          ],
          [
            [otherElevator[0], otherElevator[1]],
            [otherLat[1], otherLng[1]],
          ],
          [
            [otherElevator[0], otherElevator[1]],
            [otherLat[2], otherLng[2]],
          ],
          [
            [otherElevator[0], otherElevator[1]],
            [otherLat[3], otherLng[3]],
          ],
        ];
        otherArrive = [
          {
            name: "버거킹",
            lat: otherLat[0],
            lng: otherLng[0],
            latlngs: [
              [otherElevator[0], otherElevator[1]],
              [-72.39570570653261, 300.05859375000006 + 550],
              [otherLat[0], otherLng[0]],
            ],
            lineColor: "red",
            radius: 7,
            color: "red",
            icon: restaurantIcon,
            message:
              "이름 : 버거킹 <br> 운영시간 : 9:00 ~ 17:00 <br> 남은자리 : 3",
          },
          {
            name: "KFC",
            lat: otherLat[1],
            lng: otherLng[1],
            latlngs: [
              [otherElevator[0], otherElevator[1]],
              [-72.39570570653261, 300.05859375000006 + 550],
              [otherLat[1], otherLng[1]],
            ],
            lineColor: "red",
            radius: 7,
            color: "red",
            icon: restaurantIcon,
            message:
              "이름 : KFC <br> 운영시간 : 8:00 ~ 21:00 <br> 남은자리 : 3",
          },
          {
            name: "한찬",
            lat: otherLat[2],
            lng: otherLng[2],
            latlngs: [
              [otherElevator[0], otherElevator[1]],
              [otherLat[2], otherLng[2]],
            ],
            lineColor: "red",
            radius: 7,
            color: "red",
            icon: restaurantIcon,
            message:
              "이름 : 한찬 <br> 운영시간 : 12:00 ~ 20:00 <br> 남은자리 : 3",
          },
        ];
      } else if (floor === "1F") {
        facilityLat = [-58.904645703019995, -61.85614879566797];
        facilityLng = [219.99023437500003 + 550, 227.63671875000003 + 550];
        otherFacilityArr = [
          { name: "맘스터치", lat: facilityLat[0], lng: facilityLng[0] },
          { name: "스타벅스", lat: facilityLat[1], lng: facilityLng[1] },
        ];
        otherLat = [
          -50.0641917366591, -50.569282865582416, -40.780541431860314,
          -40.3130432088809,
        ];
        otherLng = [
          247.67578125000003 + 550,
          215.20019531250003 + 550,
          325.76660156250006 + 550,
          288.01757812500006 + 550,
        ];

        otherArrive = [
          {
            name: "안내데스크",
            lat: otherLat[0],
            lng: otherLng[0],
            latlngs: [
              [startLat[0], startLng[0]],
              [-46.07323062540835, 159.43359375],
              [-56.45200625824782, 177.60297954082492],
              [arriveLat[0], arriveLng[0]],
            ],
            lineColor: "red",
            radius: 10,
            color: "red",
            icon: informationIcon,
            message:
              "이름 : 안내데스크 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 6",
          },
          {
            name: "푸드가든",
            lat: otherLat[1],
            lng: otherLng[1],
            latlngs: [
              [startLat[0], startLng[0]],
              [-46.07323062540835, 159.43359375],
              [-56.45200625824782, 177.60297954082492],
              [arriveLat[1], arriveLng[1]],
            ],
            lineColor: "red",
            radius: 10,
            color: "black",
            icon: restaurantIcon,
            message:
              "이름 : 푸드가든 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 2",
          },
          {
            name: "무쿄쿠",
            lat: otherLat[2],
            lng: otherLng[2],
            latlngs: [
              [startLat[0], startLng[0]],
              [-46.07323062540835, 159.43359375],
              [-56.838594680443045, 179.20099139213565],
              [-42.409448780315834, 235.45099139213565],
              [-35.58829024019928, 282.4005603790284],
              [arriveLat[2], arriveLng[2]],
            ],
            lineColor: "red",
            radius: 10,
            color: "blue",
            icon: restaurantIcon,
            message:
              "이름 : 무쿄쿠 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 5",
          },
        ];
      } else if (floor === "2F") {
        otherFacilityArr = [];
        otherLat = [79.16920448247693, 73.16920448247693];
        otherLng = [795.4109292339116, 755.4109292339116];
        otherLatlngs = [
          [
            [otherElevator[0], otherElevator[1]],

            [otherLat[0], otherLng[0]],
          ],
          [
            [otherElevator[0], otherElevator[1]],
            [otherLat[1], otherLng[1]],
          ],
        ];
        otherLat = [
          -50.06355122737638, -61.07725022543949, -61.07725022543949,
          20.63301769573328,
        ];
        otherLng = [
          320.11363651603466 + 550,
          233.05397696793082 + 550,
          368.5813207179309 + 550,
          394.2214143276216 + 550,
        ];
        otherArrive = [
          {
            name: "우체국",
            lat: otherLat[0],
            lng: otherLng[0],
            latlngs: [
              [startLat[0], startLng[0]],
              [-57.70361412444209, 157.5319601967931],
              [-63.704722429433225, 166.71093709766865],
              [-51.39920565355378, 280.2656245976687],
              [arriveLat[0], arriveLng[0]],
            ],
            icon: postIcon,
            lineColor: "red",
            radius: 10,
            color: "red",
            message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
              data.filter((item) => item.seatnum === 1).length
            }`,
          },
          {
            name: "파스쿠찌",
            lat: otherLat[1],
            lng: otherLng[1],
            latlngs: [
              [startLat[0], startLng[0]],
              [-57.70361412444209, 157.5319601967931],
              [-63.704722429433225, 166.71093709766865],
              [-54.57206165565852, 250.1015616953373],
              [-58.99531118795094, 251.9648433476687],
              [arriveLat[1], arriveLng[1]],
            ],
            icon: restaurantIcon,
            lineColor: "red",
            radius: 10,
            color: "black",
            message: `이름 : 파스쿠찌 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
              data.find((item) => item.seatnum === 2)?.existence
            }`,
          },
          {
            name: "던킨 커피하우스",
            lat: otherLat[2],
            lng: otherLng[2],
            latlngs: [
              [startLat[0], startLng[0]],
              [-57.70361412444209, 157.5319601967931],
              [-63.860035895395306, 168.1874991953373],
              [-49.38237278700955, 227.24999919533735],
              [-46.0732306254083, 284.765625],
              [-51.508742458803326, 286.2421870976687],
              [-53.5403073915002, 352.33593709766865],
              [-58.99531118795094, 350.05078084766865],
              [arriveLat[2], arriveLng[2]],
            ],
            icon: restaurantIcon,
            lineColor: "red",
            radius: 10,
            color: "blue",
            message: `이름 : 던킨 커피하우스 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
              data.find((item) => item.seatnum === 3)?.existence
            }`,
          },
          {
            name: "전통문화 LED 미디어 월",
            lat: otherLat[3],
            lng: otherLng[3],
            latlngs: [
              [startLat[0], startLng[0]],
              [-57.70361412444209, 157.5319601967931],
              [-35.459857240239025, 227.4928976967931],
              [-24.20597957152906, 300.96946019679314],
              [-34.596220172379624, 382.8835226967932],
              [-5.7908968128719565, 395.2265620976687],
              [arriveLat[3], arriveLng[3]],
            ],
            icon: museumIcon,
            lineColor: "red",
            radius: 10,
            color: "blue",
            message: `이름 : 전통문화 LED 미디어 월 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
              data.find((item) => item.seatnum === 5)?.existence
            }`,
          },
        ];
      } else if (floor === "3F") {
        otherLat = [
          -57.23150299147892, -53.2257684357902, -62.99515845212052,
          -44.27667127377517,
        ];
        otherLng = [
          277.31249570846563 + 550,
          252.21093535423282 + 550,
          373.32421660423284 + 550,
          392.1503895521164 + 550,
        ];
        otherLatlngs = [
          [
            [otherElevator[0], otherElevator[1]],
            [otherLat[0], otherLng[0]],
          ],
          [
            [otherElevator[0], otherElevator[1]],
            [otherLat[1], otherLng[1]],
          ],
        ];
        otherArrive = [
          {
            name: "경인문고",
            lat: otherLat[0],
            lng: otherLng[0],
            latlngs: [
              [startLat[0], startLng[0]],
              [-57.70361412444209, 157.5319601967931],
              [-63.704722429433225, 166.71093709766865],
              [-51.39920565355378, 280.2656245976687],
              [arriveLat[0], arriveLng[0]],
            ],
            icon: restaurantIcon,
            lineColor: "red",
            radius: 10,
            color: "red",
            message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
              data.find((item) => item.seatnum === 1)?.existence
            }`,
          },
          {
            name: "KT 로밍센터",
            lat: otherLat[1],
            lng: otherLng[1],
            latlngs: [
              [startLat[0], startLng[0]],
              [-57.70361412444209, 157.5319601967931],
              [-63.704722429433225, 166.71093709766865],
              [-51.39920565355378, 280.2656245976687],
              [arriveLat[0], arriveLng[0]],
            ],
            icon: restaurantIcon,
            lineColor: "red",
            radius: 10,
            color: "red",
            message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
              data.find((item) => item.seatnum === 1)?.existence
            }`,
          },
          {
            name: "항공 일자리 취업지원센터",
            lat: otherLat[2],
            lng: otherLng[2],
            latlngs: [
              [startLat[0], startLng[0]],
              [-57.70361412444209, 157.5319601967931],
              [-63.704722429433225, 166.71093709766865],
              [-51.39920565355378, 280.2656245976687],
              [arriveLat[0], arriveLng[0]],
            ],
            icon: restaurantIcon,
            lineColor: "red",
            radius: 10,
            color: "red",
            message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
              data.find((item) => item.seatnum === 1)?.existence
            }`,
          },
          {
            name: "퀴즈노스",
            lat: otherLat[3],
            lng: otherLng[3],
            latlngs: [
              [startLat[0], startLng[0]],
              [-57.70361412444209, 157.5319601967931],
              [-63.704722429433225, 166.71093709766865],
              [-51.39920565355378, 280.2656245976687],
              [arriveLat[0], arriveLng[0]],
            ],
            icon: restaurantIcon,
            lineColor: "red",
            radius: 10,
            color: "red",
            message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
              data.find((item) => item.seatnum === 1)?.existence
            }`,
          },
        ];
      } else if (floor === "4F") {
        otherLat = [-70.61480674519025, -58.08136749288486, -57.13803146031117];
        otherLng = [
          185.69858432549123 + 550,
          275.6985369649181 + 550,
          325.5804846962963 + 550,
        ];
        otherLatlngs = [
          [
            [otherElevator[0], otherElevator[1]],
            [otherLat[0], otherLng[0]],
          ],
          [
            [otherElevator[0], otherElevator[1]],
            [otherLat[1], otherLng[1]],
          ],
        ];
        otherArrive = [
          {
            name: "우체국",
            lat: otherLat[0],
            lng: otherLng[0],
            latlngs: [
              [startLat[0], startLng[0]],
              [-68.14008034239306, 182.67360405520606],
              [arriveLat[0], arriveLng[0]],
            ],
            icon: restaurantIcon,
            lineColor: "red",
            radius: 10,
            color: "red",
            message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
              data.find((item) => item.seatnum === 1)?.existence
            }`,
          },
          {
            name: "안내데스크",
            lat: otherLat[1],
            lng: otherLng[1],
            latlngs: [
              [startLat[0], startLng[0]],
              [-68.14008034239306, 182.67360405520606],
              [-60.59020862556253, 226.48067418632067],
              [-55.080256068729156, 273.9046095583677],
              [arriveLat[1], arriveLng[1]],
            ],
            icon: restaurantIcon,
            lineColor: "red",
            radius: 10,
            color: "red",
            message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
              data.find((item) => item.seatnum === 1)?.existence
            }`,
          },
          {
            name: "KT 로밍센터",
            lat: otherLat[2],
            lng: otherLng[2],
            latlngs: [
              [startLat[0], startLng[0]],
              [-68.14008034239306, 182.67360405520606],
              [-60.59020862556253, 226.48067418632067],
              [-53.958028775274414, 287.08431516937935],
              [-59.08743564886918, 287.08431516937935],
              [-58.72431380640431, 313.10017381487324],
              [-53.75066367724298, 314.5064364443595],
              [-54.6239336899085, 325.65168887458094],
              [arriveLat[2], arriveLng[2]],
            ],
            icon: restaurantIcon,
            lineColor: "red",
            radius: 10,
            color: "red",
            message: `이름 : 우체국 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : ${
              data.find((item) => item.seatnum === 1)?.existence
            }`,
          },
        ];
        console.log(otherMarker);
      } else {
        console.log("잘못된 접근");
      }
      map.on("zoomend", function () {
        otherFacilityArr.forEach(function (facility: any) {
          var marker = L.circleMarker([facility.lat, facility.lng], {
            radius: 5,
            color: "black",
            fillColor: "#f03",
            fillOpacity: 0,
          }).addTo(map);

          marker.bindTooltip(facility.name, {
            className: "custom-tooltip",
            permanent: true,
            direction: "bottom",
          });

          otherFacilitys.push(marker);
        });
        if (map.getZoom() < 2) {
          // 일정 레벨 이하에서는 마커를 숨깁니다.
          for (var i = 0; i < otherFacilitys.length; i++) {
            otherFacilitys[i].closeTooltip();
          }
          for (i = 0; i < otherFacilitys.length; i++) {
            otherFacilitys[i].setStyle({ opacity: 0 });
          }
        } else {
          for (i = 0; i < otherFacilitys.length; i++) {
            otherFacilitys[i].openTooltip();
          }
          for (i = 0; i < otherFacilitys.length; i++) {
            otherFacilitys[i].setStyle({ opacity: 1 });
          }
        }
      });

      polyline = L.polyline(latlngsElevator[0], { color: "red" }).addTo(map);
      otherArrive.forEach(function (marker: any) {
        otherMarker = L.marker([marker.lat, marker.lng], {
          icon: marker.icon,
        })
          .addTo(map)
          .bindPopup(marker.message)
          .openPopup();
        otherMarker.on("click", function (e: any) {
          console.log(marker.name);
          deleteOtherLine();
          // 클릭한 마커의 좌표 가져오기
          var latlng = e.latlng;
          console.log(latlng);
          // 경로 이벤트 처리
          polyline2 = L.polyline(marker.latlngs, { color: "red" }).addTo(map);
        });

        markers2.push(otherMarker);
      });
    };
    //이전 경로 삭제 함수
    const deleteLine = () => {
      if (polyline) {
        map.removeLayer(polyline);
        polyline = L.polyline(latlngs0).addTo(map);
      }
    };

    const start1Select = () => {
      markerStart2.remove();
      markerStart3.remove();

      markersArrive = [
        {
          name: "버거킹",
          lat: arriveLat[0],
          lng: arriveLng[0],
          latlngs: [
            [startLat[0], startLng[0]],
            [-58.813741715707806, 133.59375000000003],
            [-49.38237278700955, 243.45703125000003],
            [-70.3800725582021, 257.9090083027673],
            [-74.21378075601139, 280.4095734722727],
            [arriveLat[0], arriveLng[0]],
          ],
          lineColor: "red",
          radius: 7,
          color: "red",
          icon: restaurantIcon,
          message:
            "이름 : 버거킹 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 1",
        },

        {
          name: "KFC",
          lat: arriveLat[1],
          lng: arriveLng[1],
          latlngs: [
            [startLat[0], startLng[0]],
            [-58.813741715707806, 133.59375000000003],
            [-49.38237278700955, 243.45703125000003],
            [-70.3800725582021, 257.9090083027673],
            [-74.21378075601139, 280.4095734722727],
            [arriveLat[1], arriveLng[1]],
          ],
          lineColor: "red",
          radius: 7,
          color: "black",
          icon: restaurantIcon,
          message: "이름 : KFC <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 2",
        },
        {
          name: "한찬",
          lat: arriveLat[2],
          lng: arriveLng[2],
          latlngs: [
            [startLat[0], startLng[0]],
            [-58.813741715707806, 133.59375000000003],
            [-66.37540324833978, 158.4162935217202],
            [-53.124369722213544, 222.75278671911116],
            [-46.31589503644567, 282.75213360786444],
            [arriveLat[2], arriveLng[2]],
          ],
          lineColor: "red",
          radius: 7,
          color: "blue",
          icon: restaurantIcon,
          message:
            "이름 : 한찬 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 3",
        },
        {
          name: "경양식당",
          lat: arriveLat[3],
          lng: arriveLng[3],
          latlngs: [
            [startLat[0], startLng[0]],
            [-58.813741715707806, 133.59375000000003],
            [-49.38237278700955, 243.45703125000003],
            [-46.31589503644567, 282.75213360786444],
            [-45.9534435838201, 299.81439538163033],
            [-46.77134258405013, 321.328125],
            [arriveLat[3], arriveLng[3]],
          ],
          lineColor: "red",
          radius: 7,
          color: "blue",
          icon: restaurantIcon,
          message:
            "이름 : 경양식당 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 4",
        },
      ];

      markersArrive.forEach(function (marker: any) {
        var markers1 = L.marker([marker.lat, marker.lng], {
          icon: marker.icon,
        })
          .addTo(map)
          .bindPopup(marker.message, { autoClose: true })
          .openPopup();
        markers1.on("click", function (e: any) {
          console.log(marker.name);
          deleteLine();
          // 클릭한 마커의 좌표 가져오기
          var latlng = e.latlng;
          console.log(latlng);
          // 경로 이벤트 처리
          polyline = L.polyline(marker.latlngs, {
            color: marker.lineColor,
          }).addTo(map);
        });
        markers.push(markers1);
      });
    };
    const start2Select = () => {
      markerStart.remove();
      markerStart3.remove();
      latlngsElevator = [
        [
          [startLat[1], startLng[1]],
          [-50.15437841505447, 228.62109415233138],
          [-46.29229768832926, 289.9687504023314],
          markerElevatorLocation,
        ],
      ];
      markersArrive = [
        {
          name: "버거킹",
          lat: arriveLat[0],
          lng: arriveLng[0],
          latlngs: [
            [startLat[1], startLng[1]],
            [-49.38237278700955, 243.45703125000003],
            [-78.4903525729843, 270.22372171282774],
            [arriveLat[0], arriveLng[0]],
          ],
          lineColor: "red",
          radius: 7,
          color: "red",
          icon: restaurantIcon,
          message:
            "이름 : 버거킹 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 3",
        },

        {
          name: "KFC",
          lat: arriveLat[1],
          lng: arriveLng[1],
          latlngs: [
            [startLat[1], startLng[1]],
            [-49.38237278700955, 243.45703125000003],
            [-78.4903525729843, 270.22372171282774],
            [arriveLat[1], arriveLng[1]],
          ],
          lineColor: "red",
          radius: 7,
          color: "black",
          icon: restaurantIcon,
          message: "이름 : KFC <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 3",
        },
        {
          name: "한찬",
          lat: arriveLat[2],
          lng: arriveLng[2],
          latlngs: [
            [startLat[1], startLng[1]],
            [-44.790413001518836, 220.28906330466273],
            [-49.38237278700955, 243.45703125000003],
            [-46.31589503644567, 282.75213360786444],
            [arriveLat[2], arriveLng[2]],
          ],
          lineColor: "red",
          radius: 7,
          color: "blue",
          icon: restaurantIcon,
          message:
            "이름 : 한찬 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 3",
        },
        {
          name: "경양식당",
          lat: arriveLat[3],
          lng: arriveLng[3],
          latlngs: [
            [startLat[1], startLng[1]],
            [-44.790413001518836, 220.28906330466273],
            [-49.38237278700955, 243.45703125000003],
            [-46.31589503644567, 282.75213360786444],
            [-46.77134258405013, 321.328125],
            [arriveLat[3], arriveLng[3]],
          ],
          lineColor: "red",
          radius: 7,
          color: "blue",
          icon: restaurantIcon,
          message:
            "이름 : 경양식당 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 3",
        },
      ];
      markersArrive.forEach(function (marker: any) {
        var markers1 = L.marker([marker.lat, marker.lng], {
          icon: marker.icon,
        })
          .addTo(map)
          .bindPopup(marker.message, { autoClose: true })
          .openPopup();
        markers1.on("click", function (e: any) {
          console.log(marker.name);
          deleteLine();
          // 클릭한 마커의 좌표 가져오기
          var latlng = e.latlng;
          console.log(latlng);
          // 경로 이벤트 처리
          polyline = L.polyline(marker.latlngs, {
            color: marker.lineColor,
          }).addTo(map);
        });
        markers.push(markers1);
      });
    };
    const start3Select = () => {
      markerStart.remove();
      markerStart2.remove();
      latlngsElevator = [
        [
          [startLat[2], startLng[2]],
          [-48.41170244004065, 371.46093830466276],
          [-46.41362426846384, 310.1835941523314],
          markerElevatorLocation,
        ],
      ];
      markersArrive = [
        {
          name: "버거킹",
          lat: arriveLat[0],
          lng: arriveLng[0],
          latlngs: [
            [startLat[0], startLng[0]],
            [-58.813741715707806, 133.59375000000003],
            [-49.38237278700955, 243.45703125000003],
            [-70.3800725582021, 257.9090083027673],
            [-74.21378075601139, 280.4095734722727],
            [arriveLat[0], arriveLng[0]],
          ],
          lineColor: "red",
          radius: 7,
          color: "red",
          icon: restaurantIcon,
          message:
            "이름 : 버거킹 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 1",
        },

        {
          name: "KFC",
          lat: arriveLat[1],
          lng: arriveLng[1],
          latlngs: [
            [startLat[0], startLng[0]],
            [-58.813741715707806, 133.59375000000003],
            [-49.38237278700955, 243.45703125000003],
            [-70.3800725582021, 257.9090083027673],
            [-74.21378075601139, 280.4095734722727],
            [arriveLat[1], arriveLng[1]],
          ],
          lineColor: "red",
          radius: 7,
          color: "black",
          icon: restaurantIcon,
          message: "이름 : KFC <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 2",
        },
        {
          name: "한찬",
          lat: arriveLat[2],
          lng: arriveLng[2],
          latlngs: [
            [startLat[0], startLng[0]],
            [-58.813741715707806, 133.59375000000003],
            [-66.37540324833978, 158.4162935217202],
            [-53.124369722213544, 222.75278671911116],
            [-46.31589503644567, 282.75213360786444],
            [arriveLat[2], arriveLng[2]],
          ],
          lineColor: "red",
          radius: 7,
          color: "blue",
          icon: restaurantIcon,
          message:
            "이름 : 한찬 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 3",
        },
        {
          name: "경양식당",
          lat: arriveLat[3],
          lng: arriveLng[3],
          latlngs: [
            [startLat[0], startLng[0]],
            [-58.813741715707806, 133.59375000000003],
            [-49.38237278700955, 243.45703125000003],
            [-46.31589503644567, 282.75213360786444],
            [-45.9534435838201, 299.81439538163033],
            [-46.77134258405013, 321.328125],
            [arriveLat[3], arriveLng[3]],
          ],
          lineColor: "red",
          radius: 7,
          color: "blue",
          icon: restaurantIcon,
          message:
            "이름 : 경양식당 <br> 운영시간 : 11:00 ~ 20:00 <br> 남은자리 : 4",
        },
      ];
      markersArrive.forEach(function (marker: any) {
        var markers1 = L.marker([marker.lat, marker.lng], {
          icon: marker.icon,
        })
          .addTo(map)
          .bindPopup(marker.message, { autoClose: true })
          .openPopup();
        markers1.on("click", function (e: any) {
          console.log(marker.name);
          deleteLine();
          // 클릭한 마커의 좌표 가져오기
          var latlng = e.latlng;
          console.log(latlng);
          // 경로 이벤트 처리
          polyline = L.polyline(marker.latlngs, {
            color: marker.lineColor,
          }).addTo(map);
        });
        markers.push(markers1);
      });
    };

    // 다른 층 경로 삭제
    const deleteOtherLine = () => {
      if (polyline2) {
        map.removeLayer(polyline2);
        polyline2 = L.polyline(latlngs0).addTo(map);
      }
    };
    // 다른 층을 눌렀을때 이전의 맵이 지워지는 함수
    const deleteMap = () => {
      if (map2) {
        map2.remove();
      }
      if (polyline2) {
        polyline2.remove();
      }
    };

    return () => {
      // 컴포넌트 언마운트 시 Leaflet 리소스 정리
      map.remove();
    };
  }, [data]);

  //리액트 컴포넌트 리턴
  return (
    <>
      <Helmet>
        <title>Air Map : : : Map</title>
      </Helmet>

      <ComponentsContainer>
        <MapBox>
          <div
            id="map"
            ref={mapRef}
            style={{ width: "700px", height: "390px" }}
          ></div>
          <MyComponent></MyComponent>
        </MapBox>
      </ComponentsContainer>
    </>
  );
}

export default Map;
