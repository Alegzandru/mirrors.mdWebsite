import { useRouter } from 'next/router'

export default function Comanda() {
  const router = useRouter()
  console.log(router.query);
  return (
      <div>
        <div>
            Status : {router.query.status}
        </div>
        <div>
            Id comanda : {router.query.id}
        </div>
      </div>
  )
}
