import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink, FileText, Sparkles } from 'lucide-react'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl?: string
}

export default function ResumeModal({
  isOpen,
  onClose,
  pdfUrl = '/cv.pdf'
}: ResumeModalProps) {
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-background/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[88vh] md:h-[86vh] bg-card text-card-foreground rounded-3xl overflow-hidden shadow-2xl border border-border/80 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/80 bg-secondary/30 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      Ranit Mondal
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      <Sparkles className="w-3 h-3" /> CV / Resume
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Curriculum Vitae • Backend & Full Stack Developer
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Tab</span>
                </a>

                <a
                  href={pdfUrl}
                  download="Ranit_Mondal_CV.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-secondary/60 hover:bg-secondary text-foreground transition-colors border border-border/50 ml-1"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="flex-1 w-full bg-secondary/10 relative overflow-hidden flex flex-col">
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
                title="Ranit Mondal Resume PDF"
                className="w-full h-full border-none rounded-b-3xl"
              />

              {/* Fallback info notice if browser fails to render iframe PDF */}
              <div className="sm:hidden p-3 bg-secondary/50 border-t border-border text-center text-xs text-muted-foreground flex items-center justify-between">
                <span>Can't view PDF on mobile?</span>
                <a
                  href={pdfUrl}
                  download="Ranit_Mondal_CV.pdf"
                  className="font-bold text-primary underline ml-2"
                >
                  Download Directly
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
