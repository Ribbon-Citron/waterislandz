export async function onRequest(context) {
  // 設定したいユーザー名とパスワード
  const USERNAME = "admin";
  const PASSWORD = "5841"; // ← 好きなパスワードに変更してください

  const authHeader = context.request.headers.get("Authorization");

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");
      if (user === USERNAME && pass === PASSWORD) {
        return await context.next();
      }
    }
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Access to the site"',
    },
  });
}
