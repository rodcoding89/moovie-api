import { Link, useParams } from "react-router-dom";

export default function Episode(){
    let {id,season_id,ep_id} = useParams();
    const myid = ep_id ? parseInt(ep_id) : 0;
    console.log('episode',ep_id);
    const epNum = 30;
    const epList = [];
    for (let i = 0; i < epNum; i++) {
        epList.push(<div key={i} className={`p-2 text-center box-border hover:border-b-[1px] hover:border-b-yellow ${i % 2 !== 0 ? 'bg-[#2b2c2d]' : ''} ${(i+1) === myid ? 'ep-active' : ''}`}><Link className="text-yellow" to={'../serie/'+id+'/season/'+season_id+'/episode/'+(i+1)}>Quantico Saison 2 épisode {i+1}</Link></div>)
    }
    return (
        <div className="w-[100%] mx-auto">
            <div className="w-[25%] bg-black">
                <h4 className="text-white text-center py-5">Quantico Saison 2</h4>
                <div>
                    {
                        epList
                    }
                </div>
            </div>
        </div>
    )
}