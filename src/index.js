import React from 'react';
import ReactDOM from 'react-dom';
import { Get, Post} from 'react-axios';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';
import './index.css';

function Example(props)  {

  return(
    <div>
    <Get url="https://api.piggy.co.in/v1/mf/" params={{key: props.value["scheme_key"]}}>
        {(error, response, isLoading, onReload) => {
          if(error) {
            return (<div></div>)
          }
          else if(isLoading) {
            return (<div></div>)
          }
          else if(response !== null) {
            var detailed_props = response;
            return (<Accordion className="accordion">
        <AccordionItem>
            <AccordionItemTitle>
                <h3>{props.value["name"]}</h3>
                <p>Category : {props.value["category"]}</p>
            </AccordionItemTitle>
            <AccordionItemBody>
            <div className="fund_detail">
              <div>
                <h4>Riskometer</h4>
                <p>{props.value["riskometer"]}</p>
              </div>
              <div>
                <h4>Rating</h4>
                <p>{props.value["rating"]}</p>
              </div>
              <div>  
                <h4>Asset um</h4>
                <p>{detailed_props.data.data.mutual_fund["details"]["asset_aum"]}</p>
              </div>
              <div>  
                <h4>Return in 3yr</h4>
                <p>{props.value["return_3yr"]}</p>
              </div>
              <div>
                <h4>Minimum Subscription</h4>
                <p>{detailed_props.data.data.mutual_fund["details"]["minimum_subscription"]}</p>
              </div>
              <div>  
                <h4>Benchmark Text</h4> 
                <p>{detailed_props.data.data.mutual_fund["details"]["benchmark_text"]}</p>
              </div>
              </div>

                  </AccordionItemBody>
        </AccordionItem>
        
    </Accordion>)
          }
          return (<div>Default message before request is made.</div>)
        }}
      </Get>
    
    </div>
);
}


class Game extends React.Component {
  render() {
    let data;
    if(this.props.name === "")
    data = {"search":this.props.name} 
    else
    data = {
      "search":this.props.name,
      "rows" : 2,
      "offset" : 1
    }  
  return (
    <div>
      <Post url="https://api.piggy.co.in/v2/mf/search/" 
      params={{
        'authorization': "Token a41d2b39e3b47412504509bb5a1b66498fb1f43a",
        'cache-control': "no-cache", 
        'content-type': "application/json"
      }} 
      data={data}
>
        {(error, response, isLoading, onReload) => {
          if(error) {
            return (<div>Something bad happened: {error.message}</div>)
          }
          else if(isLoading) {
            return (<div className="Loading">Loading...</div>)
          }
          else if(response !== null) {
            return (response.data.data.search_results.map(stock =>  <Example value={stock}/>));
          }
          return (<div>Default message before request is made.</div>)
        }}
      </Post>
    </div>
  )
}
}

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stockName : null,
      showMutualFund : false,
    }
  }
  

  render(){
    return (
      <div>
      <div className="search_bar">
      <input type="text" name="searchbar" placeholder = "Enter the name of Mutual Fund" />
      <button onClick = {()=>{
        this.setState({stockName  : document.querySelector('input[name="searchbar"]').value,showMutualFund : true});
      }}
      >
      <img src="image/search.png" alt="search icon"/>
      </button>
      </div>
      { this.state.showMutualFund && 
        <div className="mutual_fund">
        <Game name = {this.state.stockName} />
        </div>
      }
      </div>
    );
  }
}

ReactDOM.render(
  <SearchBar />,
  document.getElementById('root')
);
