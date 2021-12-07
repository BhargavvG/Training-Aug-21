import React, { useState } from "react";
function Products(props) {
  const [cartlist, setCartList] = useState([]);
  let productList = [
    { ID: 1, Name: "keyboard", Price: 600 },
    { ID: 2, Name: "Mouse", Price: "700" },
    { ID: 3, Name: "headphone", Price: 500 },
  ];
  const listproduct = productList;
  const productlistItems = listproduct.map((listItem) => (
    <tr key={listItem.ID.toString()}>
              <td>{listItem.ID}</td>
              <td>{listItem.Name} </td>
              <td>{listItem.Price}</td>
              
      <td>
         <button onClick={(e) => onTrigger(listItem, e)}>Add to cart</button>
      </td>
            
    </tr>
  ));
  function onTrigger(data, event) {
    event.preventDefault();
    setCartList([...cartlist, data]);
    console.log(cartlist);
    props.childnotify(cartlist);
  }
  return (
    <div>
                   
      <table>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Price</td>
        </tr>
        {productlistItems}
             
      </table>
            
    </div>
  );
}
export default Products;
