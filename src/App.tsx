import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PageLayout } from './components/layout/PageLayout'
import { Home } from './pages/Home'
import { GetStarted } from './pages/GetStarted'
import { Downloads } from './pages/Downloads'
import { NotFound } from './pages/NotFound'
import { ProductsIndex } from './pages/products/ProductsIndex'
import { ProductDetail } from './pages/products/ProductDetail'
import { SolutionsIndex } from './pages/solutions/SolutionsIndex'
import { SolutionDetail } from './pages/solutions/SolutionDetail'
import { FeaturesIndex } from './pages/features/FeaturesIndex'
import { FeatureDetail } from './pages/features/FeatureDetail'
import { ResourcesIndex } from './pages/resources/ResourcesIndex'
import { Documentation } from './pages/resources/Documentation'
import { Community } from './pages/resources/Community'
import { DocsLayout } from './components/docs/DocsLayout'
import { DocPage, DocsIndex } from './components/docs/DocPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'get-started', element: <GetStarted /> },
      { path: 'downloads', element: <Downloads /> },
      { path: 'products', element: <ProductsIndex /> },
      { path: 'products/:slug', element: <ProductDetail /> },
      { path: 'solutions', element: <SolutionsIndex /> },
      { path: 'solutions/:slug', element: <SolutionDetail /> },
      { path: 'features', element: <FeaturesIndex /> },
      { path: 'features/:slug', element: <FeatureDetail /> },
      { path: 'resources', element: <ResourcesIndex /> },
      { path: 'resources/documentation', element: <Documentation /> },
      { path: 'resources/community', element: <Community /> },
      {
        path: 'docs',
        element: <DocsLayout />,
        children: [
          { index: true, element: <DocsIndex /> },
          { path: '*', element: <DocPage /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
