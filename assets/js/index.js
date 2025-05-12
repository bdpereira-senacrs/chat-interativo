import { quiz, courses } from "./quiz/index.js";
import { title, message } from "./messages/index.js";
import { fadeIn, fadeOut } from "./animations/index.js";

const like = "./assets/imgs/thumbs-up-regular.svg";
const deslike = "./assets/imgs/thumbs-down-regular.svg";

const person = ["boy", "girl"];
const color = ["blue", "orange"];

const body = document.querySelector("body");
const container = document.querySelector(".container");
const btnStart = document.querySelector(".btnStart");
const form = document.querySelector("#askForm");
const ask = document.querySelector(".ask");
const chat = document.querySelector(".chat");
const input = form.querySelector(".field");
const send = form.querySelector(".send");
const header = document.querySelector(".header");
const btnSenac = document.querySelector(".header .link");
const restartGame = document.querySelector(".btnRestart");
const loading = '<div class="writer"></div>';
input.value = "Sim!";
input.setAttribute("readonly", true);
const logo = document.querySelector(".logo");
const initMessage = chat.querySelector(".message.title");
let i = 0,
  j = 0,
  k = 0;
let desc = true,
  end = false,
  endGame = false;
const answers = ["a", "b", "c", "d"];

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
const getRandomPerson = () => {
  return person[getRandomInt(person.length)];
};
const getRandomColor = () => {
  return color[getRandomInt(color.length)];
};
let heights = {
  header: header.offsetHeight,
  ask: ask.offsetHeight,
  visualPortHeight: window.visualViewport.height,
};
body.style.height = `${heights.visualPortHeight}px`;
let teste =
  heights.visualPortHeight -
  heights.visualPortHeight * 0.25 -
  (heights.header + heights.ask);
chat.style.height = `${teste}px`;

window.addEventListener("resize", (e) => {
  heights = {
    header: header.offsetHeight,
    ask: ask.offsetHeight,
    visualPortHeight: window.visualViewport.height,
  };
  body.style.height = `${heights.visualPortHeight}px`;
  let teste =
    heights.visualPortHeight -
    heights.visualPortHeight * 0.1 -
    (heights.header + heights.ask);
  chat.style.height = `${teste}px`;
});

fadeIn(logo, null, 1000);

fadeIn(initMessage, null, 2000);

fadeIn(form, null, 3000);

container.classList.add(`${getRandomPerson()}`);
container.classList.add(`${getRandomColor()}`);

restartGame.addEventListener("click", (e) => {
  location.reload();
});

btnStart.addEventListener("click", (e) => {
  e.preventDefault();
  send.click();
});

