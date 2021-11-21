import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { deleteProduct } from '../../../actions/action'

const DeleteOneProduct = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    useEffect(()=>{
        dispatch(deleteProduct(id));
        history.push('/admin/menu')
    },[dispatch,id,history])
    return <div>
        
    </div>
}

export default DeleteOneProduct
