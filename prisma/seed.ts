import type * as P from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'
import {
	createUser,
} from './seed-utils'

const prisma = new PrismaClient()

async function seed() {
	const email = 'chris@vortex.dev'

	// cleanup the existing database
	await prisma.organization.deleteMany({ where: {} })
	await prisma.workspace.deleteMany({ where: {} })
	await prisma.project.deleteMany({ where: {} })
	await prisma.datasource.deleteMany({ where: {} })
	await prisma.dimension.deleteMany({ where: {} })
	await prisma.user.deleteMany({ where: {} })

	const hashedPassword = await bcrypt.hash('examplePassword', 10)

	const chrisUser = createUser()

	await prisma.user.create({
		data: {
			email,
			username: 'chrisb',
			name: 'Chris',
			imageUrl: chrisUser.imageUrl,
			password: {
				create: {
					hash: hashedPassword,
				},
			},
			admin: {
				create: {},
			},
		},
	})

	console.log(`Database has been seeded. 🌱`)
}

seed()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

/*
eslint
	@typescript-eslint/no-unused-vars: "off",
*/
