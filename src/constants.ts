export type ChemicalCategory = 'Acid' | 'Base' | 'Salt' | 'Metal' | 'Non-metal' | 'Oxide' | 'Organic' | 'Other';

export interface Chemical {
  id: string;
  name: string;
  formula: string;
  color: string;
  state: 'solid' | 'liquid' | 'gas';
  category: ChemicalCategory;
}

export const CHEMICALS: Chemical[] = [
  // Acids
  { id: 'hcl', name: 'Hydrochloric Acid', formula: 'HCl', color: 'bg-blue-100/30', state: 'liquid', category: 'Acid' },
  { id: 'h2so4', name: 'Sulfuric Acid', formula: 'H2SO4', color: 'bg-yellow-50/40', state: 'liquid', category: 'Acid' },
  { id: 'hno3', name: 'Nitric Acid', formula: 'HNO3', color: 'bg-yellow-100/30', state: 'liquid', category: 'Acid' },
  { id: 'ch3cooh', name: 'Acetic Acid', formula: 'CH3COOH', color: 'bg-white/40', state: 'liquid', category: 'Acid' },
  { id: 'h3po4', name: 'Phosphoric Acid', formula: 'H3PO4', color: 'bg-white/30', state: 'liquid', category: 'Acid' },
  { id: 'hf', name: 'Hydrofluoric Acid', formula: 'HF', color: 'bg-blue-50/20', state: 'liquid', category: 'Acid' },
  { id: 'h2co3', name: 'Carbonic Acid', formula: 'H2CO3', color: 'bg-blue-50/10', state: 'liquid', category: 'Acid' },
  { id: 'h2s', name: 'Hydrosulfuric Acid', formula: 'H2S', color: 'bg-yellow-100/20', state: 'liquid', category: 'Acid' },
  { id: 'hi', name: 'Hydroiodic Acid', formula: 'HI', color: 'bg-purple-100/20', state: 'liquid', category: 'Acid' },
  { id: 'hbr', name: 'Hydrobromic Acid', formula: 'HBr', color: 'bg-orange-100/20', state: 'liquid', category: 'Acid' },
  { id: 'hclo4', name: 'Perchloric Acid', formula: 'HClO4', color: 'bg-white/20', state: 'liquid', category: 'Acid' },

  // Bases
  { id: 'naoh', name: 'Sodium Hydroxide', formula: 'NaOH', color: 'bg-white/80', state: 'liquid', category: 'Base' },
  { id: 'caoh2', name: 'Calcium Hydroxide', formula: 'Ca(OH)2', color: 'bg-white/60', state: 'liquid', category: 'Base' },
  { id: 'koh', name: 'Potassium Hydroxide', formula: 'KOH', color: 'bg-white/70', state: 'liquid', category: 'Base' },
  { id: 'baoh2', name: 'Barium Hydroxide', formula: 'Ba(OH)2', color: 'bg-white/50', state: 'liquid', category: 'Base' },
  { id: 'nh3', name: 'Ammonia', formula: 'NH3', color: 'bg-blue-50/40', state: 'liquid', category: 'Base' },
  { id: 'lioh', name: 'Lithium Hydroxide', formula: 'LiOH', color: 'bg-white/90', state: 'liquid', category: 'Base' },
  { id: 'aloh3', name: 'Aluminum Hydroxide', formula: 'Al(OH)3', color: 'bg-white', state: 'solid', category: 'Base' },
  { id: 'feoh2', name: 'Iron(II) Hydroxide', formula: 'Fe(OH)2', color: 'bg-green-100', state: 'solid', category: 'Base' },
  { id: 'feoh3', name: 'Iron(III) Hydroxide', formula: 'Fe(OH)3', color: 'bg-red-800', state: 'solid', category: 'Base' },
  { id: 'cuoh2', name: 'Copper(II) Hydroxide', formula: 'Cu(OH)2', color: 'bg-blue-400', state: 'solid', category: 'Base' },
  { id: 'znoh2', name: 'Zinc Hydroxide', formula: 'Zn(OH)2', color: 'bg-white', state: 'solid', category: 'Base' },
  { id: 'mgoh2', name: 'Magnesium Hydroxide', formula: 'Mg(OH)2', color: 'bg-white', state: 'solid', category: 'Base' },

  // Salts
  { id: 'nacl', name: 'Sodium Chloride', formula: 'NaCl', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'agno3', name: 'Silver Nitrate', formula: 'AgNO3', color: 'bg-white/90', state: 'liquid', category: 'Salt' },
  { id: 'bacl2', name: 'Barium Chloride', formula: 'BaCl2', color: 'bg-white/70', state: 'liquid', category: 'Salt' },
  { id: 'cuso4', name: 'Copper(II) Sulfate', formula: 'CuSO4', color: 'bg-blue-500/40', state: 'liquid', category: 'Salt' },
  { id: 'feso4', name: 'Iron(II) Sulfate', formula: 'FeSO4', color: 'bg-green-200/50', state: 'liquid', category: 'Salt' },
  { id: 'ki', name: 'Potassium Iodide', formula: 'KI', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'pbno32', name: 'Lead(II) Nitrate', formula: 'Pb(NO3)2', color: 'bg-white', state: 'liquid', category: 'Salt' },
  { id: 'na2co3', name: 'Sodium Carbonate', formula: 'Na2CO3', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'nahco3', name: 'Sodium Bicarbonate', formula: 'NaHCO3', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'kcl', name: 'Potassium Chloride', formula: 'KCl', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'caco3', name: 'Calcium Carbonate', formula: 'CaCO3', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'mgso4', name: 'Magnesium Sulfate', formula: 'MgSO4', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'alcl3', name: 'Aluminum Chloride', formula: 'AlCl3', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'kn03', name: 'Potassium Nitrate', formula: 'KNO3', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'al2so43', name: 'Aluminum Sulfate', formula: 'Al2(SO4)3', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'znso4', name: 'Zinc Sulfate', formula: 'ZnSO4', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'baso4', name: 'Barium Sulfate', formula: 'BaSO4', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'na2so4', name: 'Sodium Sulfate', formula: 'Na2SO4', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'k2so4', name: 'Potassium Sulfate', formula: 'K2SO4', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'nh4cl', name: 'Ammonium Chloride', formula: 'NH4Cl', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'nh42so4', name: 'Ammonium Sulfate', formula: '(NH4)2SO4', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'na3po4', name: 'Sodium Phosphate', formula: 'Na3PO4', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'k3po4', name: 'Potassium Phosphate', formula: 'K3PO4', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'ca3po42', name: 'Calcium Phosphate', formula: 'Ca3(PO4)2', color: 'bg-white', state: 'solid', category: 'Salt' },
  { id: 'fecl3', name: 'Iron(III) Chloride', formula: 'FeCl3', color: 'bg-yellow-600/50', state: 'liquid', category: 'Salt' },
  { id: 'fecl2', name: 'Iron(II) Chloride', formula: 'FeCl2', color: 'bg-green-300/50', state: 'liquid', category: 'Salt' },
  { id: 'cucl2', name: 'Copper(II) Chloride', formula: 'CuCl2', color: 'bg-blue-600/50', state: 'liquid', category: 'Salt' },
  { id: 'zncl2', name: 'Zinc Chloride', formula: 'ZnCl2', color: 'bg-white/50', state: 'liquid', category: 'Salt' },

  // Metals
  { id: 'fe', name: 'Iron', formula: 'Fe', color: 'bg-gray-400', state: 'solid', category: 'Metal' },
  { id: 'mg', name: 'Magnesium', formula: 'Mg', color: 'bg-gray-300', state: 'solid', category: 'Metal' },
  { id: 'zn', name: 'Zinc', formula: 'Zn', color: 'bg-gray-200', state: 'solid', category: 'Metal' },
  { id: 'cu', name: 'Copper', formula: 'Cu', color: 'bg-orange-400', state: 'solid', category: 'Metal' },
  { id: 'al', name: 'Aluminum', formula: 'Al', color: 'bg-gray-100', state: 'solid', category: 'Metal' },
  { id: 'ag', name: 'Silver', formula: 'Ag', color: 'bg-slate-200', state: 'solid', category: 'Metal' },
  { id: 'na', name: 'Sodium', formula: 'Na', color: 'bg-slate-300', state: 'solid', category: 'Metal' },
  { id: 'li', name: 'Lithium', formula: 'Li', color: 'bg-slate-100', state: 'solid', category: 'Metal' },
  { id: 'k', name: 'Potassium', formula: 'K', color: 'bg-slate-400', state: 'solid', category: 'Metal' },
  { id: 'ca', name: 'Calcium', formula: 'Ca', color: 'bg-slate-200', state: 'solid', category: 'Metal' },
  { id: 'ba', name: 'Barium', formula: 'Ba', color: 'bg-slate-500', state: 'solid', category: 'Metal' },
  { id: 'pb', name: 'Lead', formula: 'Pb', color: 'bg-gray-600', state: 'solid', category: 'Metal' },
  { id: 'sn', name: 'Tin', formula: 'Sn', color: 'bg-gray-300', state: 'solid', category: 'Metal' },
  { id: 'ni', name: 'Nickel', formula: 'Ni', color: 'bg-gray-400', state: 'solid', category: 'Metal' },
  { id: 'cr', name: 'Chromium', formula: 'Cr', color: 'bg-gray-200', state: 'solid', category: 'Metal' },

  // Non-metals
  { id: 'c', name: 'Carbon', formula: 'C', color: 'bg-gray-900', state: 'solid', category: 'Non-metal' },
  { id: 's', name: 'Sulfur', formula: 'S', color: 'bg-yellow-400', state: 'solid', category: 'Non-metal' },
  { id: 'p', name: 'Phosphorus', formula: 'P', color: 'bg-red-600', state: 'solid', category: 'Non-metal' },
  { id: 'i2', name: 'Iodine', formula: 'I2', color: 'bg-purple-900', state: 'solid', category: 'Non-metal' },

  // Oxides
  { id: 'cuo', name: 'Copper(II) Oxide', formula: 'CuO', color: 'bg-gray-800', state: 'solid', category: 'Oxide' },
  { id: 'fe2o3', name: 'Iron(III) Oxide', formula: 'Fe2O3', color: 'bg-red-900', state: 'solid', category: 'Oxide' },
  { id: 'mno2', name: 'Manganese Dioxide', formula: 'MnO2', color: 'bg-gray-900', state: 'solid', category: 'Oxide' },
  { id: 'cao', name: 'Calcium Oxide', formula: 'CaO', color: 'bg-white', state: 'solid', category: 'Oxide' },
  { id: 'co2', name: 'Carbon Dioxide', formula: 'CO2', color: 'bg-white/10', state: 'gas', category: 'Oxide' },
  { id: 'al2o3', name: 'Aluminum Oxide', formula: 'Al2O3', color: 'bg-white', state: 'solid', category: 'Oxide' },
  { id: 'zno', name: 'Zinc Oxide', formula: 'ZnO', color: 'bg-white', state: 'solid', category: 'Oxide' },
  { id: 'pbo', name: 'Lead(II) Oxide', formula: 'PbO', color: 'bg-yellow-600', state: 'solid', category: 'Oxide' },
  { id: 'so2', name: 'Sulfur Dioxide', formula: 'SO2', color: 'bg-white/10', state: 'gas', category: 'Oxide' },
  { id: 'so3', name: 'Sulfur Trioxide', formula: 'SO3', color: 'bg-white/10', state: 'gas', category: 'Oxide' },
  { id: 'p2o5', name: 'Phosphorus Pentoxide', formula: 'P2O5', color: 'bg-white', state: 'solid', category: 'Oxide' },
  { id: 'no2', name: 'Nitrogen Dioxide', formula: 'NO2', color: 'bg-orange-800/30', state: 'gas', category: 'Oxide' },
  { id: 'n2o', name: 'Nitrous Oxide', formula: 'N2O', color: 'bg-white/10', state: 'gas', category: 'Oxide' },
  { id: 'mgo', name: 'Magnesium Oxide', formula: 'MgO', color: 'bg-white', state: 'solid', category: 'Oxide' },
  { id: 'feo', name: 'Iron(II) Oxide', formula: 'FeO', color: 'bg-black', state: 'solid', category: 'Oxide' },
  { id: 'ag2o', name: 'Silver Oxide', formula: 'Ag2O', color: 'bg-black', state: 'solid', category: 'Oxide' },
  { id: 'na2o', name: 'Sodium Oxide', formula: 'Na2O', color: 'bg-white', state: 'solid', category: 'Oxide' },
  { id: 'k2o', name: 'Potassium Oxide', formula: 'K2O', color: 'bg-white', state: 'solid', category: 'Oxide' },

  // Organic
  { id: 'c2h5oh', name: 'Ethanol', formula: 'C2H5OH', color: 'bg-white/20', state: 'liquid', category: 'Organic' },
  { id: 'c6h12o6', name: 'Glucose', formula: 'C6H12O6', color: 'bg-white', state: 'solid', category: 'Organic' },
  { id: 'ch4', name: 'Methane', formula: 'CH4', color: 'bg-white/5', state: 'gas', category: 'Organic' },

  // Other
  { id: 'h2o2', name: 'Hydrogen Peroxide', formula: 'H2O2', color: 'bg-blue-50/30', state: 'liquid', category: 'Other' },
  { id: 'kmno4', name: 'Potassium Permanganate', formula: 'KMnO4', color: 'bg-purple-800', state: 'solid', category: 'Other' },
  { id: 'h2o', name: 'Water', formula: 'H2O', color: 'bg-blue-200/20', state: 'liquid', category: 'Other' },
  { id: 'o2', name: 'Oxygen', formula: 'O2', color: 'bg-white/10', state: 'gas', category: 'Other' },
  { id: 'h2', name: 'Hydrogen', formula: 'H2', color: 'bg-white/5', state: 'gas', category: 'Other' },
  { id: 'cl2', name: 'Chlorine', formula: 'Cl2', color: 'bg-yellow-200/30', state: 'gas', category: 'Other' },
];
