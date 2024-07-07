import { useQuery } from "react-query";
import { fetchDutyFreeShop } from "../api";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";

const Card = styled(motion.div)`
  margin: 20px 10px;
  padding: 20px;
  /* border: 2px black solid; */
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const ShopTitle = styled.div`
  font-size: 27px;
  margin-bottom: 30px;
`;

const Area = styled.div`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 5fr;
  line-height: 15px;
`;

const BoldText = styled.span`
  font-weight: 600;
  width: 70px;
  margin-right: 5px;
`;

const ContentsText = styled.span`
  display: block;
  width: 310px;
`;

interface IdutyFreeShop {
  response: {
    header: object;
    body: {
      numOfRows: number;
      pageNo: number;
      totalCount: number;
      items: [
        {
          sn: string;
          lcategorynm: string;
          mcategorynm: string;
          scategorynm: string;
          facilitynm: string;
          facilityitem: string;
          lcnm: string;
          terminalid: string;
          servicetime: string;
          tel: string;
          lcduty: string;
          floorinfo: string;
          arrordep: string;
          goods: string;
        }
      ];
    };
  };
}

const Post = styled(motion.div)`
  padding: 10px 0px 10px 0px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const postVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

function Shop() {
  const [page, setPage] = useState(1);
  const limit = 3;
  const offSet = (page - 1) * limit;
  const { isLoading, data } = useQuery<IdutyFreeShop>(
    "shops",
    fetchDutyFreeShop
  );

  const filterData = data?.response.body.items.filter(
    (item) => item.lcategorynm === "면세점쇼핑"
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <Post variants={postVariants} initial="start" animate="end">
            {filterData?.slice(offSet, offSet + limit).map((item) => (
              <Card variants={cardVariants} key={item.sn}>
                <ShopTitle>{item.facilitynm}</ShopTitle>
                <Area>
                  <BoldText>영업시간</BoldText>
                  <ContentsText>{item.servicetime}</ContentsText>
                </Area>
                <Area>
                  <BoldText>전화번호</BoldText>
                  <ContentsText>{item.tel}</ContentsText>
                </Area>
                <Area>
                  <BoldText>위치</BoldText>
                  <ContentsText>{item.lcnm}</ContentsText>
                </Area>
                {/* <Area>
                <BoldText>주요상품</BoldText>
                <ContentsText>{item.facilityitem}</ContentsText>
              </Area> */}
              </Card>
            ))}
            <Pagination
              page={page}
              onChange={(e, value) => {
                setPage(value);
              }}
              count={Math.ceil((filterData?.length ?? 1) / 3)}
            />
          </Post>
        )}
      </AnimatePresence>
    </>
  );
}
export default Shop;
