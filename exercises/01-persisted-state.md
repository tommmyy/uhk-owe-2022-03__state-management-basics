# Ex1 - persistentní stav komponenty

## Teorie

### Práce s `localStorage`

- LocalStorage je persistentní úložiště v browseru.
- Umožňuje uchovat data pro danou doménu.
- Refresh stránky data nevymaže.
- Podobné cookies.

```js
// set value - Value must be a string
window.localStorage.setItem("key", "valueMustBeAString");

// get a value
const value = window.localStorage.getItem("key");

// non-string values are converted automatically. What is the algorithm?
localStorage.setItem("number", 1);
localStorage.setItem("bool", true);
localStorage.setItem("object", {});

localStorage.getItem("number"); // what is the value?
localStorage.getItem("bool"); // what is the value?
localStorage.getItem("object"); // what is the value?
localStorage.getItem("do-no-exist"); // what is the value?
```

### Práce s `JSON`

`window.JSON` umožňuje serializovat/deserialozovat JS hodnotu do/z řetězce pomocí formátu JSON.

```js
// serializace
JSON.stringify(true); // "true"
JSON.stringify({ foo: true }); // '{"foo":true}'

// deserializace
const value = JSON.stringify("true"); // value === true
const value2 = JSON.stringify('{"foo": true}'); // value2.foo === true
```

### Zadání

Upravte `Ex1.js` tak, aby hodnota checkboxu byla synchronizovaná s `localStorage`. Tzn.:

- kdykoliv uživatel zaškrtne/odškrtne checkbox, volba se uloží, jak do stavu komponenty, tak do `localStorage`.
- při načtení stránky se výchozí stav checkboxu nastaví podle uložené hodnoty v `localStorage`.

### Otázky

- Jak často čte vaše komponenta z localStorage ve vztahu k rerenderům (např. při psaní do text inputu)? Ověřte pomocí console.log
