import { NextRequest } from "next/server";


export async function proxy(request:NextRequest){
    const pathname = request.nextUrl.pathname
     
    let isAuthenticated = false;
    let isAdmin = false;
    let isSeller = false;

    
}