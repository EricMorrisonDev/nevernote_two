import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/app/lib/validation/auth";
import { prisma } from "@/app/lib/prisma";
import { hashPassword } from "@/app/lib/hash";
import { cookies } from "next/headers";


const SESSION_COOKIE_NAME = "session"
const SESSION_MAX_AGE_DAYS = 30

export async function POST(request: NextRequest) {

    try {
        // validate request
        const raw = request.json()
    
        const validatedData = signupSchema.safeParse(raw)
    
        if(!validatedData.success){
            return NextResponse.json({
                error: "Invalid login request"
            })
        }

        const { email, password, userName } = validatedData.data
    
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
        const hashResult = await hashPassword(password)

        if(!hashResult.success){
            return NextResponse.json({
                error: "failed to generate password hash"
            })
        }

        const passwordHash = hashResult.hash
        
        // run prisma query to create user

        const user = await prisma.user.create({
            data: {
                userName,
                email,
                passwordHash
            }
        })

        if(!user){
            return NextResponse.json({
                error: "Failed to create user"
            })
        }

        // create an expiresAt value by adding max age days value above to today's date
        const now = new Date()
        const expiresAt = now.setDate(now.getDate() + SESSION_MAX_AGE_DAYS)

        // run prisma query saving session with userId and expiresAt stored in data obj

        const session = prisma.session.create({
            data: {
                userId: user.id
            }
        })

        if(!session){
            return NextResponse.json({
                error: "Failed to create session"
            })
        }



    } catch (err) {
        console.error(err)
    }
}