const slugify = (str) => {
  str = str
    .normalize("NFD")
    .replace(/^\s+|\s+$/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return str;
};

const endChat = () => {
  let str = "";
  input.setAttribute("disabled", true);
  const auxCourses = courses.sort((a, b) => b.score - a.score);
  if (j == 0)
    str = `<p>De acordo com suas respostas, os cursos mais indicados são:</p>`;
  str += `<h3>${j + 1}º - 🚀 <a target="_blank" href="${auxCourses[j].link}">${
    auxCourses[j].name
  }</a> 🚀 - ${Math.floor((auxCourses[j].score / quiz.length) * 100)}%</h3>`;
  str += `${auxCourses[j].video}`;
  str += `<p>${auxCourses[j].desc}</p>`;
  str += `<a class="link btnAnim" target="_blank" href="${auxCourses[j].link}">👉 Acessar ${auxCourses[j].name} 👈</a>`;
  chat.insertAdjacentHTML(
    "beforeend",
    `<div class="message bot end o-none"></div>`
  );
  const botMessage =
    chat.querySelectorAll(".bot")[chat.querySelectorAll(".bot").length - 1];
  botMessage.insertAdjacentHTML("beforeend", str);
  fadeIn(botMessage, null, 1000, chat);
  chat.scrollTo(0, chat.scrollHeight);
  j++;
  setTimeout(() => {
    if (j < 3) {
      endChat();
    }
    if (j == 2) {
      fadeIn(restartGame, null, 1000);
    }
  }, 2000);
};

const typewriterEffect = (element, str, speed = 50) => {
  if (!element) return;

  const originalHTML = str;
  element.innerHTML = "";

  send.setAttribute("disabled", true);
  send.classList.add("disabled");

  let cursor = 0;
  let tempHTML = "";
  const tagStack = [];

  const type = () => {
    const botMessagesAux = chat.querySelectorAll(".bot");
    if (botMessagesAux[botMessagesAux.length - 2] && k == 0) {
      const btnsOpsPrev =
        botMessagesAux[botMessagesAux.length - 2].querySelectorAll(".option");
      btnsOpsPrev.forEach((btnOpPrev) => {
        btnOpPrev.classList.add("disabled");
      });
    }
    k++;
    if (cursor >= originalHTML.length) {
      // Clear the cursor after typing is complete
      element.innerHTML = tempHTML; // Set the final content without the cursor

      send.removeAttribute("disabled");
      send.classList.remove("disabled");
      input.removeAttribute("disabled");
      input.focus();

      const botMessages = chat.querySelectorAll(".bot");

      const btnsOps =
        botMessages[botMessages.length - 1].querySelectorAll(".option");
      btnsOps.forEach((btnOp) => {
        btnOp.addEventListener("click", (e) => {
          e.preventDefault();
          const value = btnOp.getAttribute("data-option");
          input.value = value;
          send.click();
        });
      });

      if (desc) {
        desc = false;
        fadeIn(btnSenac, null, 1000);
        selectAsk(" ", false);
      }
      k = 0;
      chat.scrollTo(0, chat.scrollHeight);
      return;
    }

    const currentChar = originalHTML[cursor];

    if (currentChar === "<") {
      const closeTagIndex = originalHTML.indexOf(">", cursor);
      const tagContent = originalHTML.slice(cursor, closeTagIndex + 1);
      tempHTML += tagContent;

      // Handle opening and closing tags
      if (/^<\/?\w+/.test(tagContent)) {
        if (!/^<\//.test(tagContent)) {
          // Opening tag
          tagStack.push(tagContent);
        } else {
          // Closing tag
          tagStack.pop();
        }
      }

      cursor = closeTagIndex + 1;
    } else {
      tempHTML += currentChar;
      cursor++;
    }

    element.innerHTML = tempHTML + '<span class="cursor">|</span>'; // Show cursor
    chat.scrollTo(0, chat.scrollHeight * 4);

    setTimeout(type, speed);
  };

  type();
};

const selectAsk = (response, answer = false) => {
  let str = "";
  input.setAttribute("disabled", true);
  send.setAttribute("disabled", true);
  send.classList.add("disabled");

  if (answer) {
    const ops = quiz[i - 1].options.find((op) => op.id == response).courses;
    courses.forEach((c) => {
      if (ops.includes(c.id)) {
        c.score += 1;
      }
    });
  }
  if (desc) {
    chat.insertAdjacentHTML("beforeend", `<div class="message bot"></div>`);
    const botMessage =
      chat.querySelectorAll(".bot")[chat.querySelectorAll(".bot").length - 1];
    botMessage.insertAdjacentHTML("beforeend", loading);
    botMessage.classList.add("loading");
    const loadingEl = botMessage.querySelector(".writer");
    loadingEl.addEventListener("animationend", (e) => {
      botMessage.classList.remove("loading");

      typewriterEffect(botMessage, message, 10);
    });
  }
  if (response != "" && i < quiz.length && !desc && response != "false") {
    chat.insertAdjacentHTML(
      "beforeend",
      `<div class="message bot ${i === 0 ? "first" : ""}" ></div>`
    );
    const botMessage =
      chat.querySelectorAll(".bot")[chat.querySelectorAll(".bot").length - 1];
    str = `<h3>${quiz[i].question}</h3>`;
    str += '<ul class="options">';
    quiz[i].options.forEach((op) => {
      str += `<li class="option" data-option="${op.id}"><strong>${op.id})</strong> ${op.message}</li>`;
    });
    str += "</ul>";
    botMessage.insertAdjacentHTML("beforeend", loading);
    botMessage.classList.add("loading");
    const loadingEl = botMessage.querySelector(".writer");
    loadingEl.addEventListener("animationend", (e) => {
      botMessage.classList.remove("loading");

      typewriterEffect(botMessage, str, 10);
    });

    i++;
    if (i >= quiz.length) end = true;
  }
  if (response == "false") {
    desc = true;
    chat.insertAdjacentHTML("beforeend", `<div class="message bot" ></div>`);
    const botMessage =
      chat.querySelectorAll(".bot")[chat.querySelectorAll(".bot").length - 1];
    botMessage.insertAdjacentHTML("beforeend", loading);
    botMessage.classList.add("loading");
    const loadingEl = botMessage.querySelector(".writer");
    loadingEl.addEventListener("animationend", (e) => {
      botMessage.classList.remove("loading");

      typewriterEffect(
        botMessage,
        "<p>😥 <strong>Desculpe!</strong> Você deve responder somente com a letra de cada alternativa ou clicar em qual deseja.</p>",
        10
      );
      i--;
    });
  }
  chat.scrollTo(0, chat.scrollHeight);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value != "") {
    if (!chat.classList.contains("init") && i == 0) chat.classList.add("init");
    chat.insertAdjacentHTML(
      "beforeend",
      `<div class="message user">${input.value}</div>`
    );
    const value = input.value.toLocaleLowerCase();
    // i = 15;
    // end = true;
    if (i == 0) {
      fadeOut(btnStart, null, 500);
      chat.classList.remove("init");
      container.classList.remove("init");
      selectAsk(value);
      input.removeAttribute("readonly");
    } else if (answers.includes(value) && value != "" && !end) {
      selectAsk(value, true);
    } else if (end) {
      chat.classList.remove("init");
      input.removeAttribute("readonly");
      endChat();
    } else {
      selectAsk("false", false);
    }
    chat.scrollTo(0, chat.scrollHeight);
    input.value = "";
  }
});
