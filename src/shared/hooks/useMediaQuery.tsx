"use client"
export const useMediaQuery = () => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  return {
    isMobile
  }
}