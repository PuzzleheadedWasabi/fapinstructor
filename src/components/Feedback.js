import React from "react";
import PropTypes from "prop-types";
import RedditIcon from "images/reddit.svg";
import GitHubIcon from "images/github.svg";

const Feedback = ({ iconWidth }) => (
  <div style={{ display: "flex" }}>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.reddit.com/r/fapinstructor/"
    >
      <img
        style={{ width: iconWidth, marginRight: 10 }}
        alt="Reddit"
        src={RedditIcon}
      />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/thefapinstructor/fapinstructor"
    >
      <img
        style={{ width: iconWidth, marginRight: 10 }}
        alt="Github"
        src={GitHubIcon}
      />
    </a>
  </div>
);

Feedback.defaultProps = {
  iconWidth: 40
};

Feedback.propTypes = {
  iconWidth: PropTypes.number
};

export default Feedback;
