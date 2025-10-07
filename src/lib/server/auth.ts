import { SvelteKitAuth } from "@auth/sveltekit"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Slack from "@auth/sveltekit/providers/slack"
 
const prisma = new PrismaClient()
 
export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Slack],
  callbacks: {
    // Add all user data to the session
    async session({ session }) {
      return session;
    },
    async signIn({ user, profile }) {
      if (user?.id && profile?.picture) {
        console.log(profile)
        await prisma.user.updateMany({
          where: { id: user.id },
          data: { image: profile.picture, name: profile.name },
        });
      }
      return true;
    }
  },
  trustHost: true,
})
