import {ReactComponent as BuyIcon} from '../../assets/shopping-cart-buy.svg'
import {ReactComponent as RemoveIcon} from '../../assets/shopping-cart-remove.svg'
import { buyProduct, removeProduct } from '../../services/product-service'
import {toast} from 'react-toastify';

function ShoppingCartItem(props){
    const {name,cost,imgUrl,isBought, _id, setRefreshProducts} = props
    const inlineStyles = {
        textDecoration: isBought ? 'line-through' : 'none'
    }

    const handelBuyItem = ()=>{
        buyProduct(_id).then(()=>{
                setRefreshProducts({});
                toast(`Bought ${name}!`,{type: 'info',autoClose: 1000});
        })
        .catch(()=>{
            toast('Something went wrong!' ,{type: 'error',autoClose: 1000});
        })
       
    }
    const handelRemoveItem = ()=>{
        removeProduct(_id).then(()=>{
            setRefreshProducts({});
            toast(`Delete ${name}!`,{type: 'warning',autoClose: 1000});
    })
    .catch(()=>{
        toast('Something went wrong!' ,{type: 'error',autoClose: 1000});
    })
    }


    return (
        <article style={inlineStyles} className="shopping-cart__item-container">
        <img className="shopping-cart__item-img" src={imgUrl} alt="Item image"/>
        <p className="shopping-cart__item-name">{name}</p>
        <p className="shopping-cart__item-cost">{cost.toFixed(2)}</p>
        <div className="shopping-cart__item-actions">
        {
                !isBought &&(
                    <button onClick={handelBuyItem} className="shopping-cart__item--buy-btn">
           
                    <span>Buy</span>
                     <BuyIcon/>
                 
                  </button>
                )
            }
          
           <button onClick={handelRemoveItem} className="shopping-cart__item--remove-btn">
              <span>Remove</span>
            <RemoveIcon/>
           </button>
        </div>
     </article>
    )
}
export default ShoppingCartItem;