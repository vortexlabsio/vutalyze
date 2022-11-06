export async function sendEmail({
	to,
	subject,
	html,
	text,
}: {
	to: string
	subject: string
	html: string
	text: string
}) {
	const auth = `${Buffer.from(
		`api:${process.env.MAILGUN_SENDING_KEY}`,
	).toString('base64')}`

	const body = new URLSearchParams({
		to,
		from: 'hello@vutalyze.com',
		subject,
		text,
		html,
	})

	return fetch(
		`https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`,
		{
			method: 'post',
			body,
			headers: {
				Authorization: `Basic ${auth}`,
			},
		},
	)
}
