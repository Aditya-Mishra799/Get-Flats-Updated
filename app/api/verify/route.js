import { consumeToken, getRedirectURl, getVerificationLink, verifyToken } from "@/server-actions/accountVerificationActions"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        const token = req.nextUrl.searchParams.get("token")
        const verificationResp = await getRedirectURl(token)
        const consump = await consumeToken(token)
        return NextResponse.json(verificationResp, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({}, {status: 500})
    }
}