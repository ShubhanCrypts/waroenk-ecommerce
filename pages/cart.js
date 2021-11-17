import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';
import CartItem from '../components/CartItem';
import Link from 'next/link';
import { getData, postData } from '../utils/fetchData';
import { useRouter } from 'next/router';

const Cart = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders } = state;

  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);

  const [payment, setPayment] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [kurir, setKurir] = useState(""); //Mencatat nama kurir. Dikirimkan ke "/rangkuman"
  const [kurirPrice, setKurirPrice] = useState(""); //Mencatat biaya kurir. Digunakan di sini saja untuk menghitung harga total

  const [callback, setCallback] = useState(false);
  const router = useRouter();

  const [couriers, setCouriers] = useState(props.couriers);

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setPrice(value);
    setKurirPrice(value)
  };

  const handleChangePayment = (e) => {
    const { value } = e.target;
    setPayment(value)
  };

  const handleChangeCouriers = (e) => {
    const { value } = e.target;
    setKurir(value)
  };
  
  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
     
      setTotal(res);
    };

    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('__next__cart01__devat'));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          const { _id, title, images, price, inStock, sold } = res.product;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }

        dispatch({ type: 'ADD_CART', payload: newArr });
      };

      updateCart();
    }
  }, [callback]);

  // const handlePayment = async () => {
  //   if (!address || !mobile)
  //     return dispatch({
  //       type: 'NOTIFY',
  //       payload: { error: 'Please add your address and mobile.' },
  //     });

  //   let newCart = [];
  //   for (const item of cart) {
  //     const res = await getData(`product/${item._id}`);
  //     if (res.product.inStock - item.quantity >= 0) {
  //       newCart.push(item);
  //     }
  //   }

  //   if (newCart.length < cart.length) {
  //     setCallback(!callback);
  //     return dispatch({
  //       type: 'NOTIFY',
  //       payload: {
  //         error: 'The product is out of stock or the quantity is insufficient.',
  //       },
  //     });
  //   }

  //   dispatch({ type: 'NOTIFY', payload: { loading: true } });

  //   postData('order', { address, mobile, cart, total }, auth.token).then(
  //     (res) => {
  //       if (res.err)
  //         return dispatch({ type: 'NOTIFY', payload: { error: res.err } });

  //       dispatch({ type: 'ADD_CART', payload: [] });

  //       const newOrder = {
  //         ...res.newOrder,
  //         user: auth.user,
  //       };
  //       dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] });
  //       dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
  //       return router.push(`/order/${res.newOrder._id}`);
  //     }
  //   );
  // };

  if (cart.length === 0)
    return (
      <img
        className='img-responsive w-100'
        src='/empty_cart.jpg'
        alt='not empty'
      />
    );
  
    const handleClick = async () => {
      router.push({
        pathname: '/rangkuman',
        query: { alamat: address, jumlah: total+parseInt(price), payment: payment, kurir: kurir },
      });
    };

  return (
    <div className='row mx-auto'>
      <Head>
        <title>Cart Page</title>
      </Head>

      <div className='col-md-8 text-secondary table-responsive my-3'>
        <h2 className='text-uppercase'>Shopping Cart</h2>

        <table className='table my-3'>
          <tbody>
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                dispatch={dispatch}
                cart={cart}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className='col-md-4 my-3 text-right text-uppercase text-secondary'>
        <form>
          <h2>Pengiriman</h2>

          <label htmlFor='address'>Alamat</label>
          <input
            type='text'
            name='address'
            id='address'
            className='form-control mb-2'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="address">Pembayaran</label>
          <div>
            <select
              onChange = {handleChangePayment}
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              <option selected>Pilih Pembayaran</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="e-Wallet">e-Wallet</option>
              <option value="COD">COD</option>
            </select>
          </div>

          <label htmlFor="address">Kurir</label>
          <div>
            <select
              onChange={handleChangeCouriers}
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              <option selected value= "00" >Pilih Kurir</option>
              {couriers.map((courier) => (
                <option key={courier._id} value={courier.courier_name}>
                  {courier.courier_name}
                </option>
                
              ))}
            </select>
          </div>
        </form>
        

        <h3>

          Total: <span className="text-danger">Rp {total+parseInt(price)}</span>
        </h3>

        <Link href="/rangkuman">
          <a className="btn btn-dark my-2" onClick={handleClick}>

            Lanjut ke Pembayaran
          </a>
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await getData("courier");

  return {
    props: {
      couriers: res.couriers,
      result: res.result,
    },
  };
}

export default Cart;