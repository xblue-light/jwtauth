// @flow
import React from 'react';

type Item = {
    list: {
      name: string,
      description: string,
    }
}

const styles = {
    backgroundColor: "#e6e6e6",
    padding: "10px",
    marginBottom: "5px",
    borderRadius: "2.5px"
}
  
  
const ListItem = (item: Item) => {
    return (
        <div className="col-xs-12" style={styles}>
            <h5>{item.list.name}</h5>
            <p className="text-muted">{item.list.description}</p>
        </div>
    );
}

export default ListItem; 