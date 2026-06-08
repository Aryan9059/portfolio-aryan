'use client';

export default function Gallery() {
  return (
    <section id="gallery" className="section" style={{ background: 'var(--paper)', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h2 className="display" style={{ fontSize: 'clamp(80px, 15vw, 200px)', lineHeight: 0.8, color: 'var(--ink)', textAlign: 'right', marginBottom: 40 }}>
          GALLERY
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 80 }}>
          <p style={{ maxWidth: 400, color: 'var(--ink)', opacity: 0.8, fontSize: 18, lineHeight: 1.5 }}>
            Explore a curated collection of interfaces and motion design. From intimate micro-interactions to grandiose system architectures, witness the power of deliberate engineering.
          </p>
          <button className="btn-outline" style={{ borderColor: 'var(--ink)', color: 'var(--ink)' }}>
            View All ↗
          </button>
        </div>
        
        <div style={{ width: '100%', height: '60vh', borderRadius: '32px', overflow: 'hidden', marginBottom: 40 }}>
          <img 
            src="/images/gallery_water_1780906342603.png" 
            alt="Gallery Main" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          <div style={{ aspectRatio: '1', borderRadius: '32px', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: '#2a2a2a' }}></div>
          </div>
          <div style={{ aspectRatio: '1', borderRadius: '32px', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: '#333' }}></div>
          </div>
          <div style={{ aspectRatio: '1', borderRadius: '32px', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: '#444' }}></div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
          <button style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', background: 'transparent' }}>
            ←
          </button>
          <button style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', background: 'transparent' }}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}
