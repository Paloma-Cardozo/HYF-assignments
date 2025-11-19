// ⭐ Adding an activity ⭐

const activities = [];

function addActivity(activity, duration) {
  const today = new Date().toLocaleDateString(); // ⭐ New feature: Get the current date and time ⭐

  activities.push({ date: today, activity, duration });
  return `Your activity from "${today}" with the name "${activity}" has been saved. It lasted for ${duration} minutes.`;
}

document.getElementById("addActivityButton").addEventListener("click", () => {
  // const activitiesDate = document.getElementById("activitiesDate").value; // 😃 Updated: No longer needed to get date from input 😃
  const activitiesContent = document.getElementById("activitiesContent").value;
  const activitiesDuration = Number(
    document.getElementById("activitiesDuration").value
  );

  const message = addActivity(activitiesContent, activitiesDuration);

  document.getElementById("saveActivity").innerHTML = `<p>${message}</p>`;
  console.log(message);
  console.log(activities);
});

// ⭐ Show status ⭐

let totalTime = 0;
let limit = 0;

function showStatus(activities) {
  const allActivities = document.getElementById("allActivitiesResult");
  allActivities.innerHTML = "";

  if (activities.length === 0) {
    const messageIsEmpty = "Please add some activities first to show status";
    allActivities.innerHTML = `<p>${messageIsEmpty}</p>`;
    console.log("Add some activities before calling showStatus.");
    return messageIsEmpty;
  }

  totalTime = activities.reduce((sum, activity) => sum + activity.duration, 0);

  let messageShowStatus = `You have added ${activities.length} activities. They amount to ${totalTime} minutes of usage`;

  allActivities.innerHTML = `<p>${messageShowStatus}</p>`;
  console.log(messageShowStatus);
  return messageShowStatus;
}

document.getElementById("showStatusButton").addEventListener("click", () => {
  showStatus(activities);
});

// ⭐ Usage limit⭐

function setLimit(totalTime, limit) {
  const activitiesLimit = Number(
    document.getElementById("activitiesLimit").value
  );

  limit = activitiesLimit;

  let limitMessage = `<p>Your limit is set to ${limit} minutes of usage</p>`;

  if (totalTime > limit) {
    limitMessage += "Be careful! You have reached your limit! Take a break!";
    console.log("You have reached your limit, no more smartphoning for you!");
  }

  document.getElementById("limitSetUp").innerHTML = `<p>${limitMessage}</p>`;
  console.log(limitMessage);
}

document.getElementById("setLimitButton").addEventListener("click", () => {
  setLimit(totalTime, limit);
});
