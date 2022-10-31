import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import classes from "./ListProperties.module.css";

import Property from "./Property";

import ReactPaginate from "react-paginate";




const ListProperties = (props) => {
  const itemsPerPage = 16;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(props.properties.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.properties.length / itemsPerPage));
  }, [props.properties, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.properties.length;
   
    setItemOffset(newOffset);
  };

  return (
    <>
    <div className={classes.listProperties}>
    {currentItems && currentItems.map((property) => (
         <NavLink 
         target={"_blank"}
          to={{
           pathname: `/properties/${property.propertyId}/rooms`,
         }} key={property.proptertyId}>
         <Property key={property.propertyId} property={property} handleSeeInMap={props.handleSeeInMap}/>
         </NavLink>
    ))}
    </div>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName={classes.pagination}
        pageLinkClassName={classes.pageLink}
        previousLinkClassName={classes.pageLink}
        nextLinkClassName={classes.pageLink}
        breakLinkClassName={classes.pageLink}
        activeLinkClassName={classes.active}
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default ListProperties;
