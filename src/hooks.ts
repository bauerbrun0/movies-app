import { MutableRefObject, useEffect, useRef } from "react";

/**
Starts observing the visibility of the elements in the itemsRef array.
data-refindex attribute must be set on the elements in the itemsRef array.
@param itemsRef - MutableRefObject containing the elements to observe the visibility on
@param visibilitiesChangedCallback - callback to be called when the visibility of the elements changes
@param axis - axis to observe the visibility on ("x", "y" or "both")
@returns - MutableRefObject containing the visibility of the elements in the itemsRef array
*/
export const useVisibilitiesRef = (
    itemsRef: MutableRefObject<(HTMLElement | null)[]>,
    visibilitiesChangedCallback: () => void,
    axis: "x" | "y" | "both"
) : MutableRefObject<boolean[]> => {

    const visibilities = useRef<boolean[]>([]);

    useEffect(() => {
        const observerCallback = ((observerEntries: IntersectionObserverEntry[]) => {
            const entries = observerEntries.map(observerEntry => {
                const refIndex = observerEntry.target.getAttribute('data-refindex');
                return {
                    refIndex,
                    visible: observerEntry.isIntersecting
                };
            });

            entries.forEach(entry => {
                if (entry.refIndex === null || isNaN(Number(entry.refIndex))) {
                    throw new Error('Incorrect or missing data-refindex property.');
                }

                const refIndex = Number(entry.refIndex);
                visibilities.current[refIndex] = entry.visible;
            });

            visibilitiesChangedCallback();
        });

        const rootMargin = axis === 'x' ? '100% 0% 100% 0%' :
            axis === 'y' ? '0% 100% 0% 100%' :
            '0% 0% 0% 0%';

        const observerOptions = {
            root: null,
            rootMargin,
            threshold: 1.0
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        itemsRef.current.forEach(element => {
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [itemsRef, visibilities, visibilitiesChangedCallback, axis]);

    return visibilities;
};