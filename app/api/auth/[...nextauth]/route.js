import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../../db/index'
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
        
    ],
    callbacks: {
        async signIn({user, account, profile, email, credentials}){
            let response = await prisma.user.findFirst({
                where: {
                    email: user.email
                }
            })
            try{
                if(response){
                    return true
                }else{
                    const data = {
                        googleid: user.id,
                        name: user.name,
                        email: user.email,
                        profileImage: user.image 
                    }
                    await prisma.user.create({data})
                    return true
                }
            }catch(err){
                console.log(err)
            }
                        
        },
        async jwt({token, account}){
            if(account){
                token.accessToken = account.access_token
            }
            return token
        }


    }
})


export { handler as GET, handler as POST }