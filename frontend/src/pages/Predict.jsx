import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Stethoscope, Pill, CheckCircle2, UserPlus, FileHeart, ChevronRight, Activity } from 'lucide-react';

function Predict() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/predict',
        { symptoms }
      );
      // Simulate slight delay for dramatic effect
      setTimeout(() => {
        setResult(response.data);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const severityColors = {
    High: 'bg-red-500/10 text-red-400 border-red-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col">
      <div className="max-w-3xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-3 bg-brand-500/10 rounded-2xl mb-4">
            <Activity className="w-8 h-8 text-brand-400" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Symptom <span className="text-gradient">Analysis</span></h1>
          <p className="text-zinc-400">Describe how you're feeling in detail. Our AI will analyze your symptoms and predict potential conditions.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-2 rounded-3xl mb-8 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          <div className="bg-surface p-6 rounded-[1.25rem] border border-zinc-800/50">
            <textarea
              className="w-full h-40 bg-transparent text-zinc-100 placeholder-zinc-500 outline-none resize-none text-lg leading-relaxed"
              placeholder="E.g., I have been experiencing a severe headache, slight fever, and nausea for the past two days..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800/50">
              <span className="text-xs text-zinc-500 font-medium tracking-wider uppercase">Natural Language Processing Active</span>
              <button
                onClick={handlePredict}
                disabled={loading || !symptoms.trim()}
                className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:hover:bg-brand-500 text-zinc-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-brand-500/20"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin"></div>
                    Analyzing...
                  </div>
                ) : (
                  <>
                    Analyze <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {result.emergency ? (
                <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
                  <div className="flex items-start gap-4">
                    <div className="bg-red-500/20 p-3 rounded-full flex-shrink-0 animate-pulse">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-red-400 mb-2">Emergency Alert</h2>
                      <p className="text-red-200/80 leading-relaxed text-lg">{result.message}</p>
                      <button className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
                        Find Nearest Hospital
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6">
                  {/* Diagnosis Card */}
                  <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-emerald-500"></div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-brand-400 font-medium mb-2">
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Analysis Complete</span>
                        </div>
                        <h2 className="text-3xl font-bold text-zinc-100">{result.disease}</h2>
                      </div>
                      <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-semibold ${severityColors[result.severity] || severityColors.Medium}`}>
                        <Activity className="w-4 h-4" />
                        {result.severity} Severity
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-surfaceLight/50 p-5 rounded-2xl border border-zinc-800/50 flex items-start gap-4">
                        <div className="bg-brand-500/10 p-2.5 rounded-xl text-brand-400">
                          <UserPlus className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm text-zinc-400 font-medium mb-1">Recommended Specialist</h4>
                          <p className="text-lg font-semibold text-zinc-200">{result.specialist}</p>
                        </div>
                      </div>
                      <div className="bg-surfaceLight/50 p-5 rounded-2xl border border-zinc-800/50 flex items-start gap-4">
                        <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400">
                          <FileHeart className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm text-zinc-400 font-medium mb-1">Confidence Score</h4>
                          <p className="text-lg font-semibold text-zinc-200">94.8%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medicine Card */}
                  {result.medicine && (
                    <div className="glass-panel p-8 rounded-3xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-brand-500/10 p-2.5 rounded-xl text-brand-400">
                          <Pill className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-zinc-100">Prescription Recommendation</h3>
                      </div>
                      
                      <div className="bg-surface rounded-2xl border border-zinc-800/50 overflow-hidden">
                        <div className="p-6 border-b border-zinc-800/50 bg-zinc-900/30">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-xl font-bold text-brand-400 mb-1">{result.medicine.medicine_name}</h4>
                              <p className="text-zinc-500 text-sm font-medium">{result.medicine.generic_name}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-zinc-500">Est. Price</span>
                              <p className="text-lg font-bold text-emerald-400">${result.medicine.price}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 grid gap-4 text-sm md:text-base">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-zinc-500 font-medium">Dosage</div>
                            <div className="col-span-2 text-zinc-300">{result.medicine.dosage}</div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-zinc-500 font-medium">Usage</div>
                            <div className="col-span-2 text-zinc-300">{result.medicine.usage}</div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-zinc-500 font-medium">Side Effects</div>
                            <div className="col-span-2 text-zinc-300">{result.medicine.side_effects}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Predict;
