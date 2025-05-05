import { quiz, courses } from "./quiz/index.js";
import { title, message } from "./messages/index.js";
import { fadeIn, fadeOut } from "./animations/index.js";

const like = "./assets/imgs/thumbs-up-regular.svg";
const deslike = "./assets/imgs/thumbs-down-regular.svg";

const form = document.querySelector("#askForm");
const chat = document.querySelector(".chat");
const input = form.querySelector(".field");
const send = form.querySelector(".send");
const btnSenac = document.querySelector(".header .link");
const restartGame = document.querySelector(".btnRestart");
const loading = '<div class="writer"></div>';

const logo = document.querySelector(".logo");
const initMessage = chat.querySelector(".message.title");
let i = 0,
  j = 0,
  k = 0;
let desc = true,
  end = false,
  restart = false,
  endGame = false;
let finalCourse;
const answers = ["a", "b", "c", "d"];

fadeIn(logo, null, 1000);

fadeIn(initMessage, null, 2000);

fadeIn(form, null, 3000);

restartGame.addEventListener("click", (e) => {
  location.reload();
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

const yes = (e) => {
  document
    .querySelectorAll(".yes")
    .forEach((el) => el.classList.add("disabled"));
  document
    .querySelectorAll(".no")
    .forEach((el) => el.classList.add("disabled"));
  const last =
    chat.querySelectorAll(".writing")[
      chat.querySelectorAll(".writing").length - 1
    ];

  if (last) last.classList.remove("writing");
  chat.insertAdjacentHTML(
    "beforeend",
    `<div class="message user"><img src="${like}" /></div>`
  );
  if (!restart) {
    let str = "";
    str = `<p><strong>🚀🚀 Muito bem!</strong> Muito obrigado pelo seu tempo, Aqui está o link para o curso, espero que você goste: 😁</p>`;
    str += `<p>👉 <a target="_blank" href="${finalCourse.link}">${finalCourse.link}</a> 👈</p>`;
    chat.insertAdjacentHTML(
      "beforeend",
      `<div class="message bot writing"></div>`
    );
    const botMessage =
      chat.querySelectorAll(".bot")[chat.querySelectorAll(".bot").length - 1];
    botMessage.insertAdjacentHTML("beforeend", loading);
    botMessage.classList.add("loading");
    const loadingEl = botMessage.querySelector(".writer");
    loadingEl.addEventListener("animationend", (e) => {
      botMessage.classList.remove("loading");

      typewriterEffect(botMessage, str, 10);
      endGame = true;
    });
  } else {
    desc = true;
    selectAsk(" ");
  }
  chat.scrollTo(0, chat.scrollHeight);
};
const no = (e) => {
  document
    .querySelectorAll(".yes")
    .forEach((el) => el.classList.add("disabled"));
  document
    .querySelectorAll(".no")
    .forEach((el) => el.classList.add("disabled"));
  const last =
    chat.querySelectorAll(".writing")[
      chat.querySelectorAll(".writing").length - 1
    ];

  if (last) last.classList.remove("writing");
  chat.insertAdjacentHTML(
    "beforeend",
    `<div class="message user"><img src="${deslike}" /></div>`
  );
  if (!restart) endChat();
  if (restart) {
    let str = "";
    str = `<p><strong>🥺 Entendo!</strong> Muito obrigado pelo seu tempo 😊, caso queira procurar outro curso aqui está o link para a lista de cursos:</p>`;
    str += `<p>👉 <a href="https://www.ead.senac.br/cursos-tecnicos/">https://www.ead.senac.br/cursos-tecnicos/</a> 👈</p>`;
    chat.insertAdjacentHTML(
      "beforeend",
      `<div class="message bot writing"></div>`
    );
    const botMessage =
      chat.querySelectorAll(".bot")[chat.querySelectorAll(".bot").length - 1];
    botMessage.insertAdjacentHTML("beforeend", loading);
    botMessage.classList.add("loading");
    const loadingEl = botMessage.querySelector(".writer");
    loadingEl.addEventListener("animationend", (e) => {
      botMessage.classList.remove("loading");

      typewriterEffect(botMessage, str, 10);
      endGame = true;
    });
  }
  chat.scrollTo(0, chat.scrollHeight);
};

const endChat = () => {
  let str = "";
  input.setAttribute("disabled", true);
  if (j < 3) {
    const auxCourses = courses.sort((a, b) => b.score - a.score);
    str = `<p><strong>${
      j == 0 ? "😁 Muito Bem" : "😥 Entendo"
    }!</strong> De acordo com suas respostas, o ${
      j == 0 ? "" : j == 1 ? "segundo" : "terceiro"
    } curso mais indicado é:</p>`;

    str += `<h3>🚀 <a target="_blank" href="${auxCourses[j].link}">${auxCourses[j].name}</a> 🚀</h3>`;
    str += `<p>Pode acessar mais informações do curso aqui <br>👉 <a target="_blank" href="${auxCourses[j].link}">${auxCourses[j].link}</a> 👈</p>`;
    str += `<p>${auxCourses[j].desc}</p>`;
    str += `<div class="btns"><button class="yes"><img src="${like}" />Gostei</button><button class="no"><img src="${deslike}" />Não Gostei</button></div>`;
    finalCourse = auxCourses[j];
    chat.insertAdjacentHTML(
      "beforeend",
      `<div class="message bot writing"></div>`
    );
    const botMessage =
      chat.querySelectorAll(".bot")[chat.querySelectorAll(".bot").length - 1];
    botMessage.insertAdjacentHTML("beforeend", loading);
    botMessage.classList.add("loading");
    const loadingEl = botMessage.querySelector(".writer");
    loadingEl.addEventListener("animationend", (e) => {
      botMessage.classList.remove("loading");

      typewriterEffect(botMessage, str, 10);
      j++;
    });
  } else {
    str = `<p><strong>😥 Entendo!</strong> Acredito que você não tenha sido muito <strong>honesto</strong> podemos fazer as perguntas novamente?</p>`;
    str += `<div class="btns"><button class="yes"><img src="${like}" />Gostei</button><button class="no"><img src="${deslike}" />Não Gostei</button></div>`;
    chat.insertAdjacentHTML(
      "beforeend",
      `<div class="message bot writing"></div>`
    );
    const botMessage =
      chat.querySelectorAll(".bot")[chat.querySelectorAll(".bot").length - 1];
    botMessage.insertAdjacentHTML("beforeend", loading);
    botMessage.classList.add("loading");
    const loadingEl = botMessage.querySelector(".writer");
    loadingEl.addEventListener("animationend", (e) => {
      botMessage.classList.remove("loading");
      typewriterEffect(botMessage, str, 10);
      restart = true;
    });
  }
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
      if (end) {
        input.setAttribute("disabled", true);
        const btnsYes = document.querySelectorAll(`.yes`);
        const btnYes = btnsYes[btnsYes.length - 1];
        btnYes.addEventListener("click", yes);

        const btnsNo = document.querySelectorAll(`.no`);
        const btnNo = btnsNo[btnsNo.length - 1];
        btnNo.addEventListener("click", no);
      }
      if (restart) {
        i = 0;
        courses.forEach((c) => (c.score = 0));
        const btnsYes = document.querySelectorAll(`.yes`);
        const btnYes = btnsYes[btnsYes.length - 1];
        btnYes.addEventListener("click", yes);

        const btnsNo = document.querySelectorAll(`.no`);
        const btnNo = btnsNo[btnsNo.length - 1];
        btnNo.addEventListener("click", no);
      }
      if (endGame) fadeIn(restartGame, null, 1000);
      k = 0;
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
    chat.scrollTo(0, chat.scrollHeight);
    setTimeout(type, speed);
  };

  type();
};

const selectAsk = (response, answer = false) => {
  let str = "";
  input.setAttribute("disabled", true);
  send.setAttribute("disabled", true);
  send.classList.add("disabled");
  const last =
    chat.querySelectorAll(".writing")[
      chat.querySelectorAll(".writing").length - 1
    ];

  if (last) last.classList.remove("writing");
  if (answer) {
    const ops = quiz[i - 1].options.find((op) => op.id == response).courses;
    courses.forEach((c) => {
      if (ops.includes(c.id)) {
        c.score += 1;
      }
    });
  }
  if (desc) {
    chat.insertAdjacentHTML(
      "beforeend",
      `<div class="message bot writing"></div>`
    );
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
      `<div class="message bot ${i === 0 ? "first" : ""} writing" ></div>`
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
    chat.insertAdjacentHTML(
      "beforeend",
      `<div class="message bot writing" ></div>`
    );
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
      chat.classList.remove("init");
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
    input.focus();
  }
});
