# Ex3 - kolokace stavu

## Teorie

- Kontext v Reactu umožňuje globálně sdílet properties do substromu komponent.

- Sdílená hodnota je reprezentována objektem vytořeným `React.createContext`.

```js
const context = React.createContext();
const { Consumer, Provider } = context;

const App = () => {
	return (
		<Provider value={sharedValue}>
			<Application />
		</Provider>
	);
};

// Consumer
const Application = () => (
	<div>
		<Consumer>{(sharedValue) => <h1>{sharedValue}</h1>}</Consumer>
		<Nested />
	</div>
);

// useContext
const Nested = () => {
	const sharedValue = React.useContext(context);
	return <p>Shared value: {sharedValue}</p>;
};
```

- `Provider`
  - Nasazujeme na vrchol stromu
  - Skrze property `value` předáváme sdílenou value (`sharedValue`). Může být primitivní hodnota, ale i objekt, pole nebo funkce.
- `Consumer`
  - Slouží ke čtení sdílené hodnoty, kdekoliv v substromu Providera.
- Jako `children` přebírá funkci (tzv. renderProp), která má:
  - vstup: sdílená hodnota
  - výstup: vracíte JSX, které se má vykreslit.
- `const sharedValue = useContext(context)`
  - slouží jako alternativa ke Consumerovi - pro ty, co raději hooky ;)

### Nesting

- zanoření Providerů do sebe je moožné

```jsx
<Provider value="x">
	<Provider value="y">
		<Consumer>{(value) => console.log(value)}</Consumer>
	</Provider>

	<Consumer>{(value) => console.log(value)}</Consumer>
</Provider>
```

## Zadání

Pokračujte v `Ex3.js`.
Přidejte do objektu témy následující barvy:

```
primaryColor: #007fff
white: #fff
```

Použijte `theme.white` jako barvu textu v tlačítku `Button`.

Použijte `theme.primaryColor` jako:

- Barvu rámečku boxu `Box` a
- jako barvu pozadí tlačítka.

Seznamte se s balíčkem [react-colorful](https://npm.im/react-colorful).

Upravte komponentu `ThemeDesigner` tak, aby uživatel mohl měnit hodnotu `theme.primaryColor`. K tomu využijte `react-colorful`.
