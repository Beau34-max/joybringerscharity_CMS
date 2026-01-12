export default async function handler(req, res) {
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const protocol = (req.headers["x-forwarded-proto"] || "https");
    const baseUrl = `${protocol}://${host}`;

    const redirectUri = `${baseUrl}/api/auth/callback`;

    const url =
        `https://github.com/login/oauth/authorize` +
        `?client_id=${process.env.GITHUB_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=repo`;

    res.statusCode = 302;
    res.setHeader("Location", url);
    res.end();
}
