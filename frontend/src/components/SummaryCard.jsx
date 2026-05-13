function SummaryCard({
  title,
  value,
  color,
}) {

  return (

    <div
      className={`summary-card ${color}`}
    >

      <h2 className="summary-title">

        {title}

      </h2>

      <p className="summary-value">

        {value}

      </p>

    </div>
  );
}

export default SummaryCard;