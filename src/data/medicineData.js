// Medicine dataset - simplified without API integration

// Empty medicine database - no pre-loaded medicines
export const medicineDatabase = [];

export const medicineTypes = ["All", "Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops"];

// Simple medicine search function
export const searchMedicines = (query, medicines = medicineDatabase) => {
  if (!query.trim()) return medicines;
  
  const searchTerm = query.toLowerCase().trim();
  return medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchTerm) ||
    medicine.description.toLowerCase().includes(searchTerm) ||
    medicine.type.toLowerCase().includes(searchTerm)
  );
};

export const filterMedicinesByType = (type, medicines = medicineDatabase) => {
  if (type === "All" || !type) return medicines;
  return medicines.filter(medicine => medicine.type === type);
};

export const getMedicineById = (id) => {
  return medicineDatabase.find(medicine => medicine.id === id);
};

export const getMedicineByName = (name) => {
  return medicineDatabase.find(medicine => 
    medicine.name.toLowerCase() === name.toLowerCase()
  );
};