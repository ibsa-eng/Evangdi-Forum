import classes from "./css/postAnswer.module.css";
import { IoArrowForwardCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios/axiosConfig";
import { useEffect, useState } from "react";

const PostAnswerPage = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [question, setQuestion] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answer = e.target.answer.value;

    try {
      await axiosInstance.post(`/answer`, {
        answer,
        questionId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Answer posted successfully");
      e.target.answer.value = "";
      navigate("/");
    } catch (err) {
      setError("Failed to post answer. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/questions/${questionId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setQuestion(response.data);
      } catch (error) {
        setError("Failed to fetch question. Please try again.");
        console.error(error);
      }
    };
    fetchData();
  }, [questionId]);

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
              <h1>{question.title}</h1>
            </div>
            <div className={classes.underline}></div>
            <div className={classes.content_container}>
              {question.content }
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h3 className={classes.postTitle}>Answer From The Community</h3>
      <hr />
      {error && <div className={classes.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          name="answer"
          className={classes.textarea}
          placeholder="Your answer ..."
        />
        <button className={classes.button} type="submit">
          Post Answer
        </button>
      </form>
    </div>
  );
};

export default PostAnswerPage;
