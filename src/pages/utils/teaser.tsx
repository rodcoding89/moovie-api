document.documentElement.style.setProperty('--bg-mask-url', `url(${process.env.PUBLIC_URL}/assets/images/left-cover.svg)`);
export default function Teaser({teaserImg,description,cat}:{teaserImg:string,description:string,cat:string}){
    return (
        <div className="min-h-[300px] flex justify-start items-center max-730:flex-col">
            <div className="min-730:left-[unset] min-730:right-0 absolute h-full min-730:w-[64%] max-mask min-mask max-730:w-full max-730:relative max-730:h-[350px]">
                <img className="absolute w-full h-full left-0 top-0" src={teaserImg} alt="genre filme" />
            </div>
            <div className="py-[10%] w-[45%] ml-[5vw] z-10 max-730:w-[calc(100%-10vw)] max-730:box-border max-730:pt-15px max-730:mx-[5vw]">
                <h1 className="text-yellow bold text-[3.1em] mb-7 first-letter:uppercase">{cat}</h1>
                <p className="text-primaire-white regular text-[1.1em]">{description}</p>
            </div>
        </div>
    )
}