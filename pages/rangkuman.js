import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import Cartlist from "./Cartlist";
import { DataContext } from "../store/GlobalState";
import { getData, postData } from "../utils/fetchData";

const Rangkuman = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders } = state;
  const router = useRouter();
  const {
    query: { address, total, payment, kurir },
  } = router;

  const handlePayment = async () => {
    if (!address)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add your address and mobile." },
      });

    let newCart = [];
    for (const item of cart) {
      const res = await getData(`product/${item._id}`);
      if (res.product.inStock - item.quantity >= 0) {
        newCart.push(item);
      }
    }

    if (newCart.length < cart.length) {
      setCallback(!callback);
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "The product is out of stock or the quantity is insufficient.",
        },
      });
    }

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    postData("order", { address, cart, total, payment }, auth.token).then(
      (res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });

        dispatch({ type: "ADD_CART", payload: [] });

        const newOrder = {
          ...res.newOrder,
          user: auth.user,
        };
        dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] });
        dispatch({ type: "NOTIFY", payload: { success: res.msg } });
        // return router.push(`/order/${res.newOrder._id}`);
      }
    );
  };

  return (
    <div className="row mx-auto">
      <div className="col-md-8 text-secondary table-responsive my-3">
        <h2 className="text-uppercase">Order Summary</h2>

        <div className="col-md-8">
          <div className="my-3 table-responsive">
            <table
              className="table-bordered  w-100"
              style={{ minWidth: "300px", cursor: "pointer" }}
            >
              <thead className="bg-light font-weight-bold">
                <tr>
                  <td className="p-2">PESANAN</td>
                </tr>
              </thead>
              {cart.map((item) => (
                <Cartlist
                  key={item._id}
                  item={item}
                  dispatch={dispatch}
                  cart={cart}
                />
              ))}
              <thead className="bg-light font-weight-bold">
                <tr>
                  <td className="p-2">ALAMAT</td>
                </tr>
              </thead>
              <tr>
                <td className="p-2">{address}</td>
              </tr>
            </table>

            <table
              className="table-bordered  w-100"
              style={{ minWidth: "300px", cursor: "pointer" }}
            >
              <thead className="bg-light font-weight-bold">
                <tr>
                  <td className="p-2">TOTAL</td>
                  <td className="p-2">METODE PEMBAYARAN</td>
                  <td className="p-2">KURIR</td>
                </tr>
              </thead>
              <tr>
                <td className="p-2">{total}</td>
                <td className="p-2">{payment}</td>
                <td className="p-2">{kurir}</td>
              </tr>
            </table>
          </div>
          <Link href="/product">
            <a className="btn btn-dark my-3" onClick={handlePayment}>
              Pay
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rangkuman;
