const projects = [
  {
    id: 1,
    name: 'Hiei Dragon',
    status: 'Pintura'
  }
]

export function ProductionProjectList() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Projetos
      </h2>

      {projects.map((project) => (
        <div
          key={project.id}
          className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
        >
          <div className="font-semibold">
            {project.name}
          </div>

          <div className="text-sm text-zinc-400">
            {project.status}
          </div>
        </div>
      ))}
    </div>
  )
}