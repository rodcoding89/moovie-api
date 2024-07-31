export default function Cast({castData}:{castData:any}){
    return (
        <div className="flex flex-col items-center justify-center gap-y-1 mx-4">
            <img className="rounded-full object-cover" src={castData.link} alt={castData.name} />
            <p className="text-white">{castData.name}</p>
            <span className="text-second-white text-[.89em]">{castData.actorName}</span>
        </div>
    )
}
