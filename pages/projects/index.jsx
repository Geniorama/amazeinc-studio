
import { useRouter } from "next/router";

export default function Projects({locale, data, dataCats}) {
  const projects = data.data.projects.nodes
  const catsProjects = dataCats.data.categoriesProject.edges

  const router = useRouter()
  
}

