import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { prisma } from '~/db.server'
import { requireUserId } from '~/services/auth.server'

export async function loader({ request }: LoaderArgs) {
	const userId = await requireUserId(request)
	const datasources = await prisma.datasource.findMany({
		where: { userId: userId },
		select: { id: true },
	})
	return json({ datasources })
}

export default function DatasourceRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<div>
			<h1>Datasources</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<hr />
			<Outlet />
		</div>
	)
}
