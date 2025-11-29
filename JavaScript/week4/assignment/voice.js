const artyom = new Artyom();

let savedName = "";
let todoList = [];
let activeTimers = [];

function respond(text) {
  const output = document.getElementById("output");
  if (output) output.textContent = text;
  try {
    artyom.say(text);
  } catch (e) {}
  return text;
}

function getReply(command) {
  if (!command || typeof command !== "string") {
    return respond("I didn't get a command");
  }

  const raw = command.trim();
  const text = raw.toLowerCase();

  if (text === "hello" || text === "hi" || text === "good morning") {
    return respond(`Hello! What is your name?`);
  }

  const nameMatch = text.match(/^my name is (.+)$/i);
  if (nameMatch) {
    const given = nameMatch[1].trim();
    const capitalized = given.charAt(0).toUpperCase() + given.slice(1);

    if (savedName.toLowerCase() === capitalized.toLowerCase()) {
      return respond("I already know your name");
    }

    savedName = capitalized;
    return respond(`Nice to meet you ${capitalized}`);
  }

  if (text === "what is my name") {
    if (savedName) {
      return respond(`Your name is ${savedName}`);
    }

    return respond("I don't know your name yet");
  }

  const addMatch = text.match(/^add (.+) to my todo$/i);
  if (addMatch) {
    const item = addMatch[1].trim();
    todoList.push(item);
    return respond(`${item} added to your todo`);
  }

  const removeMatch = text.match(/^remove (.+) from my todo$/i);
  if (removeMatch) {
    const item = removeMatch[1].trim();
    const index = todoList.findIndex(
      (t) => t.toLowerCase() === item.toLowerCase()
    );
    if (index >= 0) {
      todoList.splice(index, 1);
      return respond(`Removed ${item} from your todo`);
    }

    return respond(`${item} is not on your todo`);
  }

  if (text === "what is on my todo") {
    if (todoList.length === 0) {
      return respond("You have no todos");
    }
    return respond(
      `You have ${todoList.length} todos: ${todoList.slice(0).join(", ")}`
    );
  }

  if (text === "what day is it today") {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString("en-US", { month: "long" });
    const year = now.getFullYear();
    return respond(`${day}. of ${month} ${year}`);
  }

  const mathMatch = text.match(/^what is (.+)$/i);
  if (mathMatch) {
    const expr = mathMatch[1].trim();
    if (/^[0-9+\-*/().\s%]+$/.test(expr)) {
      try {
        const result = Function(`return (${expr})`)();
        return respond(String(result));
      } catch (e) {
        return respond("I couldn't calculate that expression");
      }
    }
  }

  const timerMatch = text.match(
    /^set a timer for (\d+)\s*(minutes|minute|seconds|second)?$/i
  );
  if (timerMatch) {
    const amount = parseInt(timerMatch[1], 10);
    const unit = (timerMatch[2] || "minutes").toLowerCase();

    let ms = 0;
    if (unit.startsWith("second")) {
      ms = amount * 1000;
    }
    ms = amount * 60 * 1000;

    const timerId = setTimeout(() => {
      respond("Timer done");
      const i = activeTimers.indexOf(timerId);
      if (i >= 0) activeTimers.splice(i, 1);
    }, ms);

    activeTimers.push(timerId);
    return respond(`Timer set for ${amount} ${unit}`);
  }

  return respond("Sorry, I don't understand that command");
}

function isGetReplyAvailable() {
  return typeof getReply !== "undefined" && typeof getReply === "function";
}

if (isGetReplyAvailable()) {
  const button = document.querySelector("#addButton");
  const output = document.getElementById("output");

  let setIntervalTimer = null;
  let timeoutId = null;
  let commandText = "";

  const UserDictation = artyom.newDictation({
    continuous: false,
    onResult: function (text) {
      if (text && text.length) {
        commandText = text;
        console.log("Recognized:", commandText);
        if (output) output.textContent = "Heard: " + commandText;
      }
    },
    onStart: function () {
      console.log("Dictation started");
    },
    onEnd: function () {
      console.log("Dictation ended");
    },
  });

  if (button) {
    button.addEventListener("click", () => {
      button.textContent = "Talk now 🙂";
      commandText = "";

      setIntervalTimer = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 6) + 2;
        button.textContent =
          randomNumber % 2 === 0 ? "Talk now 😮" : "Talk now 🙂";
      }, 100);

      try {
        UserDictation.start();
      } catch (e) {
        console.warn("Dictation does not work:", e);
      }

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        clearInterval(setIntervalTimer);
        setIntervalTimer = null;

        try {
          UserDictation.stop();
        } catch (e) {}

        if (!commandText) {
          const manual = prompt("I didn't hear anything. Type a command:");
          if (manual) commandText = manual;
        }

        getReply(commandText);
        button.textContent = "Give a new command";
      }, 5000);
    });
  }
}
