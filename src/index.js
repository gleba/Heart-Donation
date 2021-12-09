import "./styles.css";

const heartPath = (child) => `<path fill="#FF0000" stroke="none" d="
M 299.05 89.4
Q 304.15 60.75 281.7 31.55 218 -31.55 150 31.55 81.95 -31.55 18.3 31.55 -4.15 60.75 0.95 89.4 5.25 113.1 31.05 144.55 40.45 156 57.4 174.2 77.2 195.25 87.7 206.75 126.8 249.5 150 285.6
L 150 285.65 150.05 285.6
Q 173.2 249.5 212.3 206.75 222.75 195.25 242.6 174.2 259.5 156 268.95 144.55 294.75 113.1 299.05 89.4 Z">
${child}
</path>`;

const a1 = (from, to, dur) => `
<animate attributeName="fill-opacity"
dur="${dur}s"
values="${to - 0.3};${from - 0.3};"
repeatCount="indefinite"
/>
`;
const a2 = (from, to, dur) => `

<animateTransform attributeName="transform"
attributeType="XML"
type="scale"
from="${from} ${from}"
to="${to} ${to}"
dur="${dur}s"
repeatCount="indefinite"/>
`;

const a3 = (from, to, dur) => {
  const f = (x) => 150 - 150 * x;
  return `
<animateTransform attributeName="transform"
attributeType="XML"
type="translate"
from="${f(from)} ${f(from)}"
to="${f(to)} ${f(to)}"
dur="${dur}s"
repeatCount="indefinite"/>`;
};

const aHeart = (...arg) => `
<g>
  ${a3(...arg)}
  <g>
    ${a2(...arg)}
    ${heartPath(a1(...arg))}
  </g>
</g>
`;
const Ah = (t) => aHeart(1, 0.3, t) + aHeart(0.3, 1, t);
const svgHeart = `<svg width="200" height="200" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" fill="#fff">
${Ah(3)}
${Ah(5)}
${Ah(8)}
${Ah(13)}
</svg>`;

const getUrl = ({ name, end_date, start_date }) =>
  `https://gps.raevskyteam.org/donation?name=${name}&end_date=${end_date}&start_date=${start_date}`;

const tag_script = document.getElementById("h-counter");
const props = {
  name: tag_script.getAttribute("data-name"),
  start_date: tag_script.getAttribute("data-start"),
  end_date: tag_script.getAttribute("data-end")
};
const tag = document.createElement("div");
// const tag_svg_loader = document.createElement("svg");

tag.innerHTML = svgHeart; // `<svg fill="#fff" version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg" > <path fill="#f00" d="M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.717-6.002 11.47-7.65 17.305-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z" fill-opacity=".5" > <animate attributeName="fill-opacity" begin="0s" calcMode="linear" dur="1.4s" repeatCount="indefinite" values="0.5;1;0.5" /> </path> <path fill="#f00" d="M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.592-2.32 17.307 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z" fill-opacity=".5" > <animate attributeName="fill-opacity" begin="0.7s" calcMode="linear" dur="1.4s" repeatCount="indefinite" values="0.5;1;0.5" /> </path> <path fill="#f00" d="M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z" /> </svg>`;

tag_script.parentNode.insertBefore(tag, tag_script);

const res = fetch(getUrl(props));

// res.then((v) => {
//   v.json().then((resp) => {
//     const endDate = new Date(props.end_date);
//     tag.innerHTML = `
//   <h1>${props.name}</h1>
//   <h2>${endDate.toDateString()}</h2>
//   <pre>
//     ${resp.data}
//   </pre>
//   `;
//   });
// });
