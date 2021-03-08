import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: "absolute",
    right: 15,
    bottom: 10,
  },
}));

const CustomTooltip = ({ title, onClick }) => {
  const classes = useStyles();

  return (
    <Tooltip
      title={title}
      onClick={() => {
        onClick(true);
      }}
    >
      <Fab color="primary" className={classes.absolute}>
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default CustomTooltip;
