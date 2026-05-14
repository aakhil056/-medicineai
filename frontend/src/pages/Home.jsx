import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, FileText, Activity, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative w-full flex-1 flex flex-col items-center overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-brand-900/40 rounded-full mix-blend-screen filter blur-[120px] animate-blob" style={{ animationDelay: '4s' }}></div>

      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6 flex items-center gap-2 bg-brand-900/30 border border-brand-500/20 rounded-full px-4 py-1.5 text-brand-300 text-sm font-medium backdrop-blur-sm">
          <Activity className="w-4 h-4" />
          <span>Next-Gen Healthcare AI</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Intelligent Medical <br className="hidden md:block" />
          <span className="text-gradient">Predictions & Analysis</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12">
          Empowering healthcare with advanced Natural Language Processing. Accurately predict diseases and analyze prescriptions instantly using our state-of-the-art AI models.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
          <Link
            to="/predict"
            className="group relative flex items-center justify-center gap-3 bg-brand-500 hover:bg-brand-400 text-zinc-950 font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <Stethoscope className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Start Prediction</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/scanner"
            className="group flex items-center justify-center gap-3 bg-surfaceLight hover:bg-zinc-700 text-white font-medium px-8 py-4 rounded-2xl border border-zinc-700/50 hover:border-zinc-500/50 transition-all hover:scale-105"
          >
            <FileText className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            <span>Prescription Scanner</span>
          </Link>
        </motion.div>

        <motion.div variants={containerVariants} className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl text-left hover:border-brand-500/30 transition-colors group">
            <div className="bg-brand-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-500/20 transition-colors">
              <Zap className="w-7 h-7 text-brand-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-100">Instant Results</h3>
            <p className="text-zinc-400 leading-relaxed">Our AI models process symptom data in milliseconds, providing you with immediate, accurate disease predictions.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl text-left hover:border-brand-500/30 transition-colors group">
            <div className="bg-brand-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-500/20 transition-colors">
              <ShieldCheck className="w-7 h-7 text-brand-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-100">Secure & Private</h3>
            <p className="text-zinc-400 leading-relaxed">Your medical queries are processed securely. We prioritize data privacy and do not store sensitive symptom information.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl text-left hover:border-brand-500/30 transition-colors group">
            <div className="bg-brand-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-500/20 transition-colors">
              <Stethoscope className="w-7 h-7 text-brand-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-100">Specialist Routing</h3>
            <p className="text-zinc-400 leading-relaxed">Not only do we predict the condition, but we also recommend the appropriate medical specialist you should consult.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
