const url = "http://localhost:8000";

export default async function fetchingData(route) {
  const jasonData = await fetch(`${url}/${route}`);
  const data = await jasonData.json();
  return data;
}
