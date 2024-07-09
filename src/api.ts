const SERVIECE_KEY = process.env.REACT_APP_API_KEY1;
const Shop_URL = `https://apis.data.go.kr/B551177/FacilitiesInformation/getFacilitesInfo?serviceKey=${SERVIECE_KEY}&numOfRows=30&pageNo=1&lang=K&lcduty=Y&facilitynm=%EB%A9%B4%EC%84%B8%EC%A0%90&type=json`
const Dine_URL = `https://apis.data.go.kr/B551177/FacilitiesInformation/getFacilitesInfo?serviceKey=${SERVIECE_KEY}&numOfRows=1000&pageNo=1&lang=K&lcduty=Y&type=json`;
const Posts = `http://localhost:4000/posts`;
const W_API_KEY = process.env.REACT_APP_W_API_KEY;
const lat = 37.44;
const lon = 126.45;
const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${W_API_KEY}`;

const today = new Date();
const hours = today.getHours();
const Arrival_URL = `https://apis.data.go.kr/B551177/StatusOfPassengerFlightsOdp/getPassengerArrivalsOdp?serviceKey=${SERVIECE_KEY}&from_time=${hours}00&to_time=${
  hours + 2 > 24 ? 24 : hours + 2
}00&lang=K&type=json`;
const Depart_URL = `https://apis.data.go.kr/B551177/StatusOfPassengerFlightsOdp/getPassengerDeparturesOdp?serviceKey=${SERVIECE_KEY}&from_time=${hours}00&to_time=${
  hours + 2 > 24 ? 24 : hours + 2
}00&lang=K&type=json`;

//출발
//https://apis.data.go.kr/B551177/StatusOfPassengerFlightsOdp/getPassengerDeparturesOdp?serviceKey=Q7brOzKKZnbYb5c6zs9pEckXI0s0NV9SDHIE6DetJ4UzgRxTjFVQFNKlMpYz87ygakxAXa5U41bOlwcvXrv8kA%3D%3D&from_time=0000&to_time=2400&lang=K&type=json
//도착
//https://apis.data.go.kr/B551177/StatusOfPassengerFlightsOdp/getPassengerArrivalsOdp?serviceKey=Q7brOzKKZnbYb5c6zs9pEckXI0s0NV9SDHIE6DetJ4UzgRxTjFVQFNKlMpYz87ygakxAXa5U41bOlwcvXrv8kA%3D%3D&from_time=0000&to_time=2400&lang=K&type=json
//https://api.openweathermap.org/data/2.5/weather?lat=37.44&lon=126.45&appid=2aafaa42d0c7467057b72d03f74da621
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=2aafaa42d0c7467057b72d03f74da621

export function fetchArrival() {
  return fetch(`${Arrival_URL}`).then((response) => response.json());
}

export function fetchDepart() {
  return fetch(`${Depart_URL}`).then((response) => response.json());
}

export function fetchWeather() {
  return fetch(`${weather}`).then((response) => response.json());
}

export function fetchDutyFreeShop() {
  return fetch(`${Shop_URL}`).then((response) => response.json());
}

export function fetchDine() {
  return fetch(`${Dine_URL}`).then((response) => response.json());
}

export function fetchPosts() {
  return fetch(`${Posts}`).then((response) => response.json());
}

export function makePosts(title: string, content: string) {
  //생성
  console.log("생성", title);
  return fetch(`${Posts}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
}

export function deletePosts(id: number) {
  //삭제
  console.log("삭제", id);
  return fetch(`${Posts}/${id}`, {
    method: "delete",
    body: JSON.stringify({
      req: {
        params: { id: id },
      },
    }),
  });
}
