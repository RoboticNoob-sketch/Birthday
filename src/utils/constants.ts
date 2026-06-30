export const PHOTO_PLACEHOLDERS = Array.from({ length: 20 }, (_, index) => ({
  label: `Memory ${index + 1}`,
  src: `/assets/photos/photo-${index + 1}.jpg`,
}));
