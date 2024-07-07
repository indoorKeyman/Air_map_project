import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { deletePosts, fetchPosts } from "../api";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Banner from "../components/Banner";

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 480px;
`;

const Post = styled(motion.div)`
  padding: 40px 0px 40px 0px;
  width: 100vh;
  background-color: rgba(217, 217, 217, 0.5);
  border-radius: 40px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled(motion.div)`
  padding-left: 20px;
  margin-bottom: 10px;
  width: 80%;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  z-index: 6;
  width: 100%;
  height: 100%;
  top: 0.1px;
  left: 0.1px;
  position: absolute;
  display: flex;
  justify-content: center;
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
      type: "spring",
      duration: 1,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
      delay: 1,
    },
  },
};

const IdBox = styled.div`
  margin: auto 0px;
  font-size: 20px;
`;

const TitleBox = styled.div`
  margin: 0px 20px;
  font-size: 16px;
`;

const DateBox = styled.div`
  margin: 0px 20px;
  font-size: 16px;
`;

const DetailBox = styled(motion.div)`
  z-index: 7;
  padding: 30px 20px;
  width: 80%;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const DetailHead = styled.div`
  display: flex;
  margin-top: 30px;
  height: 60px;
  width: 80%;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 20px;
  border-bottom: 1px gray solid;
`;

const DetailIdBox = styled.div`
  font-size: 25px;
  font-weight: bold;
  width: 80px;
  text-align: center;
`;

const DetailTitleBox = styled.div`
  margin-left: 50px;
  font-size: 30px;
  width: 170px;
  text-align: center;
`;

const DetailDateBox = styled.div`
  margin-left: 50px;
  margin-right: 40px;
  font-size: 18px;
  width: 100px;
  text-align: center;
`;

const DeleteBtn = styled.div`
  width: 40px;
  height: 30px;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3a3b3c;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.06);
  color: ${(props) => props.theme.mainTextColor};
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #2c8989;
  }
`;

const UpdateBtn = styled.div`
  width: 40px;
  height: 30px;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3a3b3c;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.06);
  color: ${(props) => props.theme.mainTextColor};
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #2c8989;
  }
`;

const DetailContentWrapper = styled.div`
  display: flex;
  width: 600px;
  justify-content: start;
  font-size: 12px;
`;

const DetailContentBox = styled.span`
  margin: auto 0px;
  padding: 30px 0px;
  padding-top: 50px;
  font-size: 18px;
  width: auto;
  height: 400px;
  display: flex;
  justify-content: start;
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
`;

const WriteBtn = styled(motion.div)`
  z-index: 5;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 480px;
  height: 45px;
  font-size: 12px;
  font-weight: 400;
  background-color: #3a3b3c;
  padding: 7px 0px;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.06);
  color: ${(props) => props.theme.mainTextColor};
  transition: background-color 0.2s ease-in;
  cursor: pointer;

  &:hover {
    background-color: #2c8989;
  }
`;

const WriteBtnWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 8px;
  margin-bottom: 24px;
`;

const writeBtnVariants = {
  start: {
    opacity: 0,
    x: 30,
  },
  end: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 2,
      delay: 1.4,
    },
  },
};

const boxVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.2,
    },
  },
};

interface Iposts {
  id: number;
  title: string;
  content: string;
  enrollment_date: string;
}

interface Iposts extends Array<Iposts> {}

function Commu() {
  const [id, setId] = useState<null | number>(null);
  const { isLoading, data } = useQuery<Iposts>("posts", fetchPosts);
  console.log(data);

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Air Map : : : Community</title>
      </Helmet>

      <Outer>
        <Banner />
        <WriteBtnWrapper>
          <WriteBtn
            variants={writeBtnVariants}
            initial="start"
            animate="end"
            onClick={() => navigate("/makeposts")}
          >
            글쓰기
          </WriteBtn>
        </WriteBtnWrapper>
        <Wrapper>
          <Post variants={postVariants} initial="start" animate="end">
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              data?.map((n, index) => (
                <Box
                  variants={boxVariants}
                  onClick={() => {
                    setId(index);
                  }}
                  key={index}
                  layoutId={index + ""}
                >
                  <IdBox>{n.id}</IdBox>
                  <TitleBox>{n.title}</TitleBox>
                  <DateBox>{n.enrollment_date.substring(0, 10)}</DateBox>
                </Box>
              ))
            )}
          </Post>

          <AnimatePresence>
            {id ? (
              <Overlay
                onClick={() => setId(null)}
                initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
              >
                <DetailBox
                  layoutId={id + ""}
                  style={{ width: 800, height: 500 }}
                >
                  <DetailHead>
                    <DetailIdBox>No.{data ? data[id].id : "NULL"}</DetailIdBox>
                    <DetailTitleBox>
                      {data ? data[id].title : "NULL"}
                    </DetailTitleBox>
                    <DetailDateBox>
                      {data
                        ? data[id].enrollment_date.substring(0, 10)
                        : "NULL"}
                    </DetailDateBox>
                    <UpdateBtn>
                      <FaEdit size="18" />
                    </UpdateBtn>
                    <DeleteBtn
                      onClick={() => {
                        deletePosts(data ? data[id].id : 0);
                        window.location.replace("/commu");
                      }}
                    >
                      <FaTrash size="18" />
                    </DeleteBtn>
                  </DetailHead>
                  <DetailContentWrapper>
                    <DetailContentBox>
                      {data ? data[id].content : "NULL"}
                    </DetailContentBox>
                  </DetailContentWrapper>
                </DetailBox>
              </Overlay>
            ) : null}
          </AnimatePresence>
        </Wrapper>
      </Outer>
    </>
  );
}

export default Commu;
