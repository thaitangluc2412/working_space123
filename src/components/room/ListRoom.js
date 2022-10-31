import { useState, useEffect } from "react";

import classes from "./ListRoom.module.css";

import Room from "./Room";

import ReactPaginate from "react-paginate";

const ListRoom = (props) => {
  console.log("ALOOOOOOOOOOOO");
  const itemsPerPage = 10;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(props.rooms.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.rooms.length / itemsPerPage));
  }, [props.rooms, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.rooms.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className={classes.listRooms}>
        <div className={classes.filterList}>
          <select>
            <option selected>Filter rooms</option>
            <option value="cheap">Cheapest first</option>
            <option value="small">Smallest first</option>
            <option value="available">Available now</option>
          </select>
        </div>

        {currentItems &&
          currentItems.map((room) => {
            return <Room key={room.roomId} room={room} onActiveModalRoom={props.onActiveModalRoom}/>;
          })}
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

export default ListRoom;
