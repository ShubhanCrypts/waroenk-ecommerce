import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { postData } from "../../utils/fetchData";

const DetailProduct = (props) => {
  // const initialState = { name: "", email: "", password: "", cf_password: "" };

  const [product] = useState(props.product);

  const { state, dispatch } = useContext(DataContext);

  const produk = useState(props.product);

  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  // const [viewProductData, setViewProductData] = useState(props.product);

  useEffect(() => {
    setProductTitle(produk.title);
    setProductPrice(produk.price);
    setProductDescription(produk.description);
  });

  // const handleSubmit = async (e) => {
  //   console.log("testtt");
  //   e.preventDefault();

  //   dispatch({ type: "NOTIFY", payload: { loading: true } });

  //   const res = await postData("product", product);

  //   if (res.err)
  //     return dispatch({ type: "NOTIFY", payload: { error: res.err } });

  //   // return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  //   console.log(res);
  // };

  const handleSubmit = async (e) => {
    console.log("testtttttt");
    e.preventDefault();

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("viewProduct", product);

    console.log(res);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    // return console.log(res);
  };

  // useEffect((e) => (window.onload = handleSubmit.bind(this)));

  // <Button onClick={(e) => this.handleClick.bind(this)} />;

  // componentDidMount();
  // {
  //   window.addEventListener("load", handleSubmit);
  // }

  return (
    <div onClick={handleSubmit} className="row detail_page">
      <Head>
        <title>Detail Product</title>
      </Head>

      <div className="col-md-6">
        <img
          src={product.images[0].url}
          alt={product.images[0].url}
          className="d-block img-thumbnail rounded mt-4 w-100"
          style={{ height: "350px" }}
        />

        <div className="row mx-0" style={{ cursor: "pointer" }}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.url}
              className={`img-thumbnail rounded`}
              style={{ height: "80px", width: "20%" }}
              //   onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>

      <div className="col-md-6 mt-3">
        <h2 className="text-uppercase" name="productTitle">
          {product.title}
        </h2>
        <h5 className="text-danger">Rp {product.price}</h5>

        <div className="row mx-0 d-flex justify-content-between">
          {product.inStock > 0 ? (
            <h6 className="text-danger">Tersedia: {product.inStock}</h6>
          ) : (
            <h6 className="text-danger">Produk Habis</h6>
          )}

          <h6 className="text-danger">Terjual: {product.sold}</h6>
        </div>

        <div className="my-2">{product.description}</div>
        <div className="my-2">{product.content}</div>

        <button type="button" className="btn btn-dark d-block my-3 px-5">
          Buy
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  console.log(res);

  return {
    props: {
      product: res.product,
    },
  };
}

export default DetailProduct;
