// Medicine dataset - initially empty
export let medicineDatabase = [];

// Medicine types
export const medicineTypes = ["All", "Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops"];

// ✅ Fetch medicines from MyUpchar API
export const fetchFromMyUpchar = async (query = "") => {
  try {
    const url = `https://www.myupchar.com/api/medicine/search?q=${query}&limit=10`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.details) {
      // Normalize into our medicineDatabase format
      const medicineObj = {
        id: data.details.product_id,
        name: data.details.name,
        description: data.details.uses?.main?.join(", ") || "No description available",
        type: data.details.otc_type || "Unknown",
        manufacturer: data.details.manufacturer?.name || "Not specified",
        sideEffects: data.details.side_effects || [],
        inStock: data.details.in_stock || false,
        price: data.details.offers?.[0]?.final_price || null,
        mrp: data.details.offers?.[0]?.mrp || null,
        image: data.details.image_array?.[0] || null,
        rating: data.details.rating?.average || 0
      };

      // Add/replace in database
      medicineDatabase = [medicineObj];
    }

    return medicineDatabase;
  } catch (error) {
    console.error("Error fetching medicines from MyUpchar:", error);
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
