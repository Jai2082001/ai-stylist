import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../../db/index'
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Email' },
                password: { label: 'password', type: 'text', placeholder: 'Password' }
            },
            async authorize(credentials) {
                

                console.log(credentials);

                return prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                        password: credentials.password
                    }
                }).then((response)=>{
                    return {
                        email: response.email                  
                    }
                })
               
            },
            secret: process.env.NEXTAUTH_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ]
})


export { handler as GET, handler as POST }