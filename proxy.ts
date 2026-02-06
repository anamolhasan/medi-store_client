
import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";



export async function proxy(request:NextRequest){
    const pathname = request.nextUrl.pathname;
// console.log(pathname)
    let isAuthenticated = false;
    let isAdmin = false;
    let isSeller = false;

    const {data} = await userService.getSession()
    // console.log(data)

    if(data){
        isAuthenticated = true;
        isAdmin = data.user.role === Roles.admin
        isSeller = data.user.role === Roles.seller
    }
 
     // ❌ Not logged in
    if(!isAuthenticated){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const role = data.user.role;
   // 🔒 Admin guar
    if(role === Roles.admin && !pathname.startsWith('/admin')){
        return NextResponse.redirect(new URL('/admin', request.url))
    }
   // 🔒 Seller guard
    if(role === Roles.seller && !pathname.startsWith('/seller')){
        return NextResponse.redirect(new URL('/seller', request.url))
    }
     // 🔒 Customer guard
    if(role === Roles.customer && !pathname.startsWith('/customer')){
        return NextResponse.redirect(new URL('/customer', request.url))
    }

    // ✅ Allow request
    return NextResponse.next()

}

export const config = {
    matcher: [
        '/admin/:path*',
        '/seller/:path*',
        '/customer/:path*'
    ]
}