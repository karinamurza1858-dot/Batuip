export default {
  async fetch(request) {
    const url = new URL(request.url);
    const sorguIP = url.searchParams.get("ip");

    const ip = sorguIP || request.headers.get("CF-Connecting-IP");

    const apiURL = `http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,as,query`;

    const resp = await fetch(apiURL);
    const data = await resp.json();

    return new Response(JSON.stringify({
      success: true,
      ip: data.query,
      country: data.country,
      region: data.regionName,
      city: data.city,
      isp: data.isp,
      as: data.as
    }, null, 2), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
