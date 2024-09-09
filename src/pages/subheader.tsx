import { Link } from "react-router-dom";
function replaceWhiteSpaceOnLabel(label:string){
    return label.replaceAll(' ','-');
}
export default function Subheader({type,categorie,explore,display}:{type:string,categorie:string[],explore:any[],display:string}){
    let id = 1;
    console.log('type',type);
    return (
        <div className={display + ' absolute w-[50vw] z-10 absoluteCenterLeft max-[600px]:w-[70vw]'}>
            <div className="bg-white mt-5 flex justify-between items-baseline max-[600px]:flex-col">
                <div className="w-1/3 bg-gray-200 p-4 self-stretch max-[600px]:w-full max-[600px]:self-auto">
                    <h5 className="text-yellow bold mb-3 pl-2">Explorer</h5>
                    <div className="flex justify-start items-start flex-col">
                        {
                            explore.map(e=>{
                                return (
                                <Link to={type === 'serie'?'serie/explore/'+e.id:'film/explore/'+e.id} key={e.id} className="text-black pl-3 pt-1 pb-1 w-full hover:bg-gray-100 rounded-3xl">{e.name}</Link> 
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex-1 p-4 max-[600px]:w-full">
                    <h5 className="text-yellow bold mb-3 pl-3">Catégorie {type === 'serie'?'Serie':'Filme'}</h5>
                    <div className="flex justify-start items-center gap-x-4 flex-wrap">
                        {
                            categorie.map(c=>{ return (
                                <Link to={type === 'serie'?'serie/'+replaceWhiteSpaceOnLabel(c.toLowerCase())+'/'+id:'film/'+replaceWhiteSpaceOnLabel(c.toLowerCase())+'/'+id} key={c} className="text-black w-2/5 pl-3 pt-1 pb-1 hover:bg-gray-100 rounded-3xl">{c}</Link>
                            )})
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}