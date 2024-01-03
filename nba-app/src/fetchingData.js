const url = "http://localhost:8000";

export default async function fetchingData(route) {
  try {
    const jasonData = await fetch(`${url}/${route}`);
    const data = await jasonData.json();
    return data;
  } catch (e) {
    throw new Error("an error happend when fetching data");
  }
}
