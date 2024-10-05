import React from "react";
import classes from "./QuestionCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import items from "./mockData";

function QuestionCard() {
  return (
    // ITEM WILL BE REPLACED BY THE DATA FROM DB
    <div className={classes.page__container}>
      <div className={classes.question__header}>
        <button className={classes.ask__button}>Ask Question</button>
        <p className={classes.welcome__text}>
          Welcome: <span className={classes.username}>Mikiyas</span>
        </p>
      </div>

      <div className={classes.search__bar}>
        <input
          value={searchTerm}
          onChange={handleSearch}
          type="text"
          placeholder="search question"
        />
      </div>
      {/* Question lists */}
      {items.map((item) => {
        return (
          <div className={classes.question__container}>
            <div className={classes.user__and__question}>
              <div className={classes.user__info}>
                <div className={classes.user__icon}>
                  {/* user icon */}
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className={classes.user__email}>{item?.userEmail}</div>
              </div>
              <div className={classes.user__question}>{item?.text}</div>
            </div>

            <div>
              {/* Arrow */}
              <MdOutlineKeyboardArrowRight
                className={classes.bold__arrow}
                size={50}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default QuestionCard;
