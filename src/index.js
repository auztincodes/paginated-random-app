const tableBody = document.querySelector('#table-body');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const pageView = document.querySelector('#page-view');
const baseUrl = 'https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84';

let results = {};
let pageKeys = [];
let pageKey = 0;
let pageNumber = '';

const fetchUsers = async (url) => {
	const response = await fetch(url);
	return await response.json();
};

const loadUsers = async (url) => {
	tableBody.innerHTML = `<div class="loading">
  loading ...</div>`;
	const users = await fetchUsers(url);
	setUsers(users);
};

const setUsers = async (users) => {
	results = users.results[0];
	pageNumber = users.info.page;
	pageKeys = Object.keys(results);
	pageKey = 0;
	await checkPrevNext();
	getNextData();
};
const checkPrevNext = () => {
	!results.paging?.previous
		? prevButton.setAttribute('disabled', true)
		: prevButton.removeAttribute('disabled');
	!results.paging?.next
		? nextButton.setAttribute('disabled', true)
		: nextButton.removeAttribute('disabled');
};

const fillTable = (data) => {
	const tableRow = data
		.map((item) => {
			return `<tr data-entryid=${item.id}>
									<td>${item.row}</td>
									<td>${item.gender.toUpperCase()}</td>
									<td>${item.age}</td>
							</tr>`;
		})
		.join('');
	tableBody.innerHTML = tableRow;
	const showPage = pageKey === 1 ? pageNumber : Number(pageNumber) + 1;
	pageView.innerHTML = `Showing Page ${showPage}`;
};
const getNextPageKey = () => {
	if (pageKey === 0) {
		pageKey = 1;
		return pageKeys[0];
	} else if (pageKey === 1) {
		pageKey = 2;
		return pageKeys[1];
	} else {
		return false;
	}
};
const getPrevPageKey = () => {
	if (pageKey === 2) {
		pageKey = 0;
		return pageKeys[0];
	}
	pageKey = 0;
	return false;
};
const getNextData = () => {
	const key = getNextPageKey();
	if (key) {
		fillTable(results[key]);
	} else {
		loadUsers(results.paging?.next);
	}
};

const getPrevData = () => {
	const key = getPrevPageKey();
	if (key) {
		fillTable(results[key]);
	} else {
		loadUsers(results.paging?.previous);
	}
};
window.addEventListener('load', async () => {
	await loadUsers(baseUrl);

	prevButton.addEventListener('click', () => {
		getPrevData();
	});

	nextButton.addEventListener('click', () => {
		getNextData();
	});
});
