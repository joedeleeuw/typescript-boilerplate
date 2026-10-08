import { useState } from "react";
import { greeting } from "@typescript-boilerplate/domain";

export function App() {
  const [name, setName] = useState("");

  return (
    <main>
      <h1>{greeting(name)}</h1>
      <p>A small TypeScript workspace, ready for your next idea.</p>
      <label htmlFor="name">Your name</label>
      <input
        id="name"
        name="name"
        autoComplete="given-name"
        maxLength={80}
        placeholder="World"
        value={name}
        onChange={(event) => setName(event.target.value)}
        aria-describedby="name-help"
      />
      <p id="name-help" className="help">
        The web app calls the domain package through its public entrypoint.
      </p>
      <a href="https://www.typescriptlang.org/docs/">
        TypeScript documentation
      </a>
    </main>
  );
}
