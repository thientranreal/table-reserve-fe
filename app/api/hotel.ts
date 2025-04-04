export async function hotelGet(page: string | null = "1") {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    if (!page) {
      page = "1";
    }

    const response = await fetch(`${apiUrl}/api/hotel?page=${page}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error hotelGet:", error);
    return null;
  }
}

export async function hotelGetWithParams(
  params: any,
  page: string | null = "1"
) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    if (!page) {
      page = "1";
    }

    const baseUrl = `${apiUrl}/api/room-type-inventory/search`;

    const paramsConstruct = new URLSearchParams();
    paramsConstruct.append("location", params.place);
    paramsConstruct.append("startDate", params.fromDate);
    paramsConstruct.append("endDate", params.untilDate);
    paramsConstruct.append("guests", params.guests);
    paramsConstruct.append("page", page);

    const finalUrl = `${baseUrl}?${paramsConstruct}`;

    const response = await fetch(finalUrl);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error hotelGetWithParams:", error);
    return null;
  }
}

export async function hotelFindById(id: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(`${apiUrl}/api/hotel/${id}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error hotelFindById:", error);
    return null;
  }
}
