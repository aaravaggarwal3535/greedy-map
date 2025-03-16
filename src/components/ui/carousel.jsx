import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const Carousel = React.forwardRef((props, ref) => {
  const { orientation = "horizontal", opts, setApi, plugins, className, children, ...rest } = props
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  React.useEffect(() => {
    if (api) {
      setApi?.(api)
      const onSelect = () => {
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
      }
      onSelect()
      api.on("select", onSelect)
      return () => {
        api.off("select", onSelect)
      }
    }
  }, [api, setApi])

  return (
    <CarouselContext.Provider value={{ api, canScrollPrev, canScrollNext }}>
      <div ref={carouselRef} className={cn("carousel-container", className)} {...rest}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselPrevButton = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props
  const { api, canScrollPrev } = useCarousel()
  return (
    <Button
      ref={ref}
      className={cn("carousel-prev-button", className)}
      onClick={() => api?.scrollPrev()}
      disabled={!canScrollPrev}
      {...rest}
    >
      {children || <ArrowLeft />}
    </Button>
  )
})
CarouselPrevButton.displayName = "CarouselPrevButton"

const CarouselNextButton = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props
  const { api, canScrollNext } = useCarousel()
  return (
    <Button
      ref={ref}
      className={cn("carousel-next-button", className)}
      onClick={() => api?.scrollNext()}
      disabled={!canScrollNext}
      {...rest}
    >
      {children || <ArrowRight />}
    </Button>
  )
})
CarouselNextButton.displayName = "CarouselNextButton"

export { Carousel, useCarousel, CarouselPrevButton, CarouselNextButton }