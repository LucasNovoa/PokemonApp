import s from './Pagination.module.css';

export default function Pagination ({pokemonPage, Pokemons, pagination, page}){

    const pageNumbers = [];

    for(let i=1; i<= Math.ceil(Pokemons/pokemonPage); i++){
        pageNumbers.push(i);
    }

    return(
        <div className={s.pagination}>
            <div className={s.prevBtn}>
                <button className={s.pagesBtn} style={page <= 1 ?
                    {display: 'none'} : {}} onClick={()=>pagination(page-1)}>Prev</button>
            </div>
            <div className={s.pageOf}>
                {
                    pageNumbers.length ?
                        <button className={s.pagesBtn} disabled>{`Page ${page} of ${pageNumbers.length}`}</button> : null
                }
            </div>
            <div className={s.nextBtn}>
                <button className={s.pagesBtn} style={page >= pageNumbers.length ?
                    {display: 'none'} : {}} onClick={()=>pagination(page+1)}>Next</button>
            </div><br/>
                {pageNumbers && pageNumbers.map((pageNumber)=>(
                    pageNumbers.length === 1 ? null :
                    <div className={s.pages} key={pageNumber}>
                        <button className={s.pagesBtn} style={page === pageNumber ?
                            {background:"#C1C3BC",color:"#dbe6c4"} : {}} onClick={()=>pagination(pageNumber)}>{pageNumber}</button>
                    </div>
                ))}
        </div>
    )
}