const fetch = require('node-fetch');

async function test() {
  const email = "test@bioxlife.com";
  const password = "password123";
  // Assuming test@bioxlife.com exists or I'll just check if the endpoint returns 404 vs 401
  const res = await fetch('http://localhost:9000/auth/customer/emailpass/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: "newpassword" })
  });
  console.log(res.status, await res.text());
}
test();
