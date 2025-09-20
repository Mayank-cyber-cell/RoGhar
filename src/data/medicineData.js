// Medicine dataset - initially empty
export let medicineDatabase = [];

// Medicine types
export const medicineTypes = ["All", "Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops"];

// ✅ Load medicine dataset from local JSON
export const loadMedicineDataset = async () => {
  try {
    const response = await fetch("data/medicines.json"); 
    const data = await response.json();

    // Normalize dataset
    medicineDatabase = data.map((item, index) => ({
      id: index + 1,
      name: item.name || "Unknown Medicine",
      brand: item.brand || "Unknown Brand",
      description: item.description || "No description available",
      type: item.type || "Unknown",
      manufacturer: item.manufacturer || "Not specified",
      price: item.price || null,
      stock: item.in_stock !== undefined ? item.in_stock : true
    }));

    return medicineDatabase;
  } catch (error) {
    console.error("Error loading medicine dataset:", error);
    return [];
  }
};

// 🔍 Search medicines
export const searchMedicines = (query, medicines = medicineDatabase) => {
  if (!query.trim()) return medicines;

  const searchTerm = query.toLowerCase().trim();
  return medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm) ||
    medicine.brand.toLowerCase().includes(searchTerm) ||
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
