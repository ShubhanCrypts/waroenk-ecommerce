import { useRouter } from "next/router";

const Product = (props) => {
  const router = useRouter();

  // const [alamat, setAlamat] = useState(props.alamat);

  const {
    query: { alamat },
  } = router;

  return <div>{alamat}</div>;
};

// export async function getServerSideProps() {
//   return {
//     props: {
//       alamat: props.alamat,
//     },
//   };
// }

export default Product;
