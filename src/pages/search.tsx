export default function Search(){
    return (
        <div className="flex items-center bg-white">
            <input className="h-10 w-[25vw] pl-3" placeholder="Rechercher un film, une chaine"/>
            <span className="h-10 bg-yellow flex items-center justify-center p-3 box-border">
                <i className="fa fa-search text-lg" aria-hidden="true"></i>
            </span>
        </div>
    )
}