
export const slideInFromLeft = "animate-in slide-in-from-left duration-500";
export const slideInFromRight = "animate-in slide-in-from-right duration-500";
export const slideInFromTop = "animate-in slide-in-from-top duration-500";
export const slideInFromBottom = "animate-in slide-in-from-bottom duration-500";
export const fadeIn = "animate-in fade-in duration-500";
export const scaleIn = "animate-in zoom-in-50 duration-500";

export const staggeredChildren = (base: string, delayStart = 0, interval = 100) => {
  return (index: number) => {
    const delay = delayStart + index * interval;
    return `${base} delay-${delay}`;
  };
};
