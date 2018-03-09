import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";

const Group = ({ title, children }) => (
  <div style={{ marginBottom: 30 }}>
    <div style={{ marginBottom: 15 }}>
      <Typography variant="title" color="primary">
        {title}
      </Typography>
    </div>
    <div>{children}</div>
  </div>
);

Group.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Group;
