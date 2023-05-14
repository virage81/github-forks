import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Octokit } from "octokit";

const initialState = {
	result: [],
};

export const fetchContent = createAsyncThunk("result/getRepo", async (payload) => {
	const octokit = new Octokit({
		// auth: process.env.TOKEN,
		auth: "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",
	});

	let search = payload.url;
	let pageUrl = payload.page;

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
		page = pageUrl ? pageUrl : search.page,
		perPage = 50,
		maxPage = pageUrl ? pageUrl : 5,
		index = 1;

	for (let i = 1; i <= maxPage; i++) {
		var request = octokit
			.request("GET /repos/{owner}/{repo}/forks", {
				owner: owner,
				repo: repo,
				per_page: perPage,
				page: page,
			})
			.then(
				// eslint-disable-next-line no-loop-func
				(res) => {
					for (let item of res.data) {
						storeResult = [
							...storeResult,
							{
								// id: index++,
								id: page === undefined ? index++ : page * perPage + index++,
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
