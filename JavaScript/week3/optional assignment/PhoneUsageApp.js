// ⭐ Adding an activity ⭐
const activities = [];
let totalTime = 0;
let limit = 0;

function addActivity() {
  const activity = document.getElementById("activitiesContent").value;
  const duration = Number(document.getElementById("activitiesDuration").value);
  const today = new Date().toLocaleDateString(); // ⭐ New feature: Get the current date and time ⭐

  if (!activity || activity === "") {
    alert("Please enter a valid activity name");
    return "Error: Invalid activity name";
  }

  if (isNaN(duration) || duration <= 0) {
    alert("Please enter a valid duration in minutes greater than 0");
    return "Error: Invalid duration";
  }

  activities.push({ date: today, activity, duration });

  document.getElementById("activitiesContent").value = "";
  document.getElementById("activitiesDuration").value = "";

  const message = `Your activity from "${today}" with the name "${activity}" has been saved. It lasted for ${duration} minutes`;
  document.getElementById("saveActivity").innerHTML = `<p>${message}</p>`;

  console.log(activities);

  return message;
}

// ⭐ Show status ⭐

function showStatus() {
  const allActivities = document.getElementById("allActivitiesResult");
  allActivities.innerHTML = "";

  if (activities.length === 0) {
    const messageIsEmpty = "Please add some activities first to show status";
    allActivities.innerHTML = `<p>${messageIsEmpty}</p>`;
    return messageIsEmpty;
  }

  totalTime = activities.reduce((sum, activity) => sum + activity.duration, 0);
  let messageShowStatus = `You have added ${activities.length} activities. They amount to ${totalTime} minutes of usage`;

  allActivities.innerHTML = `<p>${messageShowStatus}</p>`;
  return messageShowStatus;
}

// ⭐ Usage limit⭐

function setLimit() {
  const activitiesLimit = Number(
    document.getElementById("activitiesLimit").value
  );
  limit = activitiesLimit;

  let limitMessage = `<p>Your limit is set to ${limit} minutes of usage</p>`;

  if (totalTime > limit) {
    limitMessage += "Be careful! You have reached your limit! Take a break!";
  }

  document.getElementById("limitSetUp").innerHTML = `<p>${limitMessage}</p>`;
  return limitMessage;
}

document.getElementById("addActivityButton").addEventListener("click", () => {
  // const activitiesDate = document.getElementById("activitiesDate").value; // 😃 Updated: No longer needed to get date from input 😃
  addActivity();
});

document.getElementById("showStatusButton").addEventListener("click", () => {
  showStatus();
});

document.getElementById("setLimitButton").addEventListener("click", () => {
  setLimit();
});
