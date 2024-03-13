import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider  from 'next-auth/providers/credentials'
import connectDb from '@/utils/connectDb'
import User from '@/models/user'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '@/lib/mongodb'


const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
     CredentialsProvider({
       name: 'credentials',
       credentials: {
         email: { label:"Email", type: "text", placeholder: "jsmith"},
         password: { label: "Password", type: "password", placeholder: "********"}
       },
       async authorize(credentials, req) {
         const user = {id:'1', fullname: 'nperez', email: 'nperez@nperez.com'}
        //  await connectDb();
        //  const userFound = await User.findOne({email: credentials?.email}).select("+password")
        //  if (!userFound) throw new Error("Invalid credentials")
        //  const passwordMatch = await bcrypt.compare(credentials?.password, userFound.password)
        //  if (!passwordMatch) throw new Error("Invalid credentials")     
         return user;
       }
     }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID as string,
    //   clientSecret: process.env.APPLE_SECRET as string
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID as string,
    //   clientSecret: process.env.FACEBOOK_SECRET as string
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET as string
    // }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER as string,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  callbacks: {
    jwt({account, token, user, profile, session}){
      console.log({
        account, 
        token, 
        user, 
        profile, 
        session
      });
      if (user) token.user = user;
      return token;
    },
     session({session, token}) {
        session.user = token.user as {id: string, fullname: string, email: string};
        return session;
     },
  },
});

export { handler as GET, handler as POST };

// export async function getHandler(req: NextApiRequest, res: NextApiResponse) {
//     // Implementación de la función GET aquí
//     res.status(200).json({ message: 'GET request handled' });
//   }
  
//   export async function postHandler(req: NextApiRequest, res: NextApiResponse) {
//     // Implementación de la función POST aquí
//     res.status(200).json({ message: 'POST request handled' });
//   }


// export async function GET(request: Request) { GoogleProvider }
 
// export async function HEAD(request: Request) {}
 
// export async function POST(request: Request) {}
 
// export async function PUT(request: Request) {}
 
// export async function DELETE(request: Request) {}
 
// export async function PATCH(request: Request) {}

// export async function OPTIONS(request: Request) {}