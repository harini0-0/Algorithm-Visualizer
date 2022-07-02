import React from 'react'
import './Pile.css';

const Pile = (props) => {
    const {
        val,
        type,
        index,
        colorSetIndex
    } = props;

    let colors = [`rgb(200,${(1 - val / 45) * 255 + 50}, 255)`, `rgb(250,200, ${(1 - val / 80) * 255})`, `rgb( ${(1 - val / 80) * 255},200,250)`];
    let midColor = `red`;
    let disabledColor = `grey`;

    let extraClass = type === 1 ? '-changing' : type === 2 ? '-mid' : '-disabled';
    let color = extraClass === '-changing' ? colors[colorSetIndex] : extraClass === '-mid' ? midColor : disabledColor;
    let heights = 8;

    return (
        <>
            <div className={'pile' + extraClass} style={{ height: `${val * heights}px`, background: color }}>
                <p className='value'>{val}</p>
            </div>
        </>
    );
}

export default Pile
