import React from "react";
import { X } from "lucide-react";
import classes from "./EditQuestionPopup.module.css"; // Import custom CSS file

function EditQuestionPopup({ onClose }) {
  return (
    <div className={classes.popup__overlay}>
      <div className={classes.popup__container}>
        <button onClick={onClose} className={classes.close__button}>
          <X size={30} />
        </button>
        <div className={classes.popup__content}>
          <div className={classes.question__section}>
            <h2>Edit your question</h2>
            <form>
              <div className={classes.question__title}>
                <label for="name">Question title</label> <br />
                <hr />
                <textarea id="message"></textarea>
              </div>
              <div className={classes.post__answer__section}>
                <label for="email">Description</label>
                <hr />
                <textarea></textarea>
                <button className={classes.post__button}>Edit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditQuestionPopup;
