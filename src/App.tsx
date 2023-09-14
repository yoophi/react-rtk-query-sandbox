import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { pokemonApi, useGetPokemonByNameQuery } from './services/pokemon'
import { useAppDispatch } from './app/hooks';
import { setBaseUrl } from './features/configuration/configurationSlice';

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    dispatch(setBaseUrl('https://pokeapi.co/api/v2/'))

    const isLoading = false;
    const res = await dispatch(
      pokemonApi.endpoints.getPokemonByName.initiate('bulbasaur')
    )
    console.log({ res })
    const { status, data, error, refetch } = res ;
    


    // const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
    setData(data);
    setError(error);
    setIsLoading (isLoading);
  }

  return (
    <div className="App">
      <button onClick={handleClick}>click me</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
      <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
    </div>
  );
}

export default App;
