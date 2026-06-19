import { motion, useReducedMotion } from 'framer-motion'

export function AnimatedGatewayDiagram() {
  const reduced = useReducedMotion()

  return (
    <div className="gradient-border glow-accent overflow-hidden rounded-2xl p-1">
      <div className="glass-card rounded-xl p-6 md:p-10">
        <svg viewBox="0 0 800 320" className="w-full" aria-label="Pucora architecture diagram">
          <defs>
            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D4AA" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#00D4AA" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines */}
          <line x1="180" y1="150" x2="300" y2="150" stroke="url(#flowGrad)" strokeWidth="2" opacity="0.3" />
          <line x1="500" y1="130" x2="600" y2="95" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1="500" y1="150" x2="600" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1="500" y1="170" x2="600" y2="205" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1="400" y1="210" x2="400" y2="240" stroke="#00D4AA" strokeWidth="1" strokeDasharray="4" opacity="0.5" />

          {/* Animated data pulses */}
          {!reduced && (
            <>
              <line
                x1="180" y1="150" x2="300" y2="150"
                stroke="#00D4AA" strokeWidth="3" filter="url(#glow)"
                className="animate-data-flow"
                style={{ animationDelay: '0s' }}
              />
              <line
                x1="500" y1="130" x2="600" y2="95"
                stroke="#4F46E5" strokeWidth="2" filter="url(#glow)"
                className="animate-data-flow"
                style={{ animationDelay: '0.5s' }}
              />
              <line
                x1="500" y1="150" x2="600" y2="150"
                stroke="#00D4AA" strokeWidth="2" filter="url(#glow)"
                className="animate-data-flow"
                style={{ animationDelay: '1s' }}
              />
              <line
                x1="500" y1="170" x2="600" y2="205"
                stroke="#4F46E5" strokeWidth="2" filter="url(#glow)"
                className="animate-data-flow"
                style={{ animationDelay: '1.5s' }}
              />
            </>
          )}

          {/* Client node */}
          <motion.g
            initial={reduced ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <rect x="40" y="110" width="140" height="80" rx="14" fill="#151d2e" stroke="#00D4AA" strokeWidth="2" filter="url(#softGlow)" />
            <text x="110" y="148" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Client</text>
            <text x="110" y="168" textAnchor="middle" fill="#94a3b8" fontSize="11">HTTP / WS / gRPC</text>
          </motion.g>

          {/* Gateway node - central */}
          <motion.g
            initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <rect x="300" y="90" width="200" height="120" rx="16" fill="#151d2e" stroke="url(#flowGrad)" strokeWidth="2.5" filter="url(#softGlow)" />
            {!reduced && (
              <rect x="300" y="90" width="200" height="120" rx="16" fill="none" stroke="url(#flowGrad)" strokeWidth="1" opacity="0.3">
                <animate attributeName="stroke-width" values="1;3;1" dur="3s" repeatCount="indefinite" />
              </rect>
            )}
            <text x="400" y="135" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">Pucora</text>
            <text x="400" y="158" textAnchor="middle" fill="#00D4AA" fontSize="12">Gateway</text>
            <text x="400" y="178" textAnchor="middle" fill="#94a3b8" fontSize="10">Auth · Rate limit · Aggregate</text>
            {/* Pulsing center dot */}
            <circle cx="400" cy="195" r="4" fill="#00D4AA">
              {!reduced && <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />}
            </circle>
          </motion.g>

          {/* Backend nodes */}
          {[
            { y: 70, label: 'REST APIs', color: '#00D4AA' },
            { y: 130, label: 'gRPC / SOAP', color: '#4F46E5' },
            { y: 190, label: 'Kafka / RabbitMQ', color: '#00D4AA' },
          ].map((node, i) => (
            <motion.g
              key={node.label}
              initial={reduced ? {} : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            >
              <rect x="600" y={node.y} width="150" height="50" rx="10" fill="#151d2e" stroke={node.color} strokeWidth="1" strokeOpacity="0.5" />
              <text x="675" y={node.y + 30} textAnchor="middle" fill="white" fontSize="12">{node.label}</text>
            </motion.g>
          ))}

          {/* Async agent */}
          <motion.g
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <rect x="330" y="250" width="140" height="44" rx="10" fill="#151d2e" stroke="#00D4AA" strokeWidth="1" strokeDasharray="6 4" />
            <text x="400" y="277" textAnchor="middle" fill="#00D4AA" fontSize="11" fontFamily="monospace">async_agent</text>
          </motion.g>
        </svg>
      </div>
    </div>
  )
}
