
import useCart from "@/service/useCart";
import { formarCurrency } from "@/utils/formatCurrency"
import Image from "next/image"
import { MdOutlineArrowDropUp } from "react-icons/md";
import { MdOutlineArrowDropDown } from "react-icons/md";

export default function CartItem({product, index}){
    const { addItemCart, removeItemCart} = useCart();

    const plusQuantity = () =>{
        addItemCart.mutate({...product, quantity : product.quantity + 1})
    }

    const minusQuantity = () =>{
        if(product.quantity < 2){
            alert('상품갯수는 1보다 작을 수 없습니다.');
            return
        }
        addItemCart.mutate({...product, quantity : product.quantity - 1})
    }

    //아이템 삭제
    const itemDelete = ()=>{
        removeItemCart.mutate(product.id)
    } 
    return(
        <li>
            <p>{index}</p>
            <img src={product.image} alt={product.title}/>
            <p className="cartItemTitle" >상품명 : {product.title}</p>
            <p className="cartItemOpt"> 옵션 : {product.option}</p>
            <div className="cartItemColor">
                <p>컬러</p><span style={{backgroundColor : product.color}}></span>
            </div>
            <p className="cartItemPrice"> 가격 : {formarCurrency(product.price)}원</p>
            <div className="cartItemQu"> 
                <p>수량 : {product.quantity}개</p>
                <button on onClick={plusQuantity}><MdOutlineArrowDropUp /></button> 
                <button on onClick={minusQuantity}><MdOutlineArrowDropDown /></button> 
            </div>
            <button className="removeBtn" onClick={()=>itemDelete(product.id)}>삭제</button>            
        </li>
    )
}