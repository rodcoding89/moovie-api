import { Link } from "react-router-dom"
export default function Subheader({type,categorie,explore,display}:{type:string,categorie:string[],explore:string[],display:string}){
    return (
        <div className={display + ' absolute w-[50vw] z-10 absoluteCenterLeft'}>
            <div className="bg-white mt-5 flex justify-between items-baseline">
                <div className="w-1/3 bg-gray-200 p-4 self-stretch">
                    <h5 className="text-yellow bold mb-3 pl-2">Explorer</h5>
                    <div className="flex justify-start items-start flex-col">
                        {
                            explore.map(e=>{
                                return (
                                <Link to={'explore/'+type.toLowerCase()} key={e} className="text-black pl-3 pt-1 pb-1 w-full hover:bg-gray-100 rounded-3xl">{e}</Link> 
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex-1 p-4">
                    <h5 className="text-yellow bold mb-3 pl-3">Catégorie {type}</h5>
                    <div className="flex justify-start items-center gap-x-4 flex-wrap">
                        {
                            categorie.map(c=>{ return (
                                <Link to={'categorie/'+type.toLowerCase()} key={c} className="text-black w-2/5 pl-3 pt-1 pb-1 hover:bg-gray-100 rounded-3xl">{c}</Link>
                            )})
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}