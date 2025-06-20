import { OverviewButtonGroup } from "../Overview/OverviewButtonGroup"

export const OverviewScreen = () => {
  return (
    <main className="w-full pl-4 pt-4 min-w-xl mt-3 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-4xl text-center font-bold col-span-3">Panorama general</h1>
      <OverviewButtonGroup />
    </main>
  )
}