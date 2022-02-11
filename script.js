'use strict';

const form = document.querySelector('.search-form');
const user = document.querySelector('.user');

const renderUserOnPage = (data) => {
  const html = `
    <img
      class="user-avatar"
      alt="user avatar"
      src="${data.avatar_url}"
    />
    <p class="name-field">
      Name: <span class="name">${data.name}</span>
    </p>
    <p class="username-field">
      Username:
      <a class="username" href="${data.html_url}" target="_blank">${data.login}</a>
    </p>
    <p class="bio-field">
      Bio:
      <span class="bio">${data.bio}</span>
    </p>
  `;

  user.insertAdjacentHTML('beforeend', html);
};

const getUser = async (username) => {
  try {
    const user = await fetch(`https://api.github.com/users/${username}`);

    if (!user.ok)
      throw new Error(
        'Problem with loading the data from the server or invalid username! 😟'
      );

    const userData = await user.json();

    renderUserOnPage(userData);
  } catch (err) {
    console.error(err);
    user.insertAdjacentHTML(
      'beforeend',
      `<p>Problem with loading the user or invalid username! ⛔</p>`
    );
  }
};

const submitHandler = (e) => {
  e.preventDefault();

  user.textContent = '';

  const formData = new FormData(e.currentTarget);
  const input = formData.get('search-input');

  getUser(input);
};

const keydownHandler = (e) => {
  e.preventDefault();
  if (e.key === 'Enter') {
    user.textContent = '';

    const formData = new FormData(e.currentTarget);
    const input = formData.get('search-input');

    getUser(input);
  }
};

form.addEventListener('submit', submitHandler);
form.addEventListener('keydown', keydownHandler);
