import { useRef, type MouseEvent, type PointerEvent } from 'react'

const CLICK_TOLERANCE_PX = 4

type Drag = {
  pointerId: number
  startX: number
  startY: number
  startScrollLeft: number
  startScrollTop: number
  hasMoved: boolean
}

export function useDragToScroll<T extends HTMLElement>() {
  const containerRef = useRef<T>(null)
  const drag = useRef<Drag | null>(null)
  const suppressNextClick = useRef(false)

  function onPointerDown(event: PointerEvent<T>) {
    const container = containerRef.current
    if (event.button !== 0 || container === null) return
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: container.scrollLeft,
      startScrollTop: container.scrollTop,
      hasMoved: false,
    }
  }

  function onPointerMove(event: PointerEvent<T>) {
    const container = containerRef.current
    const current = drag.current
    if (container === null || current === null || current.pointerId !== event.pointerId) return
    const deltaX = event.clientX - current.startX
    const deltaY = event.clientY - current.startY
    if (!current.hasMoved && Math.hypot(deltaX, deltaY) < CLICK_TOLERANCE_PX) return
    if (!current.hasMoved) {
      current.hasMoved = true
      container.setPointerCapture(event.pointerId)
      container.dataset.dragging = 'true'
    }
    container.scrollLeft = current.startScrollLeft - deltaX
    container.scrollTop = current.startScrollTop - deltaY
  }

  function onPointerUp(event: PointerEvent<T>) {
    const container = containerRef.current
    const current = drag.current
    if (current === null || current.pointerId !== event.pointerId) return
    suppressNextClick.current = current.hasMoved
    drag.current = null
    if (container !== null) delete container.dataset.dragging
  }

  function onClickCapture(event: MouseEvent<T>) {
    if (!suppressNextClick.current) return
    suppressNextClick.current = false
    event.stopPropagation()
    event.preventDefault()
  }

  return {
    containerRef,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onClickCapture,
    },
  }
}
