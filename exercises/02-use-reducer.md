# Ex2 - useReducer

## Teorie

### Práce s `useReducer`

```
const [state, dispatch] = useReducer(reducer, initialValue)

// change state
dispatch(action)
```

- `state` - aktuální stav
- `dispatch` - funkce, očekává akci jako argument; výsledkem je rerender komponenty
- `initialValue` - výchozí hodnota stavu

### Co je `action`?

Je objekt popisující, akci, která má vést ke změně stavu.
Musí obsahovat:

- `type` (string) - identifikátor akce

Může obsahovat:

- `payload` - data spřažená s akcí
- `meta` - doplňující informace, používá se pro automatizaci
- `error` (boolean) - pokud popisuje chybu

```js
const actionSimple = {
	type: 'logout',
};

const actionWithPayload = {
	type: 'login',
	payload: { userName: 'darth.vader.27', token: 'xyz' },
};

const actionWithMeta = {
	type: 'login',
	payload: { userName: 'darth.vader.27', token: 'xyz' },
	meta: { created: 1646171600354 },
	error: true,
};
```

- Specifikace [flux-standard-actions](https://github.com/redux-utilities/flux-standard-action)

### Co je reducer?

Funkce, která přímá dva argumenty

- současný stav komponenty
- akci.
  Musí vrátit nový stav - pokud reaguje na akci, nebo musí vrátit ten současný BEZE změn.

```js
const reducer = (state, action) => {
	if (action.type === 'logout') {
		return {
			...state,
			loggedUser: null,
		};
	}
	return state;
};
```

### Zadání

Upravte `Ex2.js` tak, aby čítač obsahoval tlačítko `reset`.
Po stisknutí tlačítka se čítač nastaví na výchozí hodnotu.

- Použijte [`keymirror`](https://www.npmjs.com/package/keymirror).

# Otázky

- Zamyslete se, jaké má využití `useReducer` výhody oproti `useState`.
