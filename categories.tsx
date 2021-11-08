export const allCategories = [
  {
    id: "1",
    label: "مالی",
  },
  {
    id: "2",
    label: "استارتاپ",
  },
];

export function getCategory(id: string) {
  return allCategories.find((category) => category.id === id)!;
}
