// src/features/products/api.ts
// Product API functions (re-export from lookupApi for feature encapsulation)

export { 
  searchMedicines, 
  getMedicineBySlug, 
  getATCCategories,
  type MedicineInfo,
  type ATCCategory,
} from "../../lib/api/lookupApi";
