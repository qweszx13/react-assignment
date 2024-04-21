function App() {

  const test = async ()=>{
    const response = await fetch("https://api.github.com/repos/facebook/react/issues");
    const jsonData = await response.json();
    console.log(jsonData);
  }
  
  return (
    <div className="App">
     <button onClick={()=>{test()}}></button>
    </div>
  );
}

export default App;
