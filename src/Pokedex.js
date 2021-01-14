import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button'

class Pokedex extends React.Component {
    constructor () {
        super()
        this.fetchFilteredPokemons = this.fetchFilteredPokemons.bind(this);
        this.nextPokemon = this.nextPokemon.bind(this);
        this.filterPokemon = this.filterPokemon.bind(this);
        this.noFilter = this.noFilter.bind(this);
        this.state = {
            actualPokemon: 0,
            filterPokemon: 'all',
        }
    }

    fetchFilteredPokemons() {
        return this.props.pokemons.filter((pokemon) => {
            if (this.state.filterPokemon === 'all') return true;
            else return pokemon.type === this.state.filterPokemon;
        })
    }

    nextPokemon() {
        const filteredPokemons = this.fetchFilteredPokemons();
        const numberOfPokemons = filteredPokemons.length;
        this.setState((estadoAnterior, _props) => ({
            actualPokemon: (estadoAnterior.actualPokemon + 1) % numberOfPokemons,
        }))
    }

    filterPokemon (type) {
        this.setState({
            actualPokemon: 0,
            filterPokemon: type,
        })
    }

    noFilter () {
        this.setState({
            actualPokemon: 0,
            filterPokemon: 'all',
        })
    }
    render() {
        const pokemon = this.fetchFilteredPokemons();
        let types = this.props.pokemons.map((pokemon) => pokemon.type);
        const typesFiltered = types.filter((type,index) => types.indexOf(type) === index);
        return (
            <div className="pokedex">
                <Pokemon pokemon={pokemon[this.state.actualPokemon]}/>
                <div className='button-container'>
                    <Button onClick={this.nextPokemon} btnText='Next Pokemon' disabled={pokemon.length <= 1 ? true : false} />
                    <Button onClick={this.noFilter} btnText='All' />
                    {typesFiltered.map((type) => <Button onClick={() => this.filterPokemon(type)} btnText={type} key={type} />)}
                </div>
            </div>
        );
    }
}

export default Pokedex;