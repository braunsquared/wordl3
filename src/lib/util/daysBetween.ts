const daysBetween = (from: number, to: number): number => {
  const delta = new Date(to).setHours(0, 0, 0, 0) - new Date(from).setHours(0, 0, 0, 0);
  return Math.round(delta / 86400000);
};

export default daysBetween;
