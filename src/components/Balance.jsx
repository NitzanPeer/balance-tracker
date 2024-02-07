import React from "react";
import { useState, useEffect } from "react";

export default function balance({ balance }) {
  return (
    <div className="balance container">
      <h4>BALANCE</h4>
      <span id="balance">{`₪${balance}`}</span>
    </div>
  );
}
