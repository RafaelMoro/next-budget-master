"use client"
export const useMediaQuery = () => {
  // Value obtained based on tailwind where md is equivalent to 768px
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  return {
    isMobile
  }
}