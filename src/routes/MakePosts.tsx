import { useForm } from "react-hook-form";
import styled from "styled-components";
import { makePosts } from "../api";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  width: 800px;
  height: 500px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const MPHead = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Title = styled.div`
  display: flex;
  width: 700px;
  height: 28px;
`;

const TitleH = styled.span`
  margin-right: 10px;
  text-align: center;
`;
const TitleC = styled.span`
  margin-right: 10px;
`;

const TitleInput = styled.input`
  width: 85%;
  border: 2px black solid;
  border-radius: 8px;
  padding-left: 20px;
`;

const TitleE = styled.span`
  font-size: 20px;
  display: flex;
  align-content: center;
  margin-left: 90px;
  margin-top: 10px;
  color: red;
`;

const MPBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  width: 700px;
  height: 300px;
`;

const ContentH = styled.span`
  margin-right: 10px;
  text-align: center;
`;
const ContentC = styled.span`
  margin-right: 10px;
`;

const ContentInput = styled.textarea`
  width: 85%;
  border: 2px black solid;
  border-radius: 8px;
  padding-left: 20px;
  padding-top: 10px;
`;

const ContentE = styled.span`
  font-size: 20px;
  display: flex;
  align-content: center;
  margin-left: 20px;
  margin-top: 10px;
  color: red;
`;

const SaveBtn = styled.button`
  width: 70px;
  height: 45px;
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
  cursor: pointer;
`;

interface FormData {
  title: string;
  content: string;
  errors: {
    title: {
      message: string;
    };
    content: { message: string };
  };
}

interface Data {
  title: string;
  content: string;
}

function MakePosts() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onValid = (data: Data) => {
    makePosts(data.title, data.content);
    navigate("/commu");
  };

  console.log(errors);

  return (
    <>
      <Form onSubmit={handleSubmit(onValid)}>
        <MPHead>
          <Title>
            <TitleH>제목</TitleH>
            <TitleC> : </TitleC>

            <TitleInput
              {...register("title", {
                required: "제목을 입력하세요.",
                minLength: { value: 3, message: "제목이 너무 짧아요." },
                maxLength: { value: 10, message: "제목이 너무 깁니다." },
              })}
            ></TitleInput>
          </Title>
          <TitleE>{errors.title?.message}</TitleE>
        </MPHead>
        <MPBody>
          <Content>
            <ContentH>내용</ContentH>
            <ContentC> : </ContentC>
            <ContentInput
              {...register("content", {
                required: "내용을 입력하세요.",
                minLength: { value: 3, message: "내용이 너무 짧아요." },
                maxLength: { value: 10, message: "내용이 너무 깁니다." },
              })}
            />
            <ContentE>{errors.content?.message}</ContentE>
          </Content>
        </MPBody>
        <SaveBtn>게시하기</SaveBtn>
      </Form>
    </>
  );
}

export default MakePosts;
