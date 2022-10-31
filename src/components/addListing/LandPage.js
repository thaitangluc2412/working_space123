import React from "react";
// import axios from 'axios';s
const LandPage = (props) => {
  let formData = new FormData();

  const uploadJSONFiles = (event) => {
    event.preventDefault();
    // let formData = new FormData();
    // let jsonBodyData = { 'someKey': 'someValue' };
    // // for(let key of Object.keys(event.target.files)) {
    // //   if (key !== 'length') {
    // //     formData.append('files', event.target.files[key]);
    // //   }
    // // }
    formData.append("files", event.target.files[0]);
    // formData.append('jsonBodyData',
    //   new Blob([JSON.stringify(jsonBodyData)], {
    //     type: 'application/json'
    //   }));
  };
  const handleSubmit = () => {
    const propertyDto = {
      customerId: 6,
      propertyTypeId: 3,
      propertyName: "Ceaira",
      address: "Budget Street 3692, St Lucia South, Nigeria, 666342",
      city: "Clarissa",
      roomQuantity: 12,
      createDate: "2000-07-01T00:00:00",
      description: "An tuong",
      rating: null,
      lat: 127.0,
      lon: 182.0,
      images: [],
    };
    // formData.append('propertyDto', JSON.stringify(propertyDto));
    formData.append(
      "propertyDto",
      new Blob([JSON.stringify(propertyDto)], {
        type: "application/json",
      })
    );
    const data = fetch("http://localhost:8080/api/properties", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error occurred!"));
  };
  return (
    <div className="uk-margin-medium-top">
      <label>Upload Files</label>
      <input
        type="file"
        onChange={(event) => uploadJSONFiles(event)}
        multiple
      />
      <button onClick={handleSubmit}>Click</button>
    </div>
  );
};
export default LandPage;
