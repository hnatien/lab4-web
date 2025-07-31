import HelloWorld from './HelloWorld';
function App() {
  return <HelloWorld />;
}

import GreetingCard from './GreetingCard';
function App() {
  return (
    <>
      <GreetingCard name="Alice" />
      <GreetingCard name="Bob" />
    </>
  );
}
