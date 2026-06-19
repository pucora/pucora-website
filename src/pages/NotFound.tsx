import { motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import { PageMeta } from '../components/ui/PageMeta'
import { Button } from '../components/ui/Button'
import { LazyThreeCanvasWrapper as ThreeCanvas } from '../components/three/LazyThreeCanvas'

export function NotFound() {
  return (
    <>
      <PageMeta title="Page Not Found" description="The page you are looking for does not exist." />
      <section className="relative flex min-h-[60vh] items-center overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <ThreeCanvas variant="background" interactive={false} className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/50 to-navy" />
        <Container className="relative text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-8xl font-extrabold text-gradient md:text-9xl"
              animate={{ textShadow: ['0 0 20px rgba(0,212,170,0.3)', '0 0 60px rgba(0,212,170,0.5)', '0 0 20px rgba(0,212,170,0.3)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              404
            </motion.h1>
            <p className="mt-4 text-xl text-muted">Page not found</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              The gateway route you requested does not exist.
            </p>
            <div className="mt-8">
              <Button href="/">Back to Home</Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
