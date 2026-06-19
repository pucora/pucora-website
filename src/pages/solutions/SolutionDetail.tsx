import { useParams, Navigate } from 'react-router-dom'
import { SolutionPageTemplate } from '../../components/templates/SolutionPageTemplate'
import { getSolutionBySlug } from '../../content/solutions'

export function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>()
  const solution = slug ? getSolutionBySlug(slug) : undefined

  if (!solution) return <Navigate to="/solutions" replace />

  return <SolutionPageTemplate solution={solution} />
}
