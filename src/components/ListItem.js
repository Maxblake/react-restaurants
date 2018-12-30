import React from "react";
import PropTypes from "prop-types";
import "./ListItem.css";
import ListObjectProps from "./ListObjectProprties";

const ListItem = props => {
  const {
    id,
    name = "",
    status = "",
    sortingValues = {},
    isFavorite = false
  } = props.item;

  const renderDebug = () => {
    if (process.env.NODE_ENV === "production") return null;
    if (!props.isDebug) return null;

    return (
      <div className="debug">
        <p className="id">id: {id}</p>
        <div className="sortingValues">
          <ListObjectProps object={sortingValues} />
        </div>
      </div>
    );
  };

  return (
    <div className="list-item">
      <div className="info">
        <h3 className="name" onClick={() => props.onClick(props.item)}>
          {name}
        </h3>
        <p className="status">{status}</p>
        <label className="isFavorite">
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={() => props.onFavoriteChange(props.item)}
          />
          favorite
        </label>
      </div>
      {renderDebug()}
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onFavoriteChange: PropTypes.func,
  isDebug: PropTypes.bool
};

export default ListItem;