import React, { Component} from 'react';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import {randomWord} from './words';
class Hangman extends Component {
    static defaultProps = {
        images:[
            img0,
            img1,
            img2,
            img3,
            img4,
            img5,
            img6

        ]
    }
     constructor(props){
         super(props);
         this.state={
             noofwrong:0,
             answer:randomWord(),
             guesses: new Set(),
             gameover:false,

         }
         this.handleClick=this.handleClick.bind(this)
         this.resetGame=this.resetGame.bind(this)
     }
     handleClick(evt){
         if(this.state.noofwrong!=this.state.answer.length){

         var val=evt.target.value;
        this.setState((str)=>({
            guesses: str.guesses.add(val),
            noofwrong:str.noofwrong + (str.answer.includes(val)? 0: 1)
        }))
        }
        else{
            this.setState({gameover:true});

        }

     }
     generateLetter(){
         return this.state.answer.split("").map((an)=>(this.state.guesses.has(an) ? an : "       _      "));

     }
     generateButtons(){
        return "abcdefghijklmopqrstuvwxyz".split("").map((ltr,i)=>(
            <button key={i} value={ltr} onClick={this.handleClick} disabled={this.state.guesses.has(ltr)}>{ltr}</button>
        ));
     }
     resetGame(){
         this.setState({
             gameover:false,
             noofwrong:0,
             guesses:new Set()
         })
     }
     render(){
         return (
             <div>
                 {this.state.gameover==false ? 
                 <div>
                 <img src={this.props.images[this.state.noofwrong]}/>
                 <p>{this.generateLetter()}</p>
                 <p>{this.generateButtons()}</p>
                 <p>{this.state.noofwrong}</p>
                 </div>
                 :
                 <div>
                 <h1>GAME OVER !!!</h1>
                 <button onClick={this.resetGame}> TRY AGAIN</button>
                 </div>
                }      

            </div>
         )
     }
 }

 export default Hangman;