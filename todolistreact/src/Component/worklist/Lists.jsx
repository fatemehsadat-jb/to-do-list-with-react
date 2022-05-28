import React from 'react';
import List from './List';

const Lists = ({listarray,deletelist,changelist,finishlist}) => {
    return ( 
        <div>
            {listarray.map(oddwork => (
                <List 
                key={oddwork.id}
                work = {oddwork.work}
                deleted={()=> deletelist(oddwork.id)}
                changed={(event)=> changelist(oddwork.id , event)}
                finished={()=> finishlist(oddwork.id)}
                />
            ))}
        </div>
     );
}
  
export default Lists;