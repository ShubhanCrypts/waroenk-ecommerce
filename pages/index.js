import { getData } from "../utils/fetchData";
import { useState } from "react";

const Home = (props) => {
  const [products, setProducts] = useState(props.products);

  console.log(products);

  return <div>Home</div>;
};

export async function getServerSideProps() {
  const res = await getData("product");
  console.log(res);

  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}

export default Home;
