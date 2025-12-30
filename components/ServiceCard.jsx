export default function ServiceCard({title,desc}){
  return (
    <article className="p-6 border rounded-lg">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2">{desc}</p>
    </article>
  )
}
