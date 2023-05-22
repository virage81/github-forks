import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Octokit } from "octokit";

const initialState = {
	result: [],
	favorites: [],
};

export const fetchContent = createAsyncThunk("result/getRepo", async (payload) => {
	const octokit = new Octokit({
		auth: process.env.TOKEN,
	});

	let search, pageUrl;
	try {
		search = payload.url;
		pageUrl = payload.url.indexOf("?") !== -1 ? payload.url.slice(payload.url.indexOf("page=") + 5) : undefined;
	} catch {}

	// Получаю адресную строку
	switch (true) {
		case search.indexOf("?") !== -1:
			search = search.slice(search.indexOf("?") + 1);
			search = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
			break;

		case search.indexOf("/") !== -1:
			search = {
				owner: search.slice(0, search.indexOf("/")),
				repository: search.slice(search.indexOf("/") + 1),
			};
			break;

		default:
			return;
	}

	let owner = search.owner,
		repo = search.repository,
		storeResult = [],
		promises = [],
		page = pageUrl ? pageUrl : 1,
		perPage = 50,
		maxPage = pageUrl ? pageUrl : 1,
		index = 0;

	for (let i = page; i <= maxPage; i++) {
		var request = octokit
			.request("GET /repos/{owner}/{repo}/forks", {
				owner: owner,
				repo: repo,
				per_page: perPage,
				page: i,
			})
			.then(
				// eslint-disable-next-line no-loop-func
				(res) => {
					for (let item of res.data) {
						index++;
						storeResult = [
							...storeResult,
							{
								id: index,
								title: item.name,
								owner: item.owner.login,
								stars: item.stargazers_count,
								favorite: false,
								link: item.html_url,
							},
						];
					}
				}
			);

		promises.push(request);
	}

	await Promise.all(promises);

	return storeResult;
});

export const resultSlice = createSlice({
	name: "result",
	initialState,
	reducers: {
		init(state, action) {
			state.result = action.payload;
		},
		setFavorite(state, action) {
			for (let item of state.result) {
				if (item.id === action.payload.id && item.owner === action.payload.owner) {
					item.favorite === false ? (item.favorite = true) : (item.favorite = false);
					break;
				}
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchContent.fulfilled, (state, action) => {
			let storeResult = action.payload;
			let storedItems = JSON.parse(localStorage.getItem("favoriteForks"));

			if (storeResult === undefined) state.result = [];
			else if (storedItems === null || storedItems === []) state.result = action.payload;
			else {
				// Проверка на избранное
				for (let item of storeResult) {
					for (let localItem of storedItems) {
						if (item.title === localItem.title && item.owner === localItem.owner && item.link === localItem.link) {
							item.favorite = true;
						}
					}
				}
				state.result = storeResult;
			}
		});
	},
});

export const { init, setFavorite, addSearch } = resultSlice.actions;

export default resultSlice.reducer;
