import { useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileImage, CheckCircle2, ChevronRight, RefreshCw, FileText, Pill } from 'lucide-react';

function PrescriptionScanner() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const uploadPrescription = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/scan-prescription',
        formData
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-3 bg-brand-500/10 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-brand-400" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Prescription <span className="text-gradient">Scanner</span></h1>
          <p className="text-zinc-400">Upload your prescription image. Our AI will extract the text and identify the prescribed medicines instantly.</p>
        </motion.div>

        {!result ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-2 rounded-3xl"
          >
            <div 
              className={`relative bg-surface rounded-[1.25rem] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-12 text-center
                ${dragActive ? 'border-brand-500 bg-brand-500/5' : 'border-zinc-700/50 hover:border-brand-500/30'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />

              {!file ? (
                <>
                  <div className="bg-zinc-800/50 p-4 rounded-full mb-6">
                    <UploadCloud className="w-10 h-10 text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100 mb-2">Drag & Drop Image</h3>
                  <p className="text-zinc-400 mb-6">or click to browse from your device</p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold px-6 py-2.5 rounded-xl transition-colors border border-zinc-700/50"
                  >
                    Select Image
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-emerald-500/10 p-4 rounded-full mb-6">
                    <FileImage className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100 mb-2">{file.name}</h3>
                  <p className="text-zinc-400 mb-6 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={clearFile}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold px-6 py-2.5 rounded-xl transition-colors border border-zinc-700/50"
                    >
                      Remove
                    </button>
                    <button 
                      onClick={uploadPrescription}
                      disabled={loading}
                      className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:hover:bg-brand-500 text-zinc-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-brand-500/20"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Analyze <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-6"
            >
              <div className="flex justify-end mb-2">
                 <button 
                    onClick={clearFile}
                    className="flex items-center gap-2 text-zinc-400 hover:text-brand-400 transition-colors text-sm font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Scan Another Image
                  </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Medicines Found */}
                <div className="md:col-span-1 glass-card p-6 rounded-3xl h-fit">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-brand-500/10 p-2 rounded-xl text-brand-400">
                      <Pill className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-zinc-100">Medicines Found</h2>
                  </div>

                  {result.medicines && result.medicines.length > 0 ? (
                    <ul className="space-y-3">
                      {result.medicines.map((med, index) => (
                        <li 
                          key={index}
                          className="bg-surface p-4 rounded-xl border border-brand-500/20 flex items-center gap-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span className="font-semibold text-brand-100">{med}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="bg-surface p-4 rounded-xl border border-zinc-800/50 text-center text-zinc-500">
                      No specific medicines found from pattern.
                    </div>
                  )}
                </div>

                {/* Raw Text */}
                <div className="md:col-span-2 glass-panel p-6 rounded-3xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100">OCR Extracted Text</h3>
                  </div>

                  <div className="bg-surface border border-zinc-800/50 rounded-2xl p-6 h-[400px] overflow-y-auto custom-scrollbar relative">
                    <pre className="font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                      {result.raw_text}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default PrescriptionScanner;
