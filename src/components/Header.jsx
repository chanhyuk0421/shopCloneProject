"use client"
import Link from "next/link";
import styled from "styled-components";
import LoginInfo from "./LoginInfo";
import MainMenu from "./MainMenu";
import { CiShoppingCart } from "react-icons/ci";
import { useAuthContext } from "@/context/authContext";
import { googleLogin } from "@/api/api";
import { CiSearch } from "react-icons/ci";

 
 export default function Header(){
    const { user } = useAuthContext();

    const handleCartClick = (e)=>{
        if(!user){
            e.preventDefault();
            googleLogin();
        }
    }

    return(
        <HeaderContainer>
            <h1 className="logo">
                <Link href='/'>shop</Link>
            </h1>
            <MainMenu/>
            <LoginInfo/>
            <Link href='/cart' onClick={handleCartClick}><CiShoppingCart /></Link>
            <Link href='/search'><CiSearch /></Link>
        </HeaderContainer>
    )
 }
 const HeaderContainer = styled.header`

    width: 100%;
    padding: 12px 24px;
    box-sizing: border-box;
    border-bottom: solid 1px gray;
    display: flex;
    justify-content: space-between;

 `
