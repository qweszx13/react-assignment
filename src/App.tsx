import store from "./ contexts/store";

function App() {

  const test = async ()=>{
    //Paging
    const response = await fetch("https://api.github.com/repos/facebook/react/issues?page=1/issues?state=open");
    const jsonData = await response.json();
    console.log(jsonData);
  }

  //store.dispatch()
  
  return (
    <div className="App">
     <body>
      <button onClick={()=>{test()}}></button>
      <header>
        <h1>Web</h1>
        Hello Web
      </header>
      <nav>
        <ol>
          <li><a href="1.html">HTML</a></li>
          <li><a href="2.css">CSS</a></li>
        </ol>
      </nav>
      <article>
        <ul>
          <li><a href="/create">create</a></li>
          <li><input type="button" value={"delete"}></input></li>
        </ul>
        <h2>HTML</h2>
        HTML is...
      </article> 
     </body>
    </div>
  );
}

export default App;
