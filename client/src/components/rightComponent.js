import React from "react";

export default function RightComponent() {
  return (
    <div>
       <div className="card p-2 bg-light">
        <h4>Latest Post</h4>
        <ul className="list-group">
          <li className="list-group-item">A simple default list group item</li>

          <li className="list-group-item list-group-item-light">
            A simple primary list group item
          </li>
        </ul>
      </div>
      <div className="card p-2 bg-light mt-4">
        <h4>Trending categories</h4>
        <ol className="list-group list-group-numbered">
          <li className="list-group-item bg-light  d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
            <span className="badge bg-primary rounded-pill">14</span>
          </li>
          <li className="list-group-item bg-light  d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
            <span className="badge bg-primary rounded-pill">14</span>
          </li>
          <li className="list-group-item bg-light  d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
            <span className="badge bg-primary rounded-pill">14</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
