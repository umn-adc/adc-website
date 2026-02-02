import { useRef } from "react";
import { motion, useInView } from "motion/react";

type Value = {
  icon: React.FC;
  title: string;
  description: string;
  color: string;
}

export type ValueCardProps = {value: Value; index: number;}

const ValueCard: React.FC<ValueCardProps> = ({value, index}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div
        className={`relative p-8 rounded-3xl ${value.color} border border-border/50 h-full transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl`}
      >
        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center mb-6 shadow-sm"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <value.icon className="w-7 h-7 text-primary" />
        </motion.div>

        {/* Content */}
        <h3 className="font-sans text-xl font-bold text-foreground mb-3">
          {value.title}
        </h3>
        <p className="font-serif text-muted-foreground leading-relaxed">
          {value.description}
        </p>

        {/* Decorative corner - ADC star */}
        <div className="absolute top-4 right-4 w-8 h-8 opacity-20">
          <img src="/adc-star-indigo.svg" alt="" className="w-full h-full" />
        </div>
      </div>
    </motion.div>
  );
}

export default ValueCard;