import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Octokit } from "octokit";

const initialState = {
	result: [],
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
		maxPage = pageUrl ? pageUrl : 5,
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

const addToFavorite = (state, action) => {
	let storeResult = action.payload;
	let storedItems = JSON.parse(localStorage.getItem("favoriteForks"));

	if (storeResult === undefined) state.result = [];
	else if (storedItems === null || storedItems === []) state.result = action.payload;
	else {
		// Проверка на избранное
		let array = [...storeResult];
		for (let item of storeResult) {
			for (let localItem of storedItems) {
				if (item.title === localItem.title && item.owner === localItem.owner && item.link === localItem.link) {
					Object.freeze(storeResult);
					let tempItem = item;
					tempItem = { id: item.id, title: item.title, owner: item.owner, stars: item.stars, favorite: true, link: item.link };

					array[item.id - 1] = tempItem;
				}
			}
		}
		state.result = array;
	}
};

export const resultSlice = createSlice({
	name: "result",
	initialState,
	reducers: {
		init(state, action) {
			state.result = action.payload;
		},
		setFavorite(state, action) {
			addToFavorite(state, action);
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchContent.fulfilled, (state, action) => {
			let storeResult = action.payload;
			let storedItems = JSON.parse(localStorage.getItem("favoriteForks"));

			if (storeResult === undefined) state.result = [];
			else if (storedItems === null || storedItems === []) state.result = action.payload;
			else addToFavorite(state, action);
		});
	},
});

export const { init, setFavorite } = resultSlice.actions;

export default resultSlice.reducer;
