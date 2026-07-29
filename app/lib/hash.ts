import bcrypt from "bcrypt"

const saltRounds = 10

interface hashResult {
    hash: string,
    success: boolean
}

export async function hashPassword(password: string): Promise<hashResult> {
    
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return { hash: hashedPassword, success: true }
}