export const formatName = (fullName: string) => {
  const parts = fullName.trim().split(" ");
  if (parts.length <= 2) return fullName;
  return `${parts[0]} ${parts
    .slice(1, -1)
    .map(p => p[0] + ".")
    .join(" ")} ${parts[parts.length - 1]}`;
};