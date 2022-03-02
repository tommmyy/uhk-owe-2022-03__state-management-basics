import KeyMirror from 'keymirror';
import {
	useCallback,
	useMemo,
	useState,
	useEffect,
	useReducer,
	useContext,
	createContext,
} from 'react';
import './styles.css';

const apiUrl = 'https://api.github.com/repos/facebook/react/commits';
const ActionTypes = KeyMirror({
	REQUEST: null,
	SUCCESS: null,
	ERROR: null,
});
const request = () => ({ type: ActionTypes.REQUEST });
const success = (payload) => ({ type: ActionTypes.SUCCESS, payload });
const error = (payload) => ({
	type: ActionTypes.ERROR,
	payload,
	error: true,
});

const commitsContext = createContext();

const commitsReducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.REQUEST: {
			return { ...state, status: 'pending' };
		}
		case ActionTypes.SUCCESS: {
			return { ...state, status: 'resolved', data: action.payload };
		}
		case ActionTypes.ERROR: {
			return { ...state, status: 'error' };
		}
		default:
			return state;
	}
};

const CommitsProvider = (props) => {
	const api = useReducer(commitsReducer, { status: '', data: null });

	return <commitsContext.Provider {...props} value={api} />;
};

const useCommits = () => {
	return useContext(commitsContext);
};

const fetchNewData = (dispatch) => async (filter) => {
	dispatch(request());
	try {
		const response = await fetch(
			`${apiUrl}?per_page=${filter.per_page}&page=${filter.page}`
		);

		const data = await response.json();

		dispatch(success(data));
	} catch (error) {
		dispatch(error(error));
	}
};

const Filter = () => {
	const [filter, setFilter] = useState({ page: 0, per_page: 20 });
	const [, dispatch] = useCommits();

	const handleChange = (event) => {
		const { name, value } = event.target;
		const newFilter = { ...filter, [name]: value };

		setFilter(newFilter);
	};

	useEffect(() => {
		fetchNewData(dispatch)(filter);
	}, [filter.per_page, filter.page]);

	return (
		<div className="flex space-between p-16 mb-16 bg-lightGray">
			<div>
				<label htmlFor="page">Page:</label>
				<input
					className="w-48"
					id="page"
					name="page"
					type="number"
					min={0}
					step={1}
					value={filter.page}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="per_page">Per page:</label>
				<select
					id="per_page"
					name="per_page"
					className="w-48"
					value={filter.per_page}
					onChange={handleChange}
				>
					<option value={5}>5</option>
					<option value={20}>20</option>
					<option value={40}>40</option>
				</select>
			</div>
		</div>
	);
};

const List = () => {
	const [{ status, data }] = useCommits();

	console.log({ status, data });

	if (status === 'idle') {
		return <div />;
	}

	if (status === 'error') {
		return 'Unexpected error occured.';
	}

	return (
		<div>
			{status === 'pending' ? '...' : ''}
			{data && (
				<ul className="list">
					{data.map(({ sha, author, commit: { message } }) => {
						return (
							<li key={sha} className="list-item">
								<strong>{author.login}:</strong> {message}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default function App() {
	return (
		<CommitsProvider>
			<div className="w-50 m-auto txt-center">
				<div className="bg-white p-16 border-radius">
					<Filter />
					<List />
				</div>
			</div>
		</CommitsProvider>
	);
}
