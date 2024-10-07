import { image_base_url } from "src/constante/data";
export default function Cast({castData}:{castData:any}){
    return (
        <div className="flex flex-col items-center justify-center gap-y-1 mx-4">
            <div className={!castData.profile_path ? 'bg-white h-[195px] p-3 w-[130px]' : 'w-[130px]'}>
                <img className="rounded-full object-cover" src={castData.profile_path?image_base_url+'/'+castData.profile_path:process.env.PUBLIC_URL+'/assets/images/profil.svg'} alt={castData.name} />
            </div>
            <p className="text-white text-center">{castData.name}</p>
            <span className="text-second-white text-[.89em] text-center">{castData.character}</span>
        </div>
    )
}
