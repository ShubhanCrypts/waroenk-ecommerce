import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { postData } from "../../utils/fetchData";

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const productViewData = product;

  // const handleSubmit = async (e) => {
  //   console.log("testtt");
  //   e.preventDefault();

  //   dispatch({ type: "NOTIFY", payload: { loading: true } });

  //   const res = await postData("product", productViewData);

  //   if (res.err)
  //     return dispatch({ type: "NOTIFY", payload: { error: res.err } });

  //   // return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  //   console.log(res);
  // };

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            View
          </a>
        </Link>

        <button
          className="btn btn-success"
          style={{ marginLeft: "5px", flex: 1 }}
          disabled={product.inStock === 0 ? true : false}
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Buy
        </button>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`create/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            Edit
          </a>
        </Link>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px", flex: 1 }}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: "",
                  id: product._id,
                  title: product.title,
                  type: "DELETE_PRODUCT",
                },
              ],
            })
          }
        >
          Delete
        </button>
      </>
    );
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={product.images[0].url}
        alt={product.images[0].url}
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize" title={product.title}>
          {product.title}
        </h5>

        <div className="row justify-content-between mx-0">
          <h6 className="text-danger">Rp{product.price}</h6>
          {product.inStock > 0 ? (
            <h6 className="text-danger">Tersedia: {product.inStock}</h6>
          ) : (
            <h6 className="text-danger">Habis</h6>
          )}
        </div>

        <p className="card-text" title={product.description}>
          {product.description}
        </p>

        <div className="row justify-content-between mx-0">
          {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
