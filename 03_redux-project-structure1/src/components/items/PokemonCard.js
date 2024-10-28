function PokemonCard({ pokemon }) {

	return (
		<div>
			<h3>{`포켓몬 이름 : ${pokemon.name}(${pokemon.id})`}</h3>
			<p>상세보기 URL : <a href={pokemon.url}>{pokemon.url}</a></p>
		</div>
	);
}

export default PokemonCard;