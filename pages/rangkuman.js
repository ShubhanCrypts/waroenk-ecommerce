import Link from 'next/link';
import { useRouter } from 'next/router';
import CartItem from '../components/CartItem';


const Rangkuman = () => {
    const router = useRouter();
    const {
        query: { alamat, jumlah, cart},} = router;

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
                        <tr>
                            <td className="p-2">{cart}</td>
                        </tr>
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
                    </tr>
                    </thead>
                        <tr>
                            <td className="p-2">{jumlah}</td>
                            <td className="p-2">Metode</td>
                        </tr>
                </table>
            </div>
            <Link href="/product">
                <a className='btn btn-dark my-3'>
                Proses Pembayaran</a>
                </Link>         
        </div>

      </div>
      </div>
    );

  };
  
  export default Rangkuman;
  