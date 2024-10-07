import { Link } from "react-router-dom";
function replaceWhiteSpaceOnLabel(label:string){
    return label.replaceAll(' ','-');
}
export default function Subheader({type,categorie=[],explore,display,shareData}:{type:string,categorie:any[],explore:any[],display:string,shareData:any}){
    console.log('type',type);
    function handleClick(data:string) {
        let mydata = {
            type:data,
            state:false
        }
        shareData(mydata);
    }
    return (
        <div className={display + ' absolute w-[50vw] z-10 absoluteCenterLeft max-700:w-[70vw] max-430:!w-[86vw] max-430:!relative max-430:!right-0'}>
            <div className="bg-white mt-5 flex justify-between items-baseline max-600:flex-col">
                <div className="w-1/3 bg-gray-200 p-4 self-stretch max-600:w-full max-600:self-auto">
                    <h5 className="text-yellow bold mb-3 pl-2">Explorer</h5>
                    <div className="flex justify-start items-start flex-col">
                        {
                            explore.map(e=>{
                                return (
                                <Link onClick={()=>{handleClick(type)}} to={type === 'serie'?'serie/explore/'+e.id:'film/explore/'+e.id} key={e.id} className="a1 text-black pl-3 pt-1 pb-1 w-full hover:bg-gray-100 rounded-3xl">{e.name}</Link> 
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex-1 p-4 max-600:w-full">
                    <h5 className="text-yellow bold mb-3 pl-3">Catégorie {type === 'serie'?'Serie':'Filme'}</h5>
                    <div className="flex justify-start items-center gap-x-4 flex-wrap">
                        {
                            categorie.map((c,index)=>{ return (
                                <Link onClick={()=>{handleClick(type)}} to={type === 'serie'?'serie/'+replaceWhiteSpaceOnLabel(c.name.toLowerCase())+'/'+c.id:'film/'+replaceWhiteSpaceOnLabel(c.name.toLowerCase())+'/'+c.id} key={c.name+'_'+index} className="a2 text-black w-2/5 pl-3 pt-1 pb-1 hover:bg-gray-100 rounded-3xl">{c.name}</Link>
                            )})
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}