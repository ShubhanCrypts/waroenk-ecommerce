import Link from 'next/link';
import { decrease, increase } from '../store/Actions';

const Cartlist = ({ item, dispatch, cart }) => {
  return (
    <tr>
      <td style={{ minWidth: '200px' }} className="w-40 align-middle">
        <h5 className="text-capitalize text-secondary">
            <a>{item.title}</a>
        </h5>
      <h6 className="text-danger">X{item.quantity}</h6>
      </td>
    </tr>
  );
};

export default Cartlist;