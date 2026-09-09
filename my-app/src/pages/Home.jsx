import { useEffect, useMemo, useState } from 'react'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ProjectModal from '../components/ProjectModal'
import Services from '../components/Services'
import Work from '../components/Work'
import { designer, projects } from '../data/portfolio'
import { absoluteMediaUrl, listMedia } from '../lib/mediaApi'

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [uploadedItems, setUploadedItems] = useState([])

  useEffect(() => {
    let cancelled = false
    listMedia()
      .then((items) => {
        if (cancelled) return
        setUploadedItems(Array.isArray(items) ? items : [])
      })
      .catch(() => {
        // Ignore: the portfolio should still work without the backend running.
      })

    return () => {
      cancelled = true
    }
  }, [])

  const uploadedProjects = useMemo(() => {
    return uploadedItems
      .map((item) => {
        const fallbackYear = item.createdAt
          ? String(new Date(item.createdAt).getFullYear())
          : ''
        const year = item.year || fallbackYear || '—'
        const common = {
          id: `u_${item.id}`,
          title: item.title || item.originalName || 'Uploaded',
          client: item.client || 'Uploaded',
          year,
          tags:
            Array.isArray(item.tags) && item.tags.length ? item.tags : ['Upload'],
          description:
            item.description || item.originalName || item.title || 'Uploaded media',
        }

        if (item.kind === 'image' || item.mimetype?.startsWith('image/')) {
          return {
            ...common,
            type: 'image',
            imageUrl: absoluteMediaUrl(item),
          }
        }

        if (item.kind === 'video' || item.mimetype?.startsWith('video/')) {
          return {
            ...common,
            type: 'video',
            videoUrl: absoluteMediaUrl(item),
          }
        }

        return null
      })
      .filter(Boolean)
  }, [uploadedItems])

  const allProjects = useMemo(() => {
    if (!uploadedProjects.length) return projects
    return [...uploadedProjects, ...projects]
  }, [uploadedProjects])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return allProjects
    return allProjects.filter((p) => p.type === activeFilter)
  }, [activeFilter, allProjects])

  const stats = useMemo(() => {
    const total = allProjects.length
    const video = allProjects.filter((p) => p.type === 'video').length
    const image = allProjects.filter((p) => p.type === 'image').length
    return { total, video, image }
  }, [allProjects])

  return (
    <div className="min-h-[100svh] bg-[radial-gradient(circle_at_10%_10%,rgba(168,85,247,0.30),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,0.25),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(244,63,94,0.18),transparent_40%)]">
      <Header
        designer={designer}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />

      <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero designer={designer} stats={stats} />
        <Work
          projects={filteredProjects}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onOpenProject={setSelectedProject}
        />
        <Services />
        <About />
        <Contact designer={designer} />
      </main>

      <Footer designer={designer} />

      <ProjectModal
        designer={designer}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
