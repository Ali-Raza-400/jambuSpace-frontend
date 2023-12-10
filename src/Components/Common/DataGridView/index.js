import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { BsCheckCircle } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { STATUS } from "../../utils/contants";
import { BASE_URL } from "../../utils/contants";
import { useState } from "react";
import axios from "axios";
import { Box } from '@mui/material'
import OrderDescription from "../orderDescription";
const currentUser = localStorage.getItem("userType");
const isSeller = localStorage.getItem("userType") === "seller" ? true : false;
const Icons = {
  PLACED: (
    <>
      <Button
        variant="outlined"
        color="success"
        endIcon={<BsCheckCircle color="green" />}
        style={{
          marginRight: "15px",
        }}
      >
        APPROVE
      </Button>

      <Button
        variant="outlined"
        color="error"
        endIcon={<ImCancelCircle color="red" />}
      >
        CANCEL
      </Button></>
  ),
  COMPLETED: (
    <>
      <Button
        variant="outlined"
        color="success"
        style={{
          marginRight: "15px",
        }}
      >
        View Order
      </Button>
    </>
  ),
  CANCELED: (
    <>
      <Button
        variant="outlined"
        color="success"
        style={{
          marginRight: "15px",
        }}
      >
        View Order
      </Button>
    </>
  ),
  STARTED: (
    <>
      <Button>Placed</Button>
      <Button>ACasfas</Button>
    </>
  ),
  PENDING: (
    <>
      <Button>Placed</Button>
      <Button>ACasfas</Button>
    </>
  ),
  DELIVERED: (
    <>
      <Button>Placed</Button>
      <Button>ACasfas</Button>
    </>
  ),
  REVISIONS: (
    <>
      <Button>Placed</Button>
      <Button>ACasfas</Button>
    </>
  ),
};
const columns = [
  {
    field: !isSeller ? "seller" : "buyer",
    headerName: !isSeller ? "Seller" : "Buyer",
    flex: 1,
  },
  { field: "gig", headerName: "Gig", flex: 1 },
  { field: "duration", headerName: "Duration", flex: 1 },
  { field: "status", headerName: "Status" },
  { field: "budget", headerName: "Budget" },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    renderCell: (params) => {
      switch (params.row.status) {
        case STATUS.PLACED:
          return (
            <Box>
              {
                isSeller ? <Button
                  variant="outlined"
                  color="success"
                  style={{
                    marginRight: "15px",
                  }}
                >
                  View Order
                </Button> : <><Button
                  variant="outlined"
                  color="success"
                  endIcon={<BsCheckCircle color="green" />}
                  style={{
                    marginRight: "15px",
                  }}
                >
                  APPROVE
                </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    endIcon={<ImCancelCircle color="red" />}
                  >
                    CANCEL
                  </Button></>
              }

            </Box>
          );
        case STATUS.COMPLETED:
          return (
            <>
              <Button
                variant="outlined"
                color="success"
                style={{
                  marginRight: "15px",
                }}
              >
                View Order
              </Button>
            </>
          );
        case STATUS.CANCELED:
          return (
            <>
              <Button
                variant="outlined"
                color="warning"
                style={{
                  marginRight: "15px",
                }}
              >
                View Order
              </Button>
            </>
          );
        default:
          return (
            <>
              <Button
                variant="outlined"
                color="warning"
                style={{
                  marginRight: "15px",
                }}
              >
                View Order
              </Button>
            </>
          );
      }
    },
  },
];
const DataGridView = ({ rows }) => {
  const [showOrderDescModal, setShowOpenDescModal] = useState(false)
  const [orderID, setOrderID] = useState("")
  const handlePlaceOrderClick = (helo) => {
    setOrderID(helo.id)
    console.log("param", helo);
    setShowOpenDescModal(true)
  }
  const handleCloseOrderDetail = () => {
    setShowOpenDescModal(false)
  }
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{
          height: "400px",
          justifyContent: "center",
          textAlign: "center",
          margin: "auto",
        }}
        onRowClick={(param) => handlePlaceOrderClick(param.row)}

      />
      <OrderDescription handlePlaceOrderClick={handlePlaceOrderClick} setShowOpenDescModal={setShowOpenDescModal} showOrderDescModal={showOrderDescModal} handleCloseOrderDetail={handleCloseOrderDetail} orderID={orderID} />
    </>
  );
};
DataGridView.defaultProps = {
  rows: [],
};
export default DataGridView;