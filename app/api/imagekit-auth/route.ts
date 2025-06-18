// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    const authenticationParameters = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, 
        publicKey: process.env.NEXTAUTH_SECRET_PUBLIC_KEY as string,
    })

    return Response.json({ authenticationParameters, publicKey: process.env.IMAGEKIT_PUBLIC_KEY })
}