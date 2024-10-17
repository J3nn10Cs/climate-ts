import { ReactNode } from "react";


export default function Alert({children} : {children : ReactNode}) {
  return (
    <div className="bg-red-600 text-white text-sm font-bold rounded-3xl p-3">
      {children}
    </div>
  )
}
