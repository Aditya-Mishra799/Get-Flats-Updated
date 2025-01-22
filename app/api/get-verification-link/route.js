import { getVerificationLink } from "@/server-actions/accountVerificationActions"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        const verifiacationLinkResp = await getVerificationLink("verify-email")
        return NextResponse.json(verifiacationLinkResp, {status: 200})
    } catch (error) {
        return NextResponse.json({}, {status: 500})
    }
}