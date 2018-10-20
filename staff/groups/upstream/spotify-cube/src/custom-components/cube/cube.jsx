import React, {Component} from 'react'
import FrontSide from './frontside/frontside'
import BackSide from './backside/backside'
import BottomSide from './bottomside/bottomside'
import TopSide from './topside/topside'
import RightSide from './rightside/rightside'
import LeftSide from './leftside/leftside'

export default class Cube extends Component{

    state = {}

    render(){

        return <section class="container">
            <section id="cube">
                <FrontSide></FrontSide>
                <BackSide></BackSide>
                <LeftSide></LeftSide>
                <RightSide></RightSide>
                <TopSide></TopSide>
                <BottomSide></BottomSide>    
            </section>
        </section>
            
    }
}