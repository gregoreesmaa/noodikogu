import React from 'react';

function toggleInversion() {
  let inverted = document.body.classList.toggle('inverted');
  localStorage.setItem('inverted', inverted);
}

if (localStorage.getItem('inverted') === 'true') {
  toggleInversion();
}

export const Theme = React.createContext({
  invert: toggleInversion
});

export const Score = React.createContext({
  filename: null
});
