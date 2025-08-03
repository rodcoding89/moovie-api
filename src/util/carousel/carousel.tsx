import React, { useRef, useState, useEffect } from 'react';

interface CarouselProp{
    items:any[],
    itemsLength:number,
    childWidth:number,
    spaceBetweenItem?:number,
    navButtonStyle:string,
    navButtonGroupHover?:string
    iconStyle:string,
    posLeft?:string,
    posRight?:string
    posTop?:string,
    carouselType:"list"|"item"
}

const Carousel: React.FC<CarouselProp> = ({ items,itemsLength,childWidth,navButtonStyle,spaceBetweenItem=20,iconStyle,posLeft='left-[0px]',posRight='right-[0px]',posTop='top-1/2 -translate-y-1/2',carouselType,navButtonGroupHover = 'hidden group-hover/outer:flex' }) =>{
    console.log("items",items.length,items)
    const innerCarouselWidth = carouselType === 'list' ? childWidth*itemsLength + spaceBetweenItem * itemsLength - 1 : 100*itemsLength;
    const unity = carouselType === 'list' ? 'px' : '%';
    const translateX = carouselType === 'list' ? innerCarouselWidth / itemsLength : 100 / itemsLength
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollIndex, setScrollIndex] = useState(0);
    const [maxScrollIndex, setMaxScrollIndex] = useState(0);
    const [timeInterval,setTimeInterval] = useState(3000)
    const handleHover = (param:string)=>{
        setTimeInterval(param === 'init' ? 3000 : 0)
    }
    useEffect(() => {
        let interval:any;
        const autoScroll = ()=>{
            interval = setInterval(() => {
                setScrollIndex((prev) => {
                    return prev < itemsLength - 1 ? prev + 1 : 0
                });
            }, 3000);
        }
        const container = containerRef.current;
        const item = container?.children[0] as HTMLDivElement;

        if (container && item) {
        const containerWidth = container.offsetWidth;
        
        let n = 1;
        
        while ((n * childWidth + (n - 1) * spaceBetweenItem) <= containerWidth) {
            n++;
            console.log("n index",n)
        }
        const visibleCount = n - 1;
        //const visibleCount = Math.floor( containerWidth / childWidth);
        
        const maxIndex = itemsLength - visibleCount;
        //console.log("maxIndex",maxIndex,"containerWidth",containerWidth,"visibleCount",visibleCount,"spaceBetweenItem",spaceBetweenItem,"n",n)
        setMaxScrollIndex(Math.max(0, maxIndex));
        }
        if (carouselType === 'item' && timeInterval > 0) {
            autoScroll()
        }
        return ()=> clearInterval(interval)
    }, [items,timeInterval]);

    console.log("maxScrollIndex",maxScrollIndex,"scrollIndex",scrollIndex)

    const next = () => {
        setScrollIndex((prev) => Math.min(prev + 1, maxScrollIndex));
    };

    const prev = () => {
        setScrollIndex((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="w-full relative group/outer">
        {
            carouselType === 'list' ? (<button className={`group/inner absolute z-10 ${posLeft} ${posTop} flex items-center justify-center text-[2.2em] cursor-pointer mr-[5px] mb-[1px] max-885:!flex ${navButtonStyle} ${scrollIndex === 0 ? 'hidden' : navButtonGroupHover}`} onClick={prev}><i className={`fa fa-angle-left ${iconStyle}`} aria-hidden="true"></i></button>) : ''
        }
        <div
            ref={containerRef}
            className="overflow-hidden w-full relative"
        >
            <div
            className={`flex justify-start items-start transition-all duration-700 ease-linear`}
            style={{
                width:innerCarouselWidth + unity,transform:`translateX(-${scrollIndex * translateX + unity})`,gap:spaceBetweenItem+'px'
            }}
            >
            {items.map((item:any, i:number) => (
                <div onMouseEnter={()=> carouselType === 'item' ? handleHover('reste') : null} onMouseLeave={()=>carouselType === 'item' ? handleHover('init')  : null} style={{width:100/itemsLength +'%'}}>
                    {item}
                </div>
            ))}
            </div>
        </div>
        {
            carouselType === 'list' ? (<button className={`group/inner absolute z-10 ${posRight} ${posTop} flex items-center justify-center text-[2.2em] cursor-pointer max-885:!flex ${navButtonStyle} ${scrollIndex >= maxScrollIndex ? 'hidden' : navButtonGroupHover}`} onClick={next}><i className={`fa fa-angle-right ml-[5px] mb-[1px] ${iconStyle}`} aria-hidden="true"></i></button>) : ''
        }
        </div>
    );
}

export default Carousel
