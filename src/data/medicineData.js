// Medicine dataset - will be populated from FDA API
export let medicineDatabase = [];

// Medicine types
export const medicineTypes = ["All", "Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops"];

// FDA API configuration
const FDA_API_KEY = "y16OJL88H44RWW6lZvgu82dXpuruGtJkhVAcsckt";
const FDA_BASE_URL = "https://api.fda.gov/drug";

// Common medicine names to search for initially
const commonMedicines = [
  "aspirin", "ibuprofen", "acetaminophen", "amoxicillin", "metformin",
  "lisinopril", "atorvastatin", "omeprazole", "amlodipine", "metoprolol",
  "hydrochlorothiazide", "simvastatin", "losartan", "gabapentin", "levothyroxine"
];

// ✅ Fetch medicines from FDA API
export const fetchMedicinesFromAPI = async (query = "") => {
  try {
    let searchQuery = query.trim();
    
    // If no query provided, use common medicines
    if (!searchQuery) {
      // Load some common medicines initially
      const promises = commonMedicines.slice(0, 5).map(medicine => 
        fetchSingleMedicine(medicine)
      );
      const results = await Promise.all(promises);
      medicineDatabase = results.filter(Boolean).flat();
      return medicineDatabase;
    }

    const result = await fetchSingleMedicine(searchQuery);
    if (result && result.length > 0) {
      // Update the database with new results
      const existingIds = medicineDatabase.map(m => m.id);
      const newMedicines = result.filter(m => !existingIds.includes(m.id));
      medicineDatabase = [...medicineDatabase, ...newMedicines];
    }
    
    return medicineDatabase;
  } catch (error) {
    console.error("Error fetching medicines:", error);
    return medicineDatabase;
  }
};

// Fetch single medicine from FDA API
const fetchSingleMedicine = async (medicineName) => {
  try {
    // Try drug label endpoint first
    const labelUrl = `${FDA_BASE_URL}/label.json?api_key=${FDA_API_KEY}&search=openfda.brand_name:"${medicineName}" OR openfda.generic_name:"${medicineName}"&limit=5`;
    
    const response = await fetch(labelUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results.map((item, index) => {
        const brandName = item.openfda?.brand_name?.[0] || medicineName;
        const genericName = item.openfda?.generic_name?.[0] || "";
        const manufacturer = item.openfda?.manufacturer_name?.[0] || "Unknown Manufacturer";
        
        // Extract dosage form
        const dosageForm = item.openfda?.dosage_form?.[0] || "Tablet";
        const route = item.openfda?.route?.[0] || "Oral";
        
        // Extract indications and usage
        const indicationsAndUsage = item.indications_and_usage?.[0] || 
          item.purpose?.[0] || 
          "Consult healthcare provider for usage information.";
        
        // Extract dosage and administration
        const dosageInfo = item.dosage_and_administration?.[0] || 
          "Follow healthcare provider's instructions or package directions.";
        
        // Extract warnings and precautions
        const warnings = item.warnings?.[0] || 
          item.boxed_warning?.[0] || 
          "Read all warnings on package. Consult healthcare provider if you have questions.";
        
        // Extract adverse reactions
        const sideEffects = item.adverse_reactions?.[0] || 
          "Possible side effects may include nausea, dizziness, or allergic reactions. Contact healthcare provider if symptoms persist.";

        return {
          id: `fda-${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${index}`,
          name: brandName,
          genericName: genericName,
          manufacturer: manufacturer,
          type: mapDosageFormToType(dosageForm),
          route: route,
          description: indicationsAndUsage.substring(0, 300) + (indicationsAndUsage.length > 300 ? "..." : ""),
          dosage: dosageInfo.substring(0, 200) + (dosageInfo.length > 200 ? "..." : ""),
          sideEffects: sideEffects.substring(0, 300) + (sideEffects.length > 300 ? "..." : ""),
          precautions: warnings.substring(0, 300) + (warnings.length > 300 ? "..." : ""),
          fdaSource: true
        };
      });
    }
    
    // If no results from label endpoint, try NDC endpoint
    return await fetchFromNDC(medicineName);
    
  } catch (error) {
    console.error(`Error fetching medicine ${medicineName}:`, error);
    return [];
  }
};

// Fallback to NDC directory
const fetchFromNDC = async (medicineName) => {
  try {
    const ndcUrl = `${FDA_BASE_URL}/ndc.json?api_key=${FDA_API_KEY}&search=brand_name:"${medicineName}" OR generic_name:"${medicineName}"&limit=3`;
    
    const response = await fetch(ndcUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results.map((item, index) => ({
        id: `ndc-${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${index}`,
        name: item.brand_name || item.generic_name || medicineName,
        genericName: item.generic_name || "",
        manufacturer: item.labeler_name || "Unknown Manufacturer",
        type: mapDosageFormToType(item.dosage_form || "Tablet"),
        route: item.route?.[0] || "Oral",
        description: `${item.brand_name || item.generic_name} is a pharmaceutical product manufactured by ${item.labeler_name || "unknown manufacturer"}.`,
        dosage: "Consult healthcare provider or package instructions for proper dosage.",
        sideEffects: "Consult healthcare provider for information about possible side effects.",
        precautions: "Read all warnings and consult healthcare provider before use.",
        fdaSource: true
      }));
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching from NDC for ${medicineName}:`, error);
    return [];
  }
};

// Map FDA dosage forms to our types
const mapDosageFormToType = (dosageForm) => {
  const form = dosageForm.toLowerCase();
  if (form.includes('tablet')) return 'Tablet';
  if (form.includes('capsule')) return 'Capsule';
  if (form.includes('syrup') || form.includes('liquid') || form.includes('solution')) return 'Syrup';
  if (form.includes('injection') || form.includes('injectable')) return 'Injection';
  if (form.includes('cream') || form.includes('ointment') || form.includes('gel')) return 'Cream';
  if (form.includes('drops') || form.includes('ophthalmic')) return 'Drops';
  return 'Tablet'; // default
};

// Initialize with some common medicines
let isInitialized = false;
export const initializeMedicineDatabase = async () => {
  if (!isInitialized) {
    isInitialized = true;
    await fetchMedicinesFromAPI();
  }
};

// 🔍 Search medicines
export const searchMedicines = async (query, medicines = medicineDatabase) => {
  if (!query.trim()) return medicines;

  const searchTerm = query.toLowerCase().trim();
  
  // First search in existing database
  const localResults = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm) ||
    medicine.genericName?.toLowerCase().includes(searchTerm) ||
    medicine.description.toLowerCase().includes(searchTerm) ||
    medicine.type.toLowerCase().includes(searchTerm)
  );

  // If we have local results, return them
  if (localResults.length > 0) {
    return localResults;
  }

  // If no local results, try fetching from API
  try {
    await fetchMedicinesFromAPI(searchTerm);
    // Search again in updated database
    return medicineDatabase.filter(medicine =>
      medicine.name.toLowerCase().includes(searchTerm) ||
      medicine.genericName?.toLowerCase().includes(searchTerm) ||
      medicine.description.toLowerCase().includes(searchTerm) ||
      medicine.type.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error("Error searching medicines:", error);
    return localResults;
  }
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