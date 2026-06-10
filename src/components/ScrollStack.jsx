import { useLayoutEffect, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
    <div
        className={`scroll-stack-card relative w-full lg:w-[98vw] mx-auto h-auto lg:h-[98vh] lg:my-4 p-0 lg:rounded-[32px] lg:shadow-[0_30px_90px_rgba(0,0,0,0.12)] box-border origin-top will-change-transform lg:overflow-hidden ${itemClassName}`.trim()}
        style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
        }}
    >
        {children}
    </div>
);

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.02,
    itemStackDistance = 20,
    stackPosition = '10%',
    scaleEndPosition = '5%',
    baseScale = 0.88,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = false,
    onStackComplete
}) => {
    const scrollerRef = useRef(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef(null);
    const lenisRef = useRef(null);
    const cardsRef = useRef([]);
    const lastTransformsRef = useRef(new Map());
    const isUpdatingRef = useRef(false);

    // Cache static offsets to avoid layout thrashing (getBoundingClientRect / offsetTop) on scroll
    const cardOffsetsRef = useRef([]);
    const endElementOffsetRef = useRef(0);

    const isMobile = useCallback(() => {
        return typeof window !== 'undefined' && window.innerWidth < 1024;
    }, []);

    const calculateProgress = useCallback((scrollTop, start, end) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value, containerHeight) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value);
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight,
                scrollContainer: document.documentElement
            };
        } else {
            const scroller = scrollerRef.current;
            return {
                scrollTop: scroller.scrollTop,
                containerHeight: scroller.clientHeight,
                scrollContainer: scroller
            };
        }
    }, [useWindowScroll]);

    // Measure layout static positions once (called on mount and resize)
    const measureLayout = useCallback(() => {
        if (!cardsRef.current.length || isMobile()) return;

        // Temporarily reset transforms so we get the accurate layout offsets
        const savedTransforms = [];
        const savedFilters = [];
        cardsRef.current.forEach(card => {
            savedTransforms.push(card.style.transform);
            savedFilters.push(card.style.filter);
            card.style.transform = 'none';
            card.style.filter = 'none';
        });

        // Measure cards relative to doc root
        cardOffsetsRef.current = cardsRef.current.map(card => {
            if (useWindowScroll) {
                const rect = card.getBoundingClientRect();
                return rect.top + window.scrollY;
            } else {
                return card.offsetTop;
            }
        });

        // Measure stack end spacer
        const endElement = useWindowScroll
            ? document.querySelector('.scroll-stack-end')
            : scrollerRef.current?.querySelector('.scroll-stack-end');

        if (endElement) {
            if (useWindowScroll) {
                const rect = endElement.getBoundingClientRect();
                endElementOffsetRef.current = rect.top + window.scrollY;
            } else {
                endElementOffsetRef.current = endElement.offsetTop;
            }
        }

        // Restore transforms
        cardsRef.current.forEach((card, i) => {
            card.style.transform = savedTransforms[i];
            card.style.filter = savedFilters[i];
        });
    }, [useWindowScroll, isMobile]);

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length || isUpdatingRef.current) return;

        // Bypassed on mobile to allow natural DOM scrolling with zero lag
        if (isMobile()) {
            cardsRef.current.forEach(card => {
                if (card) {
                    card.style.transform = 'none';
                    card.style.filter = 'none';
                }
            });
            return;
        }

        isUpdatingRef.current = true;

        const { scrollTop, containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
        const endElementTop = endElementOffsetRef.current || 0;

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop = cardOffsetsRef.current[i] || 0;
            const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
            const pinEnd = endElementTop - containerHeight / 2;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                let topCardIndex = 0;
                for (let j = 0; j < cardsRef.current.length; j++) {
                    const jCardTop = cardOffsetsRef.current[j] || 0;
                    const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * blurAmount);
                }
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
            }

            const newTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100
            };

            const lastTransform = lastTransformsRef.current.get(i);
            const hasChanged =
                !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

                card.style.transform = transform;
                card.style.filter = filter;

                lastTransformsRef.current.set(i, newTransform);
            }

            if (i === cardsRef.current.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        isUpdatingRef.current = false;
    }, [
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        onStackComplete,
        calculateProgress,
        parsePercentage,
        getScrollData,
        isMobile
    ]);

    const handleScroll = useCallback(() => {
        updateCardTransforms();
    }, [updateCardTransforms]);

    const setupLenis = useCallback(() => {
        if (isMobile()) return null;

        if (useWindowScroll) {
            const lenis = new Lenis({
                duration: 1.5,
                easing: t => 1 - Math.pow(1 - t, 4), // Butter-smooth quartic out easing
                smoothWheel: true,
                touchMultiplier: 1.5,
                infinite: false,
                wheelMultiplier: 0.9,
                lerp: 0.07,
                syncTouch: true,
                syncTouchLerp: 0.075
            });

            lenis.on('scroll', handleScroll);

            const raf = time => {
                lenis.raf(time);
                animationFrameRef.current = requestAnimationFrame(raf);
            };
            animationFrameRef.current = requestAnimationFrame(raf);

            lenisRef.current = lenis;
            return lenis;
        } else {
            const scroller = scrollerRef.current;
            if (!scroller) return;

            const lenis = new Lenis({
                wrapper: scroller,
                content: scroller.querySelector('.scroll-stack-inner'),
                duration: 1.5,
                easing: t => 1 - Math.pow(1 - t, 4), // Butter-smooth quartic out easing
                smoothWheel: true,
                touchMultiplier: 1.5,
                infinite: false,
                wheelMultiplier: 0.9,
                lerp: 0.07,
                syncTouch: true,
                syncTouchLerp: 0.075
            });

            lenis.on('scroll', handleScroll);

            const raf = time => {
                lenis.raf(time);
                animationFrameRef.current = requestAnimationFrame(raf);
            };
            animationFrameRef.current = requestAnimationFrame(raf);

            lenisRef.current = lenis;
            return lenis;
        }
    }, [handleScroll, useWindowScroll, isMobile]);

    // Recalculate layout values on window resizing
    useEffect(() => {
        const handleResize = () => {
            measureLayout();
            updateCardTransforms();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [measureLayout, updateCardTransforms]);

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const cards = Array.from(
            useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : scroller.querySelectorAll('.scroll-stack-card')
        );

        cardsRef.current = cards;
        const transformsCache = lastTransformsRef.current;

        cards.forEach((card, i) => {
            if (isMobile()) {
                card.style.marginBottom = '0px';
                card.style.transform = 'none';
                card.style.filter = 'none';
                card.style.willChange = 'auto';
            } else {
                if (i < cards.length - 1) {
                    card.style.marginBottom = `${itemDistance}px`;
                }
                card.style.willChange = 'transform, filter';
                card.style.transformOrigin = 'top center';
                card.style.backfaceVisibility = 'hidden';
                card.style.transform = 'translateZ(0)';
                card.style.webkitTransform = 'translateZ(0)';
                card.style.perspective = '1000px';
                card.style.webkitPerspective = '1000px';
            }
        });

        // Perform initial measurements
        measureLayout();

        // Secondary recalculation once images are fully loaded and page settles
        const timer = setTimeout(() => {
            measureLayout();
            updateCardTransforms();
        }, 300);

        setupLenis();
        updateCardTransforms();

        return () => {
            clearTimeout(timer);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
            stackCompletedRef.current = false;
            cardsRef.current = [];
            transformsCache.clear();
            isUpdatingRef.current = false;
        };
    }, [
        itemDistance,
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        scaleDuration,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        setupLenis,
        updateCardTransforms,
        measureLayout,
        isMobile
    ]);

    // Container styles based on scroll mode
    const containerStyles = useWindowScroll
        ? {
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)'
        }
        : {
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
            willChange: 'scroll-position'
        };

    const containerClassName = useWindowScroll
        ? `relative w-full ${className}`.trim()
        : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

    return (
        <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
            <div className="scroll-stack-inner pt-0 lg:pt-[1vh] px-0 lg:px-[1vw] pb-0 lg:pb-[2vh] min-h-screen">
                {children}
                {/* Spacer so the last pin can release cleanly */}
                <div className="scroll-stack-end w-full h-px" />
            </div>
        </div>
    );
};

export default ScrollStack;
