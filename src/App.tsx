import React, { useState, useEffect } from 'react';
import { 
  Beaker, 
  FlaskConical, 
  TestTube, 
  Plus, 
  Trash2, 
  Play, 
  Info, 
  AlertTriangle, 
  Loader2,
  Atom,
  X,
  ChevronRight,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { simulateReaction, ReactionResult } from './services/geminiService';
import { CHEMICALS, Chemical } from './constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [selectedChemicals, setSelectedChemicals] = useState<Chemical[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<ReactionResult | null>(null);
  const [showMolecular, setShowMolecular] = useState<Chemical | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Search & Autocomplete
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Experiment options
  const [concentration, setConcentration] = useState<'dilute' | 'concentrated'>('dilute');
  const [useIndicator, setUseIndicator] = useState(false);

  const addChemical = (chemical: Chemical) => {
    if (selectedChemicals.length >= 2) {
      setError("Please select exactly 2 chemicals for the reaction.");
      return;
    }
    if (selectedChemicals.find(c => c.id === chemical.id)) {
      setError("Chemical already added.");
      return;
    }
    setSelectedChemicals([...selectedChemicals, chemical]);
    setSearchQuery('');
    setShowSuggestions(false);
    setError(null);
  };

  const removeChemical = (id: string) => {
    setSelectedChemicals(selectedChemicals.filter(c => c.id !== id));
    setResult(null);
  };

  const handleSimulate = async () => {
    if (selectedChemicals.length !== 2) {
      setError("Please select exactly 2 chemicals.");
      return;
    }
    
    setIsSimulating(true);
    setResult(null);
    setError(null);
    
    try {
      const data = await simulateReaction(
        selectedChemicals.map(c => ({ name: c.name, formula: c.formula, category: c.category })),
        { concentration, useIndicator }
      );
      setResult(data);
    } catch (err) {
      setError("Failed to simulate reaction. Please try again.");
    } finally {
      setIsSimulating(false);
    }
  };

  const clearLab = () => {
    setSelectedChemicals([]);
    setResult(null);
    setError(null);
  };

  const filteredChemicals = CHEMICALS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.formula.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  const categories = ['Acid', 'Base', 'Salt', 'Metal', 'Non-metal', 'Oxide', 'Organic', 'Other'] as const;

  const formatFormula = (formula: string) => {
    return formula.split('').map((char, i) => {
      if (/[0-9]/.test(char)) {
        return <sub key={i} className="text-[0.8em] bottom-0">{char}</sub>;
      }
      return char;
    });
  };

  const formatEquation = (equation: string) => {
    if (equation === "No Reaction") return equation;
    return equation.split(' ').map((word, i) => {
      // If it's a chemical formula (contains letters)
      if (/[A-Z]/.test(word)) {
        return <span key={i} className="mr-1">{formatFormula(word)}</span>;
      }
      return <span key={i} className="mr-1">{word}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <FlaskConical className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">CheLab</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Professor's Virtual Lab</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={clearLab}
              className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              Reset Lab
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel: Inventory & Search */}
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-semibold flex items-center gap-2">
                <Search className="w-4 h-4 text-indigo-600" />
                Find Chemicals
              </h2>
            </div>
            
            <div className="p-4 relative">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search name or formula..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>

              {/* Autocomplete Suggestions */}
              <AnimatePresence>
                {showSuggestions && searchQuery && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-4 right-4 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    {filteredChemicals.length > 0 ? (
                      filteredChemicals.map(chem => (
                        <button
                          key={chem.id}
                          onClick={() => addChemical(chem)}
                          className="w-full px-4 py-3 text-left hover:bg-indigo-50 flex items-center justify-between group transition-colors"
                        >
                          <div>
                            <div className="text-sm font-bold text-slate-800">{chem.name}</div>
                            <div className="text-[10px] font-mono text-slate-500">{chem.formula}</div>
                          </div>
                          <Plus className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-slate-400 italic">No matches found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-2 max-h-[calc(100vh-400px)] overflow-y-auto custom-scrollbar border-t border-slate-100">
              {categories.map(cat => (
                <div key={cat} className="mb-4">
                  <h3 className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{cat}s</h3>
                  <div className="grid grid-cols-1 gap-1">
                    {CHEMICALS.filter(c => c.category === cat).slice(0, 5).map((chem) => (
                      <div
                        key={chem.id}
                        onClick={() => addChemical(chem)}
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all text-left border border-transparent hover:border-slate-200 cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && addChemical(chem)}
                      >
                        <div>
                          <div className="font-medium text-sm text-slate-800">{chem.name}</div>
                          <div className="text-xs font-mono text-slate-500">{formatFormula(chem.formula)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                           <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowMolecular(chem);
                            }}
                            className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-all"
                            title="View Structure"
                          >
                            <Atom className="w-4 h-4" />
                          </button>
                          <div className="p-1.5 bg-slate-100 text-slate-400 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <Plus className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Middle Panel: Lab Bench */}
        <div className="lg:col-span-6 space-y-6">
          <section className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 min-h-[500px] flex flex-col relative overflow-hidden">
            {/* Lab Bench Surface */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-slate-100/50 border-t border-slate-200 pointer-events-none" />
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-slate-800">Experiment Bench</h2>
                <div className="flex gap-2">
                  <button
                    disabled={selectedChemicals.length === 0 || isSimulating}
                    onClick={handleSimulate}
                    className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:shadow-none transition-all"
                  >
                    {isSimulating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4 fill-current" />
                    )}
                    {isSimulating ? "Simulating..." : "Mix & React"}
                  </button>
                </div>
              </div>

              {/* Lab Controls */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Concentration</label>
                  <div className="flex p-1 bg-slate-200 rounded-lg">
                    {(['dilute', 'concentrated'] as const).map(c => (
                      <button
                        key={c}
                        onClick={() => setConcentration(c)}
                        className={cn(
                          "flex-1 py-1.5 text-xs font-semibold rounded-md transition-all capitalize",
                          concentration === c ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Indicator</label>
                  <button
                    onClick={() => setUseIndicator(!useIndicator)}
                    className={cn(
                      "w-full py-2.5 text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-2",
                      useIndicator 
                        ? "bg-pink-50 border-pink-200 text-pink-600" 
                        : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                    )}
                  >
                    <div className={cn("w-2 h-2 rounded-full", useIndicator ? "bg-pink-500 animate-pulse" : "bg-slate-300")} />
                    Phenolphthalein
                  </button>
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}

              {/* Test Tubes Display */}
              <div className="flex-1 flex items-end justify-center gap-8 pb-12 relative z-10">
                <AnimatePresence mode="popLayout">
                  {selectedChemicals.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-slate-400 max-w-xs"
                    >
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TestTube className="w-8 h-8" />
                      </div>
                      <p className="text-sm">Select chemicals from the inventory to start your experiment.</p>
                    </motion.div>
                  ) : (
                    <div className="flex items-end gap-8">
                      {/* If reaction happened, show a single "Result" beaker or keep tubes? 
                          The user request implies "Trộn" (Mix), so usually they mix into one.
                          Let's show the individual tubes, but if result exists, show a "Mixed Result" beaker.
                      */}
                      {!result ? (
                        selectedChemicals.map((chem) => (
                          <motion.div
                            key={chem.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            className="relative group"
                          >
                            <div className="relative w-16 h-48 border-4 border-slate-200 rounded-b-full bg-white/30 backdrop-blur-sm overflow-hidden flex flex-col justify-end">
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: '60%' }}
                                className={cn("w-full transition-all duration-500", chem.color)}
                              />
                              {/* Indicator Overlay */}
                              {useIndicator && chem.category === 'Base' && (
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 0.4 }}
                                  className="absolute inset-0 bg-pink-500"
                                />
                              )}
                            </div>
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                              <span className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold shadow-sm">
                                {formatFormula(chem.formula)}
                              </span>
                            </div>
                            <button
                              onClick={() => removeChemical(chem.id)}
                              className="absolute -right-2 -top-2 p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-red-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative"
                        >
                          <div className="relative w-32 h-48 border-4 border-slate-300 rounded-b-3xl bg-white/40 backdrop-blur-md overflow-hidden flex flex-col justify-end shadow-2xl">
                            {/* Solution Color */}
                            <div 
                              className="w-full h-[70%] transition-colors duration-1000"
                              style={{ backgroundColor: result.hex_color }}
                            />
                            
                            {/* Gas Bubbles */}
                            {result.has_gas && (
                              <div className="absolute inset-0 pointer-events-none">
                                {[...Array(12)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ y: 150, opacity: 0 }}
                                    animate={{ 
                                      y: [150, 20], 
                                      opacity: [0, 1, 0],
                                      x: Math.sin(i) * 10
                                    }}
                                    transition={{ 
                                      duration: 1.5 + Math.random(), 
                                      repeat: Infinity,
                                      delay: Math.random() * 2
                                    }}
                                    className="absolute w-1.5 h-1.5 bg-white/60 rounded-full border border-white/20"
                                    style={{ left: `${20 + Math.random() * 60}%` }}
                                  />
                                ))}
                              </div>
                            )}

                            {/* Precipitate */}
                            {result.has_precipitate && (
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: '20%' }}
                                className="absolute bottom-0 left-0 right-0 border-t border-black/5"
                                style={{ backgroundColor: result.precipitate_color || '#ddd' }}
                              />
                            )}
                          </div>
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-lg">
                              Reaction Result
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Reaction Result Overlay */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 p-8 overflow-y-auto"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-indigo-900 mb-1">Reaction Result</h3>
                      <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-mono inline-block">
                        {formatEquation(result.equation)}
                      </div>
                    </div>
                    <button 
                      onClick={() => setResult(null)}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-slate-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <section>
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          Observations
                        </h4>
                        <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          {result.phenomena}
                        </p>
                      </section>

                      <section>
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Atom className="w-4 h-4" />
                          Product Properties
                        </h4>
                        <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          {result.properties}
                        </p>
                      </section>

                      <section className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                        <h4 className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4" />
                          Safety Warning
                        </h4>
                        <p className="text-sm text-amber-700">{result.safetyWarning}</p>
                      </section>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        Visual Simulation
                      </h4>
                      <div className="aspect-square rounded-3xl bg-slate-100 overflow-hidden border border-slate-200 relative group">
                        <img 
                          src={`https://picsum.photos/seed/${encodeURIComponent(result.imageDescription)}/600/600`}
                          alt="Reaction result"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                          <p className="text-white text-xs italic">{result.imageDescription}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* Right Panel: Info & History */}
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600" />
              Lab Assistant
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <p>Welcome to the Virtual Smart Lab. Here you can simulate chemical reactions safely using AI.</p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  Add exactly 2 chemicals to the bench.
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  Click "Mix & React" to see the results.
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  View molecular structures by clicking the atom icon.
                </li>
              </ul>
            </div>
          </section>

          {/* Quick Stats/Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
              <div className="text-indigo-600 font-bold text-xl">{selectedChemicals.length}</div>
              <div className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider">Active Agents</div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <div className="text-emerald-600 font-bold text-xl">{CHEMICALS.length}</div>
              <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Total Library</div>
            </div>
          </div>
        </div>
      </main>

      {/* Molecular Structure Modal */}
      <AnimatePresence>
        {showMolecular && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowMolecular(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{showMolecular.name}</h3>
                  <p className="text-sm font-mono text-indigo-600">{formatFormula(showMolecular.formula)}</p>
                </div>
                <button 
                  onClick={() => setShowMolecular(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="p-8">
                <div className="aspect-video bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden mb-6 group">
                  <img 
                    src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(showMolecular.name)}/PNG`}
                    alt={`${showMolecular.name} structure`}
                    className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x300?text=${showMolecular.formula}+Structure`;
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Atom className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="text-xs text-indigo-700 font-medium">
                      Molecular structure fetched from PubChem database.
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The molecular structure of {showMolecular.name} ({showMolecular.formula}) defines its chemical properties and reactivity in the lab.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setShowMolecular(null)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}} />
    </div>
  );
}
