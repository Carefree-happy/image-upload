import { useState } from 'react';
import { PhotoList } from './ImageType';

function PhotoStatus({ containerWidth, itemWidth, itemCount, sketchList, deleteItem, children }: PhotoList) {

    const Component = children

    const contentWidth = itemWidth * itemCount;
    const [scrollLeft, setScrollLeft] = useState(0);

    let startIdx = Math.floor(scrollLeft / itemWidth);
    let endIdx = Math.floor((scrollLeft + containerWidth) / itemWidth);

    const paddingCount = 2;
    startIdx = Math.max(startIdx - paddingCount, 0);
    endIdx = Math.min(endIdx + paddingCount, itemCount - 1);

    const left = itemWidth * startIdx;

    const items = []
    for (let i = startIdx; i <= endIdx; i++) {
        items.push(<Component key={i} photo={sketchList[i]} index={i} style={{ width: itemWidth }} deleteItem={deleteItem}/>);
    }

    const handleScroll = (e: any) => {
        setScrollLeft(e.target.scrollLeft);
    }

    return (
        <div style={{width: containerWidth, overflow: 'auto' }} onScroll={handleScroll}>
            <div style={{ display: "flex", width: contentWidth }}>
                <div style={{ width: left }}></div>
                {items}
            </div>
        </div>
    )
}

export default PhotoStatus