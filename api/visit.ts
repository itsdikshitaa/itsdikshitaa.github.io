export default async function handler(req: any, res: any) {
    // Allow CORS if needed, or Vercel handles it for same-origin
    // For safety, we can set headers.
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    // res.setHeader(
    //   'Access-Control-Allow-Headers',
    //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    // )

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    try {
        const headers: any = { 'Content-Type': 'application/json' };
        if (process.env.COUNTER_API_KEY) {
            headers['Authorization'] = `Bearer ${process.env.COUNTER_API_KEY}`;
        }

            const COUNTER_BASE = process.env.COUNTER_BASE || 'https://api.counterapi.dev/v2/dikshitas-team-3462/dikshita-page-visior';

            const response = await fetch(
                `${COUNTER_BASE}/up`,
                {
                    method: 'GET',
                    headers
                }
            );

        if (!response.ok) {
            // If increment fails (e.g. rate limit), try to get the current count
                const getResponse = await fetch(`${COUNTER_BASE}`);
            if (getResponse.ok) {
                const data = await getResponse.json();
                return res.status(200).json({ count: data?.data?.up_count ?? 0 });
            }
            throw new Error(`External API returned ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json({
            count: data?.data?.up_count ?? 0,
        });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Failed to fetch visit count", count: 0 });
    }
}
