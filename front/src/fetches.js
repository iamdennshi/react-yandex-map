export async function fetchObjects() {
  try {
    const response = await fetch("http://192.168.1.100:8000/objects/");
    if (!response.ok) {
      throw new Error("Failed to fetch objects");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching objects:", error);
  }
}

export async function fetchElements(objectID) {
  try {
    const response = await fetch(
      `http://192.168.1.100:8000/objects/${objectID}/elements`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch elements");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching elements:", error);
  }
}

export async function fetchElement(objectID, elementID, elementType) {
  try {
    const response = await fetch(
      `http://192.168.1.100:8000/objects/${objectID}/elements/${elementType}s/${elementID}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch tree");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tree:", error);
  }
}
