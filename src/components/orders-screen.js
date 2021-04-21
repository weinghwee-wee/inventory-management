import React, { useState, useEffect } from "react";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { CustomTooltip } from "./common";
import { AddOrderModal } from "./modals";
import { getOrders } from "../api";
import { formatDate } from "../utils";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </div>
  );
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  container: {
    height: "80%",
    width: "100%",
    display: "flex",
    background: "#DCEBF3",
    borderRadius: 5,
  },
}));

const OrderScreen = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [addOrderModal, setAddOrderModal] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { result: orders } = await getOrders();

    setOrders(orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.container}>
      <AddOrderModal visible={addOrderModal} setVisible={setAddOrderModal} />
      <CustomTooltip
        title="Add Order"
        onClick={() => {
          setAddOrderModal(true);
        }}
      />
      <TableContainer style={{ boxShadow: "none" }} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Location</StyledTableCell>
              <StyledTableCell align="center">Tel No</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Total (RM)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order.name}>
                <StyledTableCell component="th" scope="row">
                  {order.name}
                </StyledTableCell>
                <StyledTableCell align="center">{order.location}</StyledTableCell>
                <StyledTableCell align="center">{order.phoneNo}</StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(order.date)}
                </StyledTableCell>
                <StyledTableCell align="center">{order.status}</StyledTableCell>
                <StyledTableCell align="center">{order.total}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                style={{ width: "100%" }}
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderScreen;
