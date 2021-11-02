import Head from 'next/head';
import { useState } from 'react';
import { getData } from '../../utils/fetchData';

const DetailProduct = (props) => {
  const [product] = useState(props.product);
  return (
    <div className="row detail_page">
      <Head>
        <title>Detail Product</title>
      </Head>

      <div className="col-md-6">
        <img
          src={product.images[0].url}
          alt={product.images[0].url}
          className="d-block img-thumbnail rounded mt-4 w-100"
          style={{ height: '350px' }}
        />

        <div className="row mx-0" style={{ cursor: 'pointer' }}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.url}
              className={`img-thumbnail rounded`}
              style={{ height: '80px', width: '20%' }}
              //   onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>

      <div className="col-md-6 mt-3">
        <h2 className="text-uppercase">{product.title}</h2>
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
