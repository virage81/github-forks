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
		pageUrl = payload.url.slice(payload.url.indexOf("page=") + 5);
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
		index = 1;

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
						storeResult = [
							...storeResult,
							{
								id: index++,
								title: item.name,
								owner: item.owner.login,
								stars: item.stargazers_count,
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
	},
	extraReducers: (builder) => {
		builder.addCase(fetchContent.fulfilled, (state, action) => {
			state.result = action.payload;
			if (action.payload === undefined) state.result = [];
		});
	},
});

export const { init } = resultSlice.actions;

export default resultSlice.reducer;
