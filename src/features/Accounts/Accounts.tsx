import Image from "next/image"

export const Account = () => {
  return (
    <article className="p-2 rounded-3xl card-gradient-bg flex flex-col justify-between max-w-64 min-h-40">
      <span className="text-lg">Santander</span>
      <div>
        <h5 className="text-2xl font-semibold">$12,640.54</h5>
        <div className="flex justify-between mx-2 mb-1">
          <p className="text-sm text-gray-400">Debito **0762</p>
          <Image src="/img/amex-logo.svg" alt="Budget Master Logo" width={40} height={40} />
        </div>
      </div>
    </article>
  )
}