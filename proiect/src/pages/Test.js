import React from 'react'
import NumberGrowth from '../components/NumberGrowth'
import data from '../data/data'
import Statistics from './Statistics'

export default function Test() {
    return (
        <div>
            <Statistics/>
            <NumberGrowth data={data.graphData}/>
        </div>
    )
}
