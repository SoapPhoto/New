'use client'

import type { MotionValue, SpringOptions, UseInViewOptions } from 'motion/react'
import { clsxm } from '@app/utils/cn'
import { m as motion, useInView, useSpring, useTransform } from 'motion/react'
import * as React from 'react'

interface SlidingNumberRollerProps {
  prevValue: number
  value: number
  place: number
  transition: SpringOptions
}

function SlidingNumberRoller({
  prevValue,
  value,
  place,
  transition,
}: SlidingNumberRollerProps) {
  const startNumber = Math.floor(prevValue / place) % 10
  const targetNumber = Math.floor(value / place) % 10
  const animatedValue = useSpring(startNumber, transition)

  React.useEffect(() => {
    animatedValue.set(targetNumber)
  }, [targetNumber, animatedValue])

  return (
    <span
      data-slot="sliding-number-roller"
      className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums"
    >
      <span className="invisible">0</span>
      {Array.from({ length: 10 }, (_, i) => (
        <SlidingNumberDisplay
          key={i}
          motionValue={animatedValue}
          number={i}
          transition={transition}
        />
      ))}
    </span>
  )
}

interface SlidingNumberDisplayProps {
  motionValue: MotionValue<number>
  number: number
  height?: number
  transition: SpringOptions
}

function SlidingNumberDisplay({
  motionValue,
  number,
  height,
  transition,
}: SlidingNumberDisplayProps) {
  const y = useTransform(motionValue, (latest) => {
    if (!height)
      return 0
    const currentNumber = latest % 10
    const offset = (10 + number - currentNumber) % 10
    let translateY = offset * height
    if (offset > 5)
      translateY -= 10 * height
    return translateY
  })

  if (!height) {
    return <span className="invisible absolute">{number}</span>
  }

  return (
    <motion.span
      data-slot="sliding-number-display"
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
      transition={{ ...transition, type: 'spring' }}
    >
      {number}
    </motion.span>
  )
}

type SlidingNumberProps = React.ComponentProps<'span'> & {
  number: number | string
  inView?: boolean
  inViewMargin?: UseInViewOptions['margin']
  inViewOnce?: boolean
  padStart?: boolean
  decimalSeparator?: string
  decimalPlaces?: number
  transition?: SpringOptions
}

function SlidingNumber({
  ref,
  number,
  className,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  padStart = false,
  decimalSeparator = '.',
  decimalPlaces = 0,
  // eslint-disable-next-line react/no-unstable-default-props
  transition = {
    duration: 0.4,
    bounce: 0.15,
  },
  ...props
}: SlidingNumberProps) {
  const localRef = React.useRef<HTMLSpanElement>(null)
  React.useImperativeHandle(ref, () => localRef.current!)

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  })
  const isInView = !inView || inViewResult

  const prevNumberRef = React.useRef<number>(0)

  const effectiveNumber = React.useMemo(
    () => (!isInView ? 0 : Math.abs(Number(number))),
    [number, isInView],
  )

  const formatNumber = React.useCallback(
    (num: number) =>
      decimalPlaces != null ? num.toFixed(decimalPlaces) : num.toString(),
    [decimalPlaces],
  )

  const numberStr = formatNumber(effectiveNumber)

  React.useEffect(() => {
    if (isInView)
      prevNumberRef.current = effectiveNumber
  }, [effectiveNumber, isInView])

  return (
    <span
      ref={localRef}
      data-slot="sliding-number"
      className={clsxm('flex items-center', className)}
      {...props}
    >
      {numberStr}
    </span>
  )
}

export { SlidingNumber, type SlidingNumberProps }
