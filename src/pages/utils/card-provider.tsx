export default function CardProvider({cardData}:{cardData:any}){
    return (
        <img className="w-[65px] mx-4" src={process.env.PUBLIC_URL+'/'+cardData} alt="provider"/>
    )
}