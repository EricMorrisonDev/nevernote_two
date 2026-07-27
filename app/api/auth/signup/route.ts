import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/app/lib/validation/auth";
import { prisma } from "@/app/lib/prisma";
import { hashPassword } from "@/app/lib/hash";




export async function signup(request: NextRequest) {

    try {
        // validate request
        const raw = request.json()
    
        const validatedData = signupSchema.safeParse(raw)
    
        if(!validatedData){
            return NextResponse.json({
                error: "Invalid login request"
            })
        }

        const { email, password } = validatedData
    
        // check if user already exists
    
        const existing = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!existing){
            return NextResponse.json({
                error: "User email not found"
            })
        }

        // hash password
        const passwordHash = hashPassword(validatedData.data?.password)
        
        // run prisma query to create user

        const user = await prisma.user.create({
            data: {
                email: validatedData.data?.email
            }
        })

    } catch (err) {

    }
}