import React from "react";
import { useSelector, useDispatch } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { hideModalAction } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    width: "40%",
    padding: 15,
  },
}));

const PopupModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    visible,
    title,
    content,
    cancel,
    onCancel,
    confirm,
    onConfirm,
  } = useSelector((state) => state.modal);

  const closeModal = () => {
    dispatch(hideModalAction());
  };

  return (
    <Dialog maxWidth="md" open={visible} classes={{ paper: classes.modal }}>
      <Card elevation={0}>
        <div style={{ padding: 10 }}>
          <Typography variant="h5">{title}</Typography>
        </div>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
        <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
          {cancel ? (
            <Button
              className={classes.closeButton}
              variant="contained"
              size="small"
              color="secondary"
              onClick={onCancel ? onCancel : closeModal}
            >
              {cancel}
            </Button>
          ) : null}
          {confirm ? (
            <Button
              className={classes.confirmButton}
              variant="contained"
              size="small"
              color="primary"
              onClick={() => {
                onConfirm();
                closeModal();
              }}
            >
              {confirm}
            </Button>
          ) : null}
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default PopupModal;
