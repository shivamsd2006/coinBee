import React from 'react'
import {ResponsiveContainer, Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';




const margin = {
    top: 20,
    right: 30,
    left: 40,
    bottom: 5,
};
// #endregion

function getIntroOfPage(label) {
    if (label === 'Page A') {
        return "Page A is about men's clothing";
    }
    if (label === 'Page B') {
        return "Page B is about women's dress";
    }
    if (label === 'Page C') {
        return "Page C is about women's bag";
    }
    if (label === 'Page D') {
        return 'Page D is about household goods';
    }
    if (label === 'Page E') {
        return 'Page E is about food';
    }
    if (label === 'Page F') {
        return 'Page F is about baby food';
    }
    return '';
}

function CustomTooltip({ payload, label, active }) {
    if (active && payload && payload.length) {
        return (
            <div
                className="custom-tooltip"
                style={{
                    border: '1px solid #d88488',
                    backgroundColor: 'orange',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '1px 1px 2px #d88488',
                }}
            >
                <p className="label" style={{ margin: '0', fontWeight: '700' }}>{`${label} : ${payload[0].value}`}</p>
                <p className="intro" style={{ margin: '0' }}>
                    {getIntroOfPage(label)}
                </p>
                <p className="desc" style={{ margin: '0', borderTop: '1px dashed #f5f5f5' }}>
                    Anything you want can be displayed here.
                </p>
            </div>
        );
    }

    return null;
}
function SpendBarChart({ stateData }) {
    return (
        <ResponsiveContainer width="99%" height="99%" >
        <BarChart data={stateData} margin={margin}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={CustomTooltip} defaultIndex={6} active />
            <Bar dataKey="uv" fill="white"  barSize={50}  />
           
        </BarChart>
        </ResponsiveContainer>
    );
}
export default SpendBarChart
