import {useEffect, useState} from "react"
import axiosClient from "./axios"
import { IRepo } from "./interfaces/repo"
 

import Header from "./components/header";
import Card from "./components/card";

import "./App.css";

function App() {

  const [repos, setRepos] = useState<Array<IRepo>>([]);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
      axiosClient.get("/users/ayushmanbilasthakur/repos")
                 .then(res => {
                    setRepos(res.data);
                    setStatus("done");
                 })
                 .catch(err => {
                   console.log(err.response.data);
                   setStatus("failed");
                 })
  }, [])

  const RenderList = () => {
    if(status == "pending"){
      return (
        <>
          <h3>Loading Data...</h3>
        </>
      )
    }
    else if(status == "done"){
        return (
          <ul>
            {
              repos.map(repo => (
                <Card key={repo.id} data={repo}/> 
              ))  
            }
          </ul>
        )
    }
    return <h3>Some Error happened! see console for full details</h3>
  }

  return (
    <>
    <Header />
    <div className="App">

      <RenderList />
    </div>
    </>
  )
}

export default App
