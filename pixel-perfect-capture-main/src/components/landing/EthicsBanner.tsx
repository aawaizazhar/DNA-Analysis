import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const EthicsBanner = () => (
  <section className="py-8 relative z-10">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-warning/10 border border-warning/20"
      >
        <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning" />
        <p className="text-sm font-medium text-muted-foreground">
          This platform is strictly intended for educational and research purposes. It does not provide clinical diagnosis, medical advice, or treatment recommendations.
        </p>
      </motion.div>
    </div>
  </section>
);

export default EthicsBanner;
