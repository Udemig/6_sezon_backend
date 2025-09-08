const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("tr", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export { formatDate };
