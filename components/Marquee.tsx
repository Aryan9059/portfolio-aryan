'use client';

const items = [
    'Android Native',
    '✦',
    'Jetpack Compose',
    '✦',
    'Flutter',
    '✦',
    'Mobile-First',
    '✦',
    'Kotlin',
    '✦',
    'Production Ready',
    '✦',
    'Clean Architecture',
    '✦',
    'Design Systems',
    '✦',
];

const Marquee = ({ inverted = false }: { inverted?: boolean }) => {
    const doubled = [...items, ...items];

    return (
        <div
            style={{
                background: inverted ? 'var(--ink)' : 'var(--accent)',
                overflow: 'hidden',
                padding: '14px 0',
                borderTop: '1px solid rgba(0,0,0,0.12)',
                borderBottom: '1px solid rgba(0,0,0,0.12)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: 40,
                    width: 'max-content',
                    animation: 'marquee 20s linear infinite',
                }}
            >
                {doubled.map((item, i) => (
                    <span
                        key={i}
                        className="mono"
                        style={{
                            fontSize: 11,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: inverted ? 'rgba(245,240,232,0.4)' : 'var(--ink)',
                            whiteSpace: 'nowrap',
                            fontWeight: item === '✦' ? 400 : 500,
                        }}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;