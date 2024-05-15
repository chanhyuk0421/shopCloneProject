"use client"
import { getProductId, googleLogin } from "@/api/api";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { formarCurrency } from "@/utils/formatCurrency";
import { useAuthContext } from "@/context/authContext";
import useCart from "@/service/useCart";


export default function ProductDetailPage(){
    const { addItemCart } = useCart(); //
    const { user } = useAuthContext();

    const pathNanme = usePathname(); // 현재 경로의 주소    
    const id = pathNanme.split('/').pop()

    const [product, setProduct] = useState(null);

    const [selected, setSelected] = useState();
    const [selectedColor, setSelectedColor] = useState();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
  
    useEffect(() =>{
        if(!id){
            setError('제품 정보를 찾을 수 없습니다.')
            setIsLoading(false)
            return
        }
        const fetchData = async () => {
            try{
                const data = await getProductId(id);
                
                if(data){
                    setProduct(data)
                }else{
                    setError('제품이 없습니다')
                }                
                
            }catch(error){
                console.error(error)
            }finally{
                setIsLoading(false)
            }                
        }
        fetchData();

    },[id])

    const selectOpt =(e)=>{
        // console.log(selected)
        setSelected(e.target.value)         
    }

    const selectColor = (color)=>{        
        setSelectedColor(color)
    }

    const handleActionClick = (type) =>{
        if(!user){
            alert('로그인이 필요합니다.')
            googleLogin()
            return           
        }        
        if(!selectedColor || !selected){
            alert('옵션이 선택되지 않았습니다.')
            return
        }

        if(type === '장바구니'){
            const productToAdd = {
                id: product.id,
                title: product.title,
                price: product.price,
                image : product.image,
                option: selected,
                color : selectedColor,
                quantity : 1
            }

            addItemCart.mutate(productToAdd,{
                onSuccess : ()=>{
                    alert('장바구니에 추가되었습니다')
                },
                onError : (error) =>{
                    alert('장바구니 추가에 실패했습니다.') 
                    console.error(error)               
                }
            })
            
        }

    }

    if(isLoading) return <p>로딩중입니다.</p>
    if(error) return <p>{error}</p>
    if(!product) return <p>제품이 없습니다.</p>

    return(
       <DetailPage>
            <div className="detailImg">
                <Image src={product.image} width={300} height={300} layout="responsive" alt={product.title}/>
            </div>
            <div className="detailTextWrap">
                <h3>{product.title}</h3>
                <p className="price">가격: <span>{formarCurrency(product.price)}원</span></p>

                <div className="detailOpt">
                    <label className="labelText" htmlFor="optSelect">옵션</label>
                    {/* fldorxmdptjsms label에서 for 대신 hrmlfor로 사용 */}

                    <select id="optSelect" value={selected} onChange={selectOpt}>
                        {product?.option?.split(',').map((opt, index)=>(
                            <option key={index} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
                <div className="detailColors">
                    <p>색상선택</p>
                    {product?.colors?.map((opt,index)=>(
                        <div className="colorChip" 
                        key={index} 
                        style={{backgroundColor : opt }}
                        onClick={()=>selectColor(opt)}
                        />
                    ))}
                </div>
                <div className="detailBtns">
                    <button className="cartBtn" onClick={()=>handleActionClick('장바구니')}>장바구니담기</button>
                    <button className="buyBtn" onClick={()=>handleActionClick('구매')}>구매하기</button>
                </div>
            </div>
       
       </DetailPage>
    )
}
const DetailPage = styled.div`
    max-width: 1200px;
    margin: 0px auto;
    padding: 30px 0px;
    display: flex;
    gap: 40px;
    .detailImg{
        max-width: 600px;
        width: 100%;
             
        img{
            width: 100%;
            height: 600px;
            display: block;
        }
    }
    .detailTextWrap{
       display : flex;
       flex-direction: column;
       gap: 20px;
       width: 100%;
       max-width: 400px;
       h3{
        font-size: 24px;
        color: #fff;
        font-weight: normal;
        border-bottom: solid 1px rgba(255,255,255,0.1);
        padding-bottom: 20px;
        margin-bottom: 100px;
       }
       .price{
            display: flex;
            align-items: center;
            gap: 30px;
            color: rgba(255,255,255,0.8);
            span{
                color: rgba(255,255,255,1);
            }
       }
       .detailOpt{
            display: flex;
            gap: 30px;
            select{
                width: 80%;
                padding: 6px;
                background-color: transparent;
                option{
                    background: black;
                }
            }
       }
       .detailColors{
            display: flex;
            gap: 10px;
            height: 20px;
            .colorChip{
                width: 20px;
            }

       }
       .detailBtns{
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        button{
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            cursor: pointer;
            border: none;
            background: transparent;
            font-weight: bold;
            &.cartBtn{
                background: lightblue;
            }
            &.buyBtn{
                background: #fff;
                color: #000;
            }
        }
        

       }
    }       
`