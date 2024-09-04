export default function Cast({castData}:{castData:any}){
    return (
        <div className="flex flex-col items-center justify-center gap-y-1 mx-4">
            <img className="rounded-full object-cover" src={process.env.PUBLIC_URL+'/'+castData.link} alt={castData.name} />
            <p className="text-white text-center">{castData.name}</p>
            <span className="text-second-white text-[.89em] text-center">{castData.actorName}</span>
        </div>
    )
}
