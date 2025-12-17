const usersContainer = document.getElementById("users-container");
const listUsers = document.getElementById("users-list");

fetch("/users-count")
  .then((response) => response.json())

  .then((data) => {
    const countValue =
      data.count !== undefined ? data.count : Object.values(data)[0];

    usersContainer.innerHTML = `
      <div class="user-card">
        <h2 class="user-card-title">Total Users:</h2>
        <p class="user-count">${countValue}</p>
      </div>`;
  })

  .catch((error) => {
    console.error("Error fetching users count:", error);
  });

fetch("/all-users")
  .then((response) => response.json())

  .then((data) => {
    for (const user of data) {
      const userItem = document.createElement("li");

      userItem.className = "user-list-item";
      userItem.innerHTML = `
          <span class="user-name">${user.first_name} ${user.last_name}</span>
          <span class="user-email">${user.email}</span>`;

      listUsers.appendChild(userItem);
    }
  })

  .catch((error) => {
    console.error("Error fetching users list:", error);
  });
