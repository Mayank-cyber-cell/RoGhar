// Medicine dataset - initially empty
export let medicineDatabase = [];

// Medicine types
export const medicineTypes = ["All", "Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops"];

// ✅ Fetch medicines from openFDA API
export const fetchMedicinesFromAPI = async (query = "") => {
  try {
    const apiKey = "y16OJL88H44RWW6lZvgu82dXpuruGtJkhVAcsckt";
    const url = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=${query}&limit=10`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results) {
      // Normalize into our format
      medicineDatabase = data.results.map((item, index) => ({
        id: index + 1,
        name: item.openfda?.brand_name?.[0] || 
              item.openfda?.generic_name?.[0] || 
              "Unknown Medicine",
        description: item.indications_and_usage?.[0] || "No description available",
        type: "Tablet", // API doesn’t give type, you can improve classification later
        manufacturer: item.openfda?.manufacturer_name?.[0] || "Not specified",
        warnings: item.warnings?.[0] || null,
        dosage: item.dosage_and_administration?.[0] || null
      }));
    }

    return medicineDatabase;
  } catch (error) {
    console.error("Error fetching medicines from openFDA:", error);
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
    medicine.type.toLowerCase().includes(searchTerm) ||
    (medicine.manufacturer?.toLowerCase().includes(searchTerm))
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
