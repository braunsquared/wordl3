const nth = (d: number) => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = d % 100;
  return `${d}${suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]}`;
};

export default nth;
