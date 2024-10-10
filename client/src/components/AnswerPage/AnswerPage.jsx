import { useEffect, useState } from "react";
import classes from "./css/postAnswer.module.css";
import { IoArrowForwardCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios/axiosConfig";
import AnswerCard from "../AnswerCard/AnswerCard";
const AnswerPage = () => {
  const { question_id } = useParams();
  const [question, setQuestion] = useState(null);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [spine, setSpine] = useState();

  const title = question?.title;
  const content = question?.content;

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`questions/${question_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuestion(response.data);
    } catch (error) {
      console.error("Error fetching the question:", error);
      alert("Failed to load question. Please try again later.");
    }
    try {
      const response = await axiosInstance.get(
        `answer/${question_id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAnswers(response.data.answers);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const answer = e.target.answer.value;
      await axiosInstance.post(
        "/answer",
        { answer, question_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

    
      fetchData();

      e.target.answer.value = "";
    } catch (error) {
      alert("Something went wrong, please try again later");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [question_id]);

  return (
    <div className={classes.postPageContainer}>
      <div className={classes.steps}>
        <h2>QUESTION</h2>

        <div className={classes.flex_container}>
          <div className={classes.icon_container}>
            <IoArrowForwardCircle color={"#516CEF"} size={34} />
          </div>
          <div>
            <div className={classes.title}>
              <h1>{title || "Loading..."}</h1>
            </div>

            <div className={classes.underline}></div>
            <div className={classes.content_container}>
              {content || "Loading..."}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h3 className={classes.postTitle}>Answer From The Community</h3>
      <hr />
      <div>
        {answers?.map((answer) => <AnswerCard answer={answer} />) ||
          "Loading..."}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="answer"
          className={classes.textarea}
          placeholder="Your answer ..."
          required
        />
        <button className={classes.button} type="submit">
          Post Answer
        </button>
      </form>
    </div>
  );
};

export default AnswerPage;
