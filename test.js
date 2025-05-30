fetch(
  "http://localhost:3000/api/users?q[roles_name_in][]=admin&q[roles_name_in][]=courier",
  {
    headers: {
      accept: "application/json",
      "accept-language": "ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7",
      authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NDY3ODQ0Mjh9.aKecR1MIyZa671qijRQYRTWkwbcCEqvmBUHT0kHMtvw",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie:
        "adminer_key=5305275899cb5a1ed964f5c21b1a753b; adminer_permanent=; adminer_sid=in4hon285mfcaklb51t62cjei1; adminer_version=5.3.0",
      Referer: "http://localhost:3000/api-docs/index.html",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  },
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });
