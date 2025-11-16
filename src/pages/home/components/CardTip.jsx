// src/pages/home/components/CardTip.jsx

import "./homeComponents.css";

const CardTip = ({ tip }) => {
  return (
    <div className="card-tip">
      <div className="card-tip-img">
        {/* Imagen desde backend */}
        {/* <img src={tip.imagen} alt="tip" /> */}
      </div>
      <p className="card-tip-text">{tip.texto}</p>
    </div>
  );
};

export default CardTip;
