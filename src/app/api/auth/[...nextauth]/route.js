// in the app   api/auth/[...nextauth]/route.js import NextAuth from "next-auth"
import NextAuth from "next-auth" 
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth ({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.Google_ID,
      clientSecret: process.env.Google_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
     async session({session, token}){
      session.user.username =  session.user.name.split(' ')[0].toLowerCase();
      session.user.uid = token.sub
      return session;
     }
  }
});

export { handler as GET , handler as POST};    