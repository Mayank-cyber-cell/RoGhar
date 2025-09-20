// Medicine dataset - imported from MedGuide-Pill_Tracker concept

// API Configuration
export const MEDICINE_API_KEY = 'sdtfbNb3kElJcskvr8afXkew46t7V1AoBn5Zzd8F';
export const MEDICINE_API_BASE_URL = 'https://api.fda.gov/drug';

// Enhanced medicine search with API integration
export const searchMedicinesWithAPI = async (query) => {
  if (!query.trim()) return medicineDatabase;
  
  try {
    // First search local database
    const localResults = searchMedicines(query, medicineDatabase);
    
    // If we have local results, return them
    if (localResults.length > 0) {
      return localResults;
    }
    
    // If no local results, try API search (placeholder for actual API integration)
    // Note: This is a placeholder - actual FDA API integration would require different endpoints
    console.log(`Searching API with key: ${MEDICINE_API_KEY} for query: ${query}`);
    
    // For now, return local database results
    return medicineDatabase.filter(medicine => 
      medicine.name.toLowerCase().includes(query.toLowerCase()) ||
      medicine.description.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('API search failed:', error);
    // Fallback to local search
    return searchMedicines(query, medicineDatabase);
  }
};

export const medicineDatabase = [
  {
    id: 1,
    name: "Paracetamol",
    type: "Tablet",
    description: "Pain reliever and fever reducer. Used for headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers.",
    dosage: "500mg - 1000mg every 4-6 hours",
    sideEffects: "Rare when used as directed. May cause liver damage if overdosed.",
    precautions: "Do not exceed 4000mg in 24 hours. Avoid alcohol while taking."
  },
  {
    id: 2,
    name: "Ibuprofen",
    type: "Tablet",
    description: "Anti-inflammatory drug used to reduce fever and treat pain or inflammation caused by conditions like headache, toothache, back pain, arthritis, menstrual cramps, or minor injury.",
    dosage: "200mg - 400mg every 4-6 hours",
    sideEffects: "Stomach upset, nausea, vomiting, headache, diarrhea, constipation, dizziness, or drowsiness.",
    precautions: "Take with food or milk. Avoid if you have stomach ulcers or kidney problems."
  },
  {
    id: 3,
    name: "Amoxicillin",
    type: "Capsule",
    description: "Antibiotic used to treat bacterial infections including pneumonia, bronchitis, gonorrhea, and infections of the ear, nose, throat, urinary tract, and skin.",
    dosage: "250mg - 500mg every 8 hours",
    sideEffects: "Nausea, vomiting, diarrhea, stomach pain, vaginal itching or discharge.",
    precautions: "Complete the full course even if you feel better. Inform doctor of any allergies."
  },
  {
    id: 4,
    name: "Cough Syrup",
    type: "Syrup",
    description: "Relieves cough and throat irritation. Contains dextromethorphan to suppress cough reflex.",
    dosage: "10ml - 20ml every 4 hours",
    sideEffects: "Drowsiness, dizziness, nausea, vomiting.",
    precautions: "Do not exceed recommended dose. Avoid alcohol. May cause drowsiness."
  },
  {
    id: 5,
    name: "Cetirizine",
    type: "Tablet",
    description: "Antihistamine used to treat allergy symptoms such as watery eyes, runny nose, itching eyes/nose, sneezing, hives, and itching.",
    dosage: "10mg once daily",
    sideEffects: "Drowsiness, dry mouth, stomach pain, diarrhea, vomiting.",
    precautions: "May cause drowsiness. Avoid alcohol. Use caution when driving."
  },
  {
    id: 6,
    name: "Omeprazole",
    type: "Capsule",
    description: "Proton pump inhibitor used to treat gastroesophageal reflux disease (GERD), stomach ulcers, and other conditions involving excessive stomach acid.",
    dosage: "20mg - 40mg once daily before meals",
    sideEffects: "Headache, stomach pain, nausea, diarrhea, vomiting, gas.",
    precautions: "Take before meals. Long-term use may increase risk of bone fractures."
  },
  {
    id: 7,
    name: "Multivitamin Syrup",
    type: "Syrup",
    description: "Dietary supplement containing essential vitamins and minerals to support overall health and fill nutritional gaps.",
    dosage: "15ml once daily with meals",
    sideEffects: "Generally well tolerated. May cause stomach upset if taken on empty stomach.",
    precautions: "Take with food. Do not exceed recommended dose."
  },
  {
    id: 8,
    name: "Aspirin",
    type: "Tablet",
    description: "Pain reliever, fever reducer, and anti-inflammatory drug. Also used in low doses to prevent heart attacks and strokes.",
    dosage: "325mg - 650mg every 4 hours for pain/fever",
    sideEffects: "Stomach irritation, heartburn, nausea, vomiting.",
    precautions: "Take with food. Avoid if you have bleeding disorders or stomach ulcers."
  },
  {
    id: 9,
    name: "Loratadine",
    type: "Tablet",
    description: "Non-drowsy antihistamine used to treat allergy symptoms including runny nose, sneezing, watery eyes, and itching.",
    dosage: "10mg once daily",
    sideEffects: "Headache, drowsiness, fatigue, dry mouth.",
    precautions: "Generally non-drowsy but may cause mild drowsiness in some people."
  },
  {
    id: 10,
    name: "Antacid Syrup",
    type: "Syrup",
    description: "Neutralizes stomach acid to relieve heartburn, acid indigestion, and upset stomach.",
    dosage: "10ml - 20ml as needed after meals",
    sideEffects: "Constipation or diarrhea with prolonged use.",
    precautions: "Do not use for more than 2 weeks without consulting a doctor."
  }
];

export const medicineTypes = ["All", "Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops"];

// Medicine search and filter functions
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