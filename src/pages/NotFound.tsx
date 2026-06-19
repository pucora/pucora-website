import { Container } from '../components/ui/Container'
import { PageMeta } from '../components/ui/PageMeta'
import { Button } from '../components/ui/Button'
import { PucoraLogoImage } from '../components/ui/PucoraLogoImage'

export function NotFound() {
  return (
    <>
      <PageMeta title="Page Not Found" description="The page you are looking for does not exist." />
      <section className="flex min-h-[60vh] items-center bg-background py-20">
        <Container className="text-center">
          <PucoraLogoImage size="lg" blend className="mx-auto mb-8 opacity-70" />
          <h1 className="text-6xl font-semibold tracking-tight text-foreground">404</h1>
          <p className="mt-4 text-xl text-subtle">Page not found</p>
          <div className="mt-8">
            <Button href="/">Back to Home</Button>
          </div>
        </Container>
      </section>
    </>
  )
}
