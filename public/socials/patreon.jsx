import React from "react";

function Icon({ width, height }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={width} height={height} id="patreon">
        <style>
            {/* {`#patreon:hover path {
                fill: #f96854;
                transition: fill 0.5s;
            }`} */}
        </style>
      <path d="M512 194.8c0 101.3-82.4 183.8-183.8 183.8-101.7 0-184.4-82.4-184.4-183.8 0-101.6 82.7-184.3 184.4-184.3C429.6 10.5 512 93.2 512 194.8zM0 501.5h90v-491H0v491z"></path>
    </svg>
  );
}

export default Icon;
