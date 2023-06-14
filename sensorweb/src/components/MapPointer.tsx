import Image from "next/image";
import React, { useRef, useEffect,useState } from "react";
import { scalePointsFromData } from "@/helpers/locationFns";

export default function MapPointer(props: { location: Array<number> }) {
    const containerRef = useRef(null);
    const pointRef = useRef(null);

    useEffect(() => {
        const el: HTMLElement = containerRef.current!;
        const point: HTMLElement = pointRef.current!;
          if (el != null && point != null) {
                
              const location = scalePointsFromData(
                props.location[0],
                props.location[1],
                el.offsetWidth,
                el.offsetHeight
              )
              point.style.top = location[1] + "px";
              point.style.left = location[0] + "px";
            
          }
   });


  return (
    <div className="relative" ref={containerRef}>
      <Image src="/images/kroki.png" alt="Khas map" width={300} height={108} />
      <div
        className="absolute bg-red-700 rounded-full w-5 h-5"
              ref={pointRef}
      ></div>
    </div>
  );
}
