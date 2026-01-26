const artyom = new Artyom();

const user = { savedName: "", todoList: [], activeTimers: [] };

function respond(text) {
  const output = document.getElementById("output");
  if (output) output.textContent = text;
  try {
    artyom.say(text);
  } catch (error) {
    console.error("Text-to-speech failed:", error);
    if (output) {
      output.textContent =
        "I can display the response, but I am unable to speak right now.";
    }
  }
  return text;
}

function getReply(command) {
  if (typeof command !== "string" || !command.trim()) {
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
    const normalizedName = given.toLowerCase();

    if (user.savedName === normalizedName) {
      return respond("I already know your name");
    }

    user.savedName = normalizedName;
    const displayName =
      normalizedName.charAt(0).toUpperCase() + normalizedName.slice(1);

    return respond(`Nice to meet you ${displayName}`);
  }

  if (text === "what is my name") {
    if (user.savedName) {
      const displayName =
        user.savedName.charAt(0).toUpperCase() + user.savedName.slice(1);

      return respond(`Your name is ${displayName}`);
    }

    return respond("I don't know your name yet");
  }

  if (text.startsWith("add ") && text.endsWith(" to my todo")) {
    const item = text.replace("add ", "").replace(" to my todo", "").trim();

    if (!item) {
      return respond("What do you want to add to your todo?");
    }

    user.todoList.push(item);
    return respond(`${item} added to your todo`);
  }

  if (text.startsWith("remove ") && text.endsWith(" from my todo")) {
    const item = text
      .replace("remove ", "")
      .replace(" from my todo", "")
      .trim();

    if (!item) {
      return respond("What do you want to remove from your todo?");
    }

    const itemLower = item.toLowerCase();
    let removed = false;

    for (let i = 0; i < user.todoList.length; i++) {
      if (user.todoList[i].toLowerCase() === itemLower) {
        user.todoList.splice(i, 1);
        removed = true;
        break;
      }
    }

    if (removed) {
      return respond(`Removed ${item} from your todo`);
    }

    return respond(`${item} is not on your todo`);
  }

  if (text === "what is on my todo") {
    if (user.todoList.length === 0) {
      return respond("You have no todos");
    }
    return respond(
      `You have ${user.todoList.length} todos: ${user.todoList.join(", ")}`,
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
    const parts = expr.split(" ");

    if (parts.length !== 3) {
      return respond("Please use format: number operator number");
    }

    const left = Number(parts[0]);
    const operator = parts[1];
    const right = Number(parts[2]);

    if (Number.isNaN(left) || Number.isNaN(right)) {
      return respond("Invalid numbers");
    }

    let result;

    switch (operator) {
      case "+":
        result = left + right;
        break;
      case "-":
        result = left - right;
        break;
      case "*":
        result = left * right;
        break;
      case "/":
        if (right === 0) {
          return respond("Division by zero is not allowed");
        }
        result = left / right;
        break;
      default:
        return respond("Unsupported operator");
    }

    return respond(String(result));
  }

  const timerMatch = text.match(
    /^set a timer for (\d+)\s*(minutes|minute|seconds|second)?$/i,
  );
  if (timerMatch) {
    const amount = parseInt(timerMatch[1], 10);
    const unit = (timerMatch[2] || "minutes").toLowerCase();

    let ms = 0;

    if (unit.startsWith("second")) {
      ms = amount * 1000;
    } else {
      ms = amount * 60 * 1000;
    }

    const timerId = setTimeout(() => {
      respond("Timer done");
      const i = user.activeTimers.indexOf(timerId);
      if (i >= 0) user.activeTimers.splice(i, 1);
    }, ms);

    user.activeTimers.push(timerId);
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
