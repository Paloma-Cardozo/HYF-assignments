// ⭐ Adding an activity ⭐

const activities = [];

function addActivity(date, activity, duration) {
  activities.push({ date, activity, duration });
  return `Your activity from "${date}" with the name "${activity}" has been saved. It lasted for ${duration} minutes.`;
}

document.getElementById("addActivityButton").addEventListener("click", () => {
  const activitiesDate = document.getElementById("activitiesDate").value;
  const activitiesContent = document.getElementById("activitiesContent").value;
  const activitiesDuration = Number(
    document.getElementById("activitiesDuration").value
  );

  const message = addActivity(
    activitiesDate,
    activitiesContent,
    activitiesDuration
  );

  document.getElementById("saveActivity").innerHTML = `<p>${message}</p>`;

  console.log(message);
  console.log(activities);
});

// ⭐ Show status ⭐

function showStatus(activities) {
  const allActivities = document.getElementById("allActivitiesResult");
  allActivities.innerHTML = "";

  if (activities.length === 0) {
    const messageIsEmpty = "Please add some activities first to show status";
    allActivities.innerHTML = `<p>${messageIsEmpty}</p>`;
    console.log("Add some activities before calling showStatus.");
    return messageIsEmpty;
  }

  const totalTimeSpent = activities.reduce(
    (sum, activity) => sum + activity.duration,
    0
  );

  const messageShowStatus = `You have added ${activities.length} activities. They amount to ${totalTimeSpent} minutes of usage`;
  allActivities.innerHTML = `<p>${messageShowStatus}</p>`;
  return messageShowStatus;
}

document.getElementById("showStatusButton").addEventListener("click", () => {
  showStatus(activities);
});

// ⭐ Usage limit⭐
