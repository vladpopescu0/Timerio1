import React, { Component } from 'react'
import data from '../data/data'
import {Bar} from 'react-chartjs-2'
export default class NumberGrowth extends React.Component {
    
    constructor(props) {
        super(props);
    }
        //shouldComponentUpdate=()=>false
        render(){
        return (
            <div className="card border-primary mb-3">
                <Bar
                    data={this.props.data}
                    className="bar-comp"/>
            </div>
        )
        }
}
