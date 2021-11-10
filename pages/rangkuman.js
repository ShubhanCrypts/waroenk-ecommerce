import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import Cartlist from './Cartlist';
import { DataContext } from '../store/GlobalState';

const Rangkuman = () => {
    const { state, dispatch } = useContext(DataContext);
    const { cart, auth, orders } = state;
    const router = useRouter();
    const {
        query: { alamat, jumlah, payment, kurir},} = router;

    return (
    <div className='row mx-auto'>
        <div className='col-md-8 text-secondary table-responsive my-3'>
        <h2 className='text-uppercase'>Order Summary</h2>

        <div className="col-md-8">
            <div className="my-3 table-responsive">
                <table className="table-bordered  w-100"
                    style={{minWidth: '300px', cursor: 'pointer'}}>
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
                            <td className="p-2">{alamat}</td>
                        </tr>
                </table>

                <table className="table-bordered  w-100"
                    style={{minWidth: '300px', cursor: 'pointer'}}>
                    <thead className="bg-light font-weight-bold">
                    <tr>
                        <td className="p-2">TOTAL</td>
                        <td className="p-2">METODE PEMBAYARAN</td>
                        <td className="p-2">KURIR</td>
                    </tr>
                    </thead>
                        <tr>
                            <td className="p-2">{jumlah}</td>
                            <td className="p-2">{payment}</td>
                            <td className="p-2">{kurir}</td>
                        </tr>
                </table>
            </div>
            <Link href="/product">
                <a className='btn btn-dark my-3'>Pay</a>
                </Link>         
        </div>

      </div>
      </div>
    );

  };
  
  export default Rangkuman;
  