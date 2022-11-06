import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useCatch, useLoaderData, useParams } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { prisma } from '~/db.server'
import { requireUserId } from '~/services/auth.server'

export async function loader({ request, params }: LoaderArgs) {
	invariant(params.datasourceId, 'Missing datasourceId')
	const userId = await requireUserId(request)
	const datasource = await prisma.datasource.findFirst({
		where: { id: params.datasourceId, userId: userId },
		select: {
			id: true,
			name: true,
		},
	})

	if (!datasource) {
		throw new Response('not found', { status: 404 })
	}
	return json({ datasource })
}

export default function DatsourceRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<div>
			<h2>Datasource</h2>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<hr />
			<Outlet />
		</div>
	)
}

export function CatchBoundary() {
	const caught = useCatch()
	const params = useParams()

	if (caught.status === 404) {
		return <div>Datasource "{params.datasourceId}" not found</div>
	}

	throw new Error(`Unexpected caught response with status: ${caught.status}`)
}
