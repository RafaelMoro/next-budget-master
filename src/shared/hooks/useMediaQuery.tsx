"use client"
export const useMediaQuery = () => {
  const isMobile = window.matchMedia('(min-width: 40rem) and (max-width: 48rem)').matches;
  return {
    isMobile
  }
}