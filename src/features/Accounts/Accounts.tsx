import Image from "next/image"

export const Account = () => {
  return (
    <article>
      <span>Santander</span>
      <div>
        <h5>$12,640.54</h5>
        <div>
          <p>Debito **0762</p>
          <Image src="/img/amex-logo.svg" alt="Budget Master Logo" width={30} height={30} />
        </div>
      </div>
    </article>
  )
}