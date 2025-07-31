function GreetingCard({ name }) {
  const cardStyle = {
    border: '1px solid #ccc',
    padding: '20px',
    boxShadow: '2px 2px 8px #ddd',
    margin: '10px',
    borderRadius: '8px'
  };
  return <div style={cardStyle}>Hello, {name}! Welcome to React.</div>;
}
export default GreetingCard;
