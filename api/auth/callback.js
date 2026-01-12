export default async function handler(req, res) {
    const code = req.query.code;

    if (!code) {
        res.statusCode = 400;
        res.end("Missing code");
        return;
    }

    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        }),
    });

    const data = await tokenRes.json();

    if (!data.access_token) {
        res.statusCode = 401;
        res.end("No access token returned from GitHub");
        return;
    }

    // Decap CMS reads token from URL hash
    res.statusCode = 302;
    res.setHeader(
        "Location",
        `/admin/#access_token=${data.access_token}&token_type=bearer`
    );
    res.end();
}
