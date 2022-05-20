const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// async function main() {
//   // ... you will write your Prisma Client queries here
//   const allUsers = await prisma.user.findMany()
//   console.log(allUsers)
// }

// add user, post and profile to DB
async function main() {
    await prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@prisma.io',
        posts: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    })
  
    const allUsers = await prisma.user.findMany({
      include: {
        posts: true,
        profile: true,
      },
    })
    console.dir(allUsers, { depth: null })
}
// Update the post to be published
// async function main() {
//     const post = await prisma.post.update({
//       where: { id: 1 },
//       data: { published: true },
//     })
//     console.log(post)
// }

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })