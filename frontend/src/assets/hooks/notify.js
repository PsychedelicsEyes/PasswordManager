import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notify = (type, message) => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        default:
            toast(message);
            break;
    }
};

export default Notify;
