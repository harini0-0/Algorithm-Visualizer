import React from 'react'
import './Pile.css';

const Pile = (props) => {
    const {
        val,
        isChanging,
        finished,
        index,
        colorSetIndex
    } = props;

    let changingColors = [`rgb(228, 230, 120)`, `rgb(155, 147, 229)`, `rgb(248, 250, 140)`];
    let normalColors = [`rgb(200,${(1 - val / 45) * 255 + 50}, 255)`, `rgb(250,200, ${(1 - val / 80) * 255})`, `rgb( ${(1 - val / 80) * 255},200,250)`];

    let extraClass = isChanging ? '-changing' : finished ? '-finished' : '';
    let color = extraClass === '-changing' ? changingColors[colorSetIndex] : normalColors[colorSetIndex];
    let lineOff = -20 * index;
    let heights = 8;
    let indicatorLength = 820;

    return (
        <>
            <div className={'pile' + extraClass} style={{ height: `${val * heights}px`, background: color }}>
                <p className='value'>{val}</p>
                {!props.finished && props.isPivot && <svg height="100" width={indicatorLength + 100} style={{ position: "absolute", display: "flex", marginTop: "-31px", marginLeft: `${lineOff}px` }}>
                    <line x1="0" y1="0" x2={indicatorLength} y2="0" style={{ stroke: "grey", strokeWidth: "3px" }}></line>
                </svg>}
            </div>
        </>
    );
}

export default Pile
