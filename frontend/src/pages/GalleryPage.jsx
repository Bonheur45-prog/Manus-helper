import React, { useEffect, useState } from 'react'
import Card, { SectionTitle } from '../components/Card.jsx'

const rawApiUrl = import.meta.env.VITE_API_URL
const cleanedApiUrl = rawApiUrl ? rawApiUrl.replace(/\/+$/, '') : ''
const API_BASE = cleanedApiUrl
  ? /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(cleanedApiUrl)
    ? cleanedApiUrl
    : `http://${cleanedApiUrl}`
  : 'http://localhost:3001'

const transformCloudinaryUrl = (url) => {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url
  return url.replace('/upload/', '/upload/f_auto,q_auto/')
}

const categories = [
  { id: 'architecture', label: 'Architecture', color: '#F15A22' },
  { id: 'interior-design', label: 'Interior Design', color: '#1B3A6B' },
  { id: 'construction', label: 'Construction', color: '#8A9BA8' },
  { id: 'before-after', label: 'Before & After', color: '#D4A853' },
  { id: 'team', label: 'Team', color: '#F15A22' },
  { id: 'branding', label: 'Branding & Logo', color: '#1B3A6B' },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('architecture')
  const [gallery, setGallery] = useState({})
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [failedImages, setFailedImages] = useState({})

  const refreshGallery = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/gallery`)
      const data = await response.json()
      setGallery(data.gallery || {})
      setLoading(false)
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Unable to load gallery data from backend.' })
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshGallery()
  }, [])

  const currentImages = gallery[activeCategory] || []

  const showMessage = (type, text) => {
    setStatusMessage({ type, text })
    setTimeout(() => setStatusMessage(null), 3000)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      showMessage('error', 'Please select an image to upload.')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('category', activeCategory)

      const res = await fetch(`${API_BASE}/api/gallery/upload`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')

      setGallery(data.gallery)
      setSelectedFile(null)
      showMessage('success', 'Image uploaded successfully.')
    } catch (error) {
      showMessage('error', error.message || 'Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (publicId) => {
    if (!window.confirm('Delete this image from Cloudinary?')) return

    try {
      const res = await fetch(`${API_BASE}/api/gallery`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: activeCategory, publicId }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Delete failed')

      setGallery(data.gallery)
      showMessage('success', 'Image deleted successfully.')
    } catch (error) {
      showMessage('error', error.message || 'Delete failed.')
    }
  }

  const handleCopyUrl = async (url) => {
    await navigator.clipboard.writeText(url)
    showMessage('success', 'Image URL copied.')
  }

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      <Card accent>
        <SectionTitle tag="Gallery Admin">Cloudinary Gallery</SectionTitle>
        <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '20px', lineHeight: '1.6' }}>
          Upload and manage gallery images directly from the dashboard. This page controls the backend gallery data that Manus will use.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {categories.map((cat) => {
            const count = (gallery[cat.id] || []).length
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '10px',
                  border: `1px solid ${activeCategory === cat.id ? cat.color : 'var(--border-dim)'}`,
                  background: activeCategory === cat.id ? `${cat.color}18` : 'transparent',
                  color: activeCategory === cat.id ? cat.color : 'var(--gray)',
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat.label}
                <span style={{
                  marginLeft: '8px',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '10px',
                  background: 'var(--dark2)',
                  color: 'var(--steel)',
                }}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'grid', gap: '12px' }}>
            <label style={{ fontFamily: 'var(--font-condensed)', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--steel)' }}>
              Upload new image to {categories.find((c) => c.id === activeCategory)?.label}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid var(--border-dim)',
                background: 'var(--dark2)',
                color: 'var(--white)',
                fontSize: '13px',
              }}
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              style={{
                width: 'fit-content',
                padding: '12px 22px',
                borderRadius: '10px',
                border: 'none',
                background: 'var(--orange)',
                color: 'var(--white)',
                fontFamily: 'var(--font-condensed)',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '1px',
                cursor: uploading ? 'not-allowed' : 'pointer',
              }}
            >
              {uploading ? 'UPLOADING...' : 'Upload Image'}
            </button>
            {selectedFile && (
              <div style={{ color: 'var(--gray)', fontSize: '12px' }}>{selectedFile.name}</div>
            )}
          </div>

          {statusMessage && (
            <div style={{
              padding: '14px',
              borderRadius: '12px',
              background: statusMessage.type === 'error' ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)',
              border: `1px solid ${statusMessage.type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
              color: statusMessage.type === 'error' ? '#fca5a5' : '#86efac',
              fontSize: '13px',
            }}>
              {statusMessage.text}
            </div>
          )}

          <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--dark2)', border: '1px solid var(--border-dim)' }}>
            <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--steel)', marginBottom: '8px' }}>
              Selected category details
            </div>
            <div style={{ color: 'var(--white)', fontSize: '14px' }}>{categories.find((c) => c.id === activeCategory)?.label}</div>
            <div style={{ color: 'var(--gray)', fontSize: '12px', marginTop: '4px' }}>
              {loading ? 'Loading gallery...' : currentImages.length === 0 ? 'No images yet.' : `${currentImages.length} image(s) available.`}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle tag="Images">Current Images</SectionTitle>

        {loading && (
          <div style={{ padding: '24px', borderRadius: '14px', background: 'var(--dark2)', color: 'var(--steel)', textAlign: 'center' }}>
            Loading gallery images…
          </div>
        )}

        {!loading && currentImages.length === 0 && (
          <div style={{ padding: '24px', borderRadius: '14px', background: 'var(--dark2)', color: 'var(--steel)', textAlign: 'center' }}>
            No images in this category yet. Upload one to get started.
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}>
          {currentImages.map((image) => {
            const rawUrl = image.url || image.secure_url || image.secureUrl || image.secureURL
            const imageUrl = transformCloudinaryUrl(rawUrl)
            const imageId = image.public_id || image.id || rawUrl
            const hasFailedToLoad = failedImages[imageId]

            return (
              <div key={imageId} style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--dark2)',
                border: '1px solid var(--border-dim)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.2s',
              }}>
                <div style={{ position: 'relative', flex: 1, minHeight: '190px', background: 'rgba(255,255,255,0.02)' }}>
                  {imageUrl && !hasFailedToLoad ? (
                    <img
                      src={imageUrl}
                      alt={image.public_id || image.id || 'Gallery image'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={() => setFailedImages({ ...failedImages, [imageId]: true })}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px', color: 'var(--steel)', fontSize: '13px', padding: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: '24px' }}>🖼️</div>
                      <div>{!imageUrl ? 'Invalid URL' : 'Image unavailable'}</div>
                      {imageUrl && (
                        <div style={{ fontSize: '11px', color: 'var(--gray)', marginTop: '8px', wordBreak: 'break-all', maxWidth: '100%' }}>
                          {imageUrl.substring(0, 50)}...
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div style={{ padding: '14px', display: 'grid', gap: '10px' }}>
                  <button
                    onClick={() => handleCopyUrl(rawUrl || '')}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--white)',
                      fontFamily: 'var(--font-condensed)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => handleDelete(image.public_id)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(239,68,68,0.25)',
                      background: 'rgba(239,68,68,0.08)',
                      color: '#fda4af',
                      fontFamily: 'var(--font-condensed)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(239,68,68,0.15)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(239,68,68,0.08)'}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
