import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'

const MIN_ZOOM = 0.25
const MAX_ZOOM = 2
const ZOOM_STEP = 1.25

type ScrollTarget = {
  readonly left: number
  readonly top: number
}

export function useMapZoom(containerRef: RefObject<HTMLElement | null>) {
  const [zoom, setZoom] = useState(1)
  const currentZoom = useRef(1)
  const pendingScroll = useRef<ScrollTarget | null>(null)

  function zoomTo(requestedZoom: number, anchorX?: number, anchorY?: number) {
    const container = containerRef.current
    if (container === null) return
    const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, requestedZoom))
    const previousZoom = currentZoom.current
    if (nextZoom === previousZoom) return
    const x = anchorX ?? container.clientWidth / 2
    const y = anchorY ?? container.clientHeight / 2
    pendingScroll.current = {
      left: ((container.scrollLeft + x) / previousZoom) * nextZoom - x,
      top: ((container.scrollTop + y) / previousZoom) * nextZoom - y,
    }
    currentZoom.current = nextZoom
    setZoom(nextZoom)
  }

  useLayoutEffect(() => {
    const container = containerRef.current
    const target = pendingScroll.current
    if (container === null || target === null) return
    container.scrollLeft = target.left
    container.scrollTop = target.top
    pendingScroll.current = null
  }, [containerRef, zoom])

  useEffect(() => {
    const container = containerRef.current
    if (container === null) return
    function onWheel(event: WheelEvent) {
      if (container === null) return
      event.preventDefault()
      const bounds = container.getBoundingClientRect()
      const factor = event.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP
      zoomTo(currentZoom.current * factor, event.clientX - bounds.left, event.clientY - bounds.top)
    }
    container.addEventListener('wheel', onWheel, { passive: false })
    return () => container.removeEventListener('wheel', onWheel)
  })

  return {
    zoom,
    zoomIn: () => zoomTo(currentZoom.current * ZOOM_STEP),
    zoomOut: () => zoomTo(currentZoom.current / ZOOM_STEP),
    resetZoom: () => zoomTo(1),
  }
}
