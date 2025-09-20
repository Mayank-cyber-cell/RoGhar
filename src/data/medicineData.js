// Medicine dataset - initially empty
export let medicineDatabase = [];

// Medicine types
export const medicineTypes = ["All", "Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops"];

// ✅ Fetch medicines from FDA API
export const fetchMedicinesFromAPI = async (query = "") => {
  try {
    const apiKey = "sdtfbNb3kElJcskvr8afXkew46t7V1AoBn5Zzd8F";
    const url = `https://api.fda.gov/drug/event.json?api_key=${apiKey}&search=${query}&limit=10`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results) {
      medicineDatabase = data.results.map((item, index) => ({
        id: index + 1,
        name: item.patient?.drug?.[0]?.medicinalproduct || "Unknown Medicine",
        description: item.safetyreportid || "No description available",
        type: "Tablet", // API doesn’t provide type, you can classify later
      }));
    }

    return medicineDatabase;
  } catch (error) {
    console.error("Error fetching medicines:", error);
    return [];
  }
};

// 🔍 Search medicines
export const searchMedicines = (query, medicines = medicineDatabase) => {
  if (!query.trim()) return medicines;

  const searchTerm = query.toLowerCase().trim();
  return medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm) ||
    medicine.description.toLowerCase().includes(searchTerm) ||
    medicine.type.toLowerCase().includes(searchTerm)
  );
};

// 📂 Filter by type
export const filterMedicinesByType = (type, medicines = medicineDatabase) => {
  if (type === "All" || !type) return medicines;
  return medicines.filter(medicine => medicine.type === type);
};

// 🔎 Get by ID
export const getMedicineById = (id) => {
  return medicineDatabase.find(medicine => medicine.id === id);
};

// 🔎 Get by Name
export const getMedicineByName = (name) => {
  return medicineDatabase.find(medicine =>
    medicine.name.toLowerCase() === name.toLowerCase()
  );
};

export const fetchFromMyUpchar = async (query) => {
  try {
    const url = `https://www.myupchar.com/api/medicine/search?q=${query}&limit=10`; 
    const response = await fetch(url);
    const data = await response.json();

    if (data.details) {
      return {
        id: data.details.product_id,
        name: data.details.name,
        description: data.details.uses.main.join(", "),
        type: data.details.otc_type || "Unknown",
        manufacturer: data.details.manufacturer?.name,
        sideEffects: data.details.side_effects,
        inStock: data.details.in_stock,
        price: data.details.offers?.[0]?.final_price,
        image: data.details.image_array?.[0]
      };
    }
    return null;
  } catch (err) {
    console.error("Error fetching from MyUpchar:", err);
    return null;
  }
};